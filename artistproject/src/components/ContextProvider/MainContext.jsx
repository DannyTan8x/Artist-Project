import { useState, createContext, useContext, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import * as bootstrap from "bootstrap"; // Import Bootstrap as a module
import axiosInstance from "../../axiosConfig";
import { UserContext } from "./UserContext";
// Create the Context
export const MainContext = createContext();

export function MainContextProvider({ children }) {
  //API path 存放在環境變數 .evn 設定為 http://localhost:8080
  const path = import.meta.env.VITE_DATA_HOST_API;

  //state for data 共用變數
  // const [loadWishlist, setLoadWishlist] = useState(false);
  // const [getWishlistData, setGetWishListData] = useState(false);
  const [artistList, setArtisList] = useState([]); //所有作家名單 目前for navBar & 後台 選單用
  const [WToS, setWToS] = useState(false);
  const [wishlistResult, setWishlistResult] = useState();
  const [reLoadBiddingHistory, setReLoadBiddingHistory] = useState(false);
  const [reLoadBiddingNum, setReLoadBiddingNum] = useState(false);
  const [addRemoveWishlistprocessed, setaddRemoveWishlistprocessed] =
    useState(false);
  // const [wishlistPaintingIdList, setWishlistPaintingIdList] = useState([]);
  //vv for searching 功能用的變數：
  const [search, setSearch] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchResultRef = useRef(null);
  const [requestPageNumber, setRequestPageNumber] = useState(1);
  const { isLogin } = useContext(UserContext);
  //vv for offcanvas 功能用：
  const biddingHistoryRef = useRef();

  // E-mail 暫存
  const [email, setEmail] = useState("");

  // 更新 email 的函數
  const handleEmail = (newEmail) => {
    setEmail(newEmail); // 將新的 email 更新到全局狀態
  };

  const [recipientInfo, setRecipientInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber1: "",
    cardNumber2: "",
    cardNumber3: "",
    cardNumber4: "",
    expirationDate: "",
    cvv: "",
  });

  //信用卡號輸入
  // const [cardNumber1, setCardNumber1] = useState("");
  // const [cardNumber2, setCardNumber2] = useState("");
  // const [cardNumber3, setCardNumber3] = useState("");
  // const [cardNumber4, setCardNumber4] = useState("");
  const cardNumber2Ref = useRef(null);
  const cardNumber3Ref = useRef(null);
  const cardNumber4Ref = useRef(null);

  //卡號當輸入滿4位數的時候，自動跳下一欄
  const handleCardNumberChange = (e, field, nextRef) => {
    const value = e.target.value;
    //只允許輸入數字，最大限度為4
    if (/^\d{0,4}$/.test(value)) {
      setPaymentInfo((prevPaymentInfo) => ({
        ...prevPaymentInfo,
        [field]: value, // 更新對應的卡號欄位
      }));
      if (value.length === 4 && nextRef) {
        console.log(nextRef);
        nextRef.current.focus(); //自動跳到下一個輸入框
      }
    }
  };

  //有效日期的onChange
  const handleExpirationDateChange = (e) => {
    const value = e.target.value;
    setPaymentInfo({ ...paymentInfo, expirationDate: value });
  };

  //CVV的onChange
  const handleCvvChange = (e) => {
    const value = e.target.value;
    setPaymentInfo({ ...paymentInfo, cvv: value });
  };

  //表單驗證狀態
  const [errors, setErrors] = useState({});

  const validateForm = (recipientInfo, paymentInfo) => {
    const newErrors = {};
    if (recipientInfo) {
      //驗證收件人資訊
      if (!recipientInfo.name) newErrors.name = "Name is required";
      if (!recipientInfo.phone) newErrors.phone = "Phone is required";
      if (!recipientInfo.address) newErrors.address = "Address is required";
    }
    if (paymentInfo) {
      //驗證付款
      if (
        !paymentInfo.cardNumber1 ||
        !paymentInfo.cardNumber2 ||
        !paymentInfo.cardNumber3 ||
        !paymentInfo.cardNumber4
      )
        newErrors.cardNumber = "Complete card number is required";

      if (!paymentInfo.expirationDate) {
        newErrors.expirationDate = "ExpirationDate is required";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentInfo.expirationDate)) {
        newErrors.expirationDate = "Expiration date must be in MM/YY format";
      }

      if (!paymentInfo.cvv) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3}$/.test(paymentInfo.cvv)) {
        newErrors.cvv = "Expiration date must be a 3-digit number";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; //如果沒有錯誤則返回true
  };

  // methods for loading data
  const getArtistList = async () => {
    const api = path + "/ArtController/findall";
    // 等同 $.ajax(" get blablablba ")
    try {
      const result = await axiosInstance.get(`${api}`);
      // console.log(result);
      setArtisList(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getWishList = async () => {
    const authorization = localStorage.getItem("token");
    const api = path + "/api/wishlist";

    if (authorization) {
      try {
        const result = await axiosInstance.get(`${api}`);
        setWishlistResult(result.data);
        // console.log("step 4: got wishlsht from data");
      } catch (error) {
        // showLoginModal();
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (wishlistResult) {
      const paintingIdArray = wishlistResult.map((w) => w.paintingId);
      localStorage.setItem("Wishlist", JSON.stringify(wishlistResult));
      localStorage.setItem("paintingIdArray", JSON.stringify(paintingIdArray));
      // console.log("step 5: record to localStorage", WToS);
      setWToS(!WToS);
    }
    // setLike(!like);
  }, [wishlistResult]);
  // useEffect for preload data
  useEffect(() => {
    if (isLogin) getWishList();
  }, [isLogin, addRemoveWishlistprocessed]);

  // Create a Provider component
  const loginModalRef = useRef(null); // useRef for loginModal
  const incorrectAccountModalRef = useRef(null); // useRef for loginModal
  const IncorrectPasswordModalRef = useRef(null); // useRef for loginModal
  const PasswordChangedRef = useRef(null); // useRef for loginModal
  // Function to trigger the modal
  const showLoginModal = () => {
    if (loginModalRef.current) {
      const modal = new bootstrap.Modal(loginModalRef.current); // Use bootstrap.Modal directly
      modal.show();
    }
  };
  // Function to trigger the offcanvas
  const showBiddingHistoryRef = () => {
    if (biddingHistoryRef.current) {
      const Offcanvas = new bootstrap.Offcanvas(biddingHistoryRef.current); // Use bootstrap.offcanvas directly
      Offcanvas.show();
    }
  };

  // Function to trigger the modal
  const showIncorrectAccountModal = () => {
    if (incorrectAccountModalRef.current) {
      const modal = new bootstrap.Modal(incorrectAccountModalRef.current); // Use bootstrap.Modal directly
      modal.show();
    }
  };

  // Function to trigger the modal
  const showIncorrectPasswordModal = () => {
    if (IncorrectPasswordModalRef.current) {
      const modal = new bootstrap.Modal(IncorrectPasswordModalRef.current); // Use bootstrap.Modal directly
      modal.show();
    }
  };

  // Function to trigger the modal
  const showPasswordChangedRef = () => {
    if (PasswordChangedRef.current) {
      const modal = new bootstrap.Modal(PasswordChangedRef.current); // Use bootstrap.Modal directly
      modal.show();
    }
  };
  // const getSearch = async () => {
  //   const api = path + `/PTController/search?${searchParams}`;
  //   const result = await axiosConfig.get(api);
  //   console.log(result);
  // };

  useEffect(() => {
    setSearch(searchParams.get("keyword"));
    // console.log("search", search);
  }, [searchParams]);
  //for test method
  // useEffect(() => {
  //   if (search) getSearch();
  // }, [search]);
  return (
    <MainContext.Provider
      value={{
        artistList,
        setArtisList,
        getArtistList,
        getWishList,
        requestPageNumber,
        setRequestPageNumber,
        search,
        setSearch,
        searchParams,
        searchResultRef,
        setSearchParams,
        loginModalRef,
        showLoginModal,

        setWToS,
        WToS,
        addRemoveWishlistprocessed,
        setaddRemoveWishlistprocessed,
        incorrectAccountModalRef,
        showIncorrectAccountModal,
        IncorrectPasswordModalRef,
        showIncorrectPasswordModal,
        PasswordChangedRef,
        showBiddingHistoryRef,
        showPasswordChangedRef,
        reLoadBiddingHistory,
        setReLoadBiddingHistory,
        reLoadBiddingNum,
        setReLoadBiddingNum,
        cardNumber2Ref,
        cardNumber3Ref,
        cardNumber4Ref,
        handleCardNumberChange,
        handleExpirationDateChange,
        handleCvvChange,
        validateForm,
        errors,
        recipientInfo,
        setRecipientInfo,
        paymentInfo,
        setPaymentInfo,
        biddingHistoryRef,
        email,
        setEmail,
        handleEmail,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
// Define propTypes for the component
MainContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate that 'children' prop is passed
};
