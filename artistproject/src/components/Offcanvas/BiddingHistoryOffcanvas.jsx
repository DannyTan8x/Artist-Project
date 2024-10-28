import { useContext, useEffect, useState } from "react";
import BiddingHistoryCard from "./BiddingHistoryCard";
import { UserContext } from "../ContextProvider/UserContext";
import { MainContext } from "../ContextProvider/MainContext";
import axiosInstance from "../../axiosConfig";

export default function BiddingHistoryOffcanvas() {
  const { isLogin, setLogin } = useContext(UserContext);
  const {
    reLoadBiddingHistory,
    setReLoadBiddingNum,
    reLoadBiddingNum,
    biddingHistoryRef,
  } = useContext(MainContext);
  const [biddingHistory, setBiddingHistory] = useState([]);
  const [reLoadCard, setReLoadCard] = useState(false);
  const [renderCart, setRenderCart] = useState();

  const getBiddingHistory = async () => {
    const path = import.meta.env.VITE_DATA_HOST_API;
    const api = path + "/api/bidding/history";
    const authorization = localStorage.getItem("token");

    if (authorization) {
      const result = await axiosInstance.get(api);
      // console.log(result.data);
      //拿資料
      setBiddingHistory(result.data);
      //存入記憶體
      localStorage.setItem("biddingHistory", JSON.stringify(result.data));
    } else {
      console.log("please login");
    }
  };

  useEffect(() => {
    if (isLogin) {
      //取得token
      const cheaktoken = localStorage.getItem("token");
      //確認登入
      if (cheaktoken) {
        //將token轉為JSON存到setWishlist
        getBiddingHistory();
        setReLoadCard(!reLoadCard);
        // setBiddingHistory(JSON.parse(storedBiddingHistory));
      }
    }
  }, [isLogin, reLoadBiddingHistory]);

  useEffect(() => {
    setReLoadBiddingNum(!reLoadBiddingNum);
    setRenderCart(
      biddingHistory.length > 0
        ? biddingHistory.map((bp, i) => {
            return <BiddingHistoryCard key={i} biddingHistoryProps={bp} />;
          })
        : ""
    );
  }, [reLoadCard, biddingHistory]);

  return (
    <>
      <div
        ref={biddingHistoryRef}
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="biddingHistoryOffcanvas"
        aria-labelledby="biddingHistoryOffcanvas"
      >
        <div className="offcanvas-header bg-primary-text-gold">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Bidding History
          </h5>
          {/* <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> */}
        </div>
        <div className="offcanvas-body">
          {renderCart}
          {/* {biddingHistory.length > 0
            ? biddingHistory.map((bp, i) => {
                return <BiddingHistoryCard key={i} biddingHistoryProps={bp} />;
              })
            : ""} */}
        </div>
      </div>
    </>
  );
}
