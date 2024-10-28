// import MemberNav from "../../components/MemberNav";
// import OrderPage from "./OrderPage";
import { useContext, useEffect, useState } from "react"; // 新增 useContext
import { MainContext } from "../../components/ContextProvider/MainContext";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import WinningRecordsCard from "./MyAccountComponents/WinningRecordsCard";

export default function WinningRecords() {
  //讀取後端api
  const path = import.meta.env.VITE_DATA_HOST_API;
  const Authorization = localStorage.getItem("token");

  //管理選中的項目
  const [selectedItems, setSelectedItems] = useState([]);

  // 管理selectAll選中的狀態
  const [isSelecAllChecked, setIsSelecAllChecked] = useState(false);

  // 管理 是否全選
  const [isSelecAll, setIsSelecAll] = useState();

  //管理subtotal的狀態
  const [subtotal, setSubtotal] = useState(0);

  //管理 Service fee
  const [servicefee, setServicefee] = useState(0);

  //管理運費 delivery fee
  const [deliveryfee, setDeliveryfee] = useState(0);

  //管理 總額 total
  const [allfee, setAllfee] = useState(0);

  //管理 deposit
  const [deposit, setDeposit] = useState(0);

  //管理 winningRecordsCard
  const [winningRecordsCard, setWinningRecordsCard] = useState();

  //API 返回得標記錄
  const [winningRecords, setWinningRecords] = useState({});
  // ({
  //   paintingId: "PT0001",
  //   paintingName: "The Virgin and Child (The Madonna of the Rose)",
  //   artistId: "AR0001",
  //   artisName: "Giovanni Antonio Boltraffio",
  //   smallUrl:
  //     "https://uploads7.wikiart.org/images/giovanni-antonio-boltraffio/the-virgin-and-child-the-madonna-of-the-rose.jpg!Large.jpg",
  //   price: 3150.0,
  // });

  // 取得得標記錄
  const getWinningRecords = async () => {
    if (Authorization) {
      //axiosInstance就有回傳token的功能
      const api = path + "/customers/mywinningrecords";
      const result = await axiosInstance.get(api);
      console.log(result.data);
      setWinningRecords(result.data.winningRecords);
    }
  };
  useEffect(() => {
    getWinningRecords();
  }, []);

  // 當selet All 被選中或取消選中
  const handleSelectedAllChange = (e) => {
    setIsSelecAllChecked(e.target.checked);
    setIsSelecAll(e.checked);
    console.log("clicked", isSelecAllChecked);
  };

  useEffect(() => {
    const sa = [];
    if (isSelecAllChecked) {
      winningRecords?.map((bp) => {
        sa.push(bp.orderNumber);
      });
    } else {
      setSelectedItems([]);
    }
    setSelectedItems(sa);
    console.log(isSelecAllChecked);
  }, [isSelecAllChecked]);

  useEffect(() => {
    console.log(isSelecAllChecked, "finall array", selectedItems);
  }, [selectedItems]);

  //根據selectedItems計算subtotal的金額
  useEffect(() => {
    console.log("winningRecords: ", winningRecords);
    //使用selectedItems找出選中項目並計算總價
    const total = selectedItems
      ?.map((orderNumber) => {
        const selectedRecord = winningRecords.find(
          (record) => record.orderNumber === orderNumber
        ); // 正確的屬性應該是orderNumber
        return selectedRecord ? selectedRecord.price : 0;
      })
      .reduce((sum, price) => sum + price, 0);
    setSubtotal(total);
  }, [selectedItems, winningRecords]);

  //根據total算servicefee
  useEffect(() => {
    const serfee = Math.round(subtotal * 0.01);
    setServicefee(serfee);
  }, [subtotal]);

  //根據畫作多少決定運費
  useEffect(() => {
    const delfee = selectedItems?.length * 120;
    setDeliveryfee(delfee);
  }, [selectedItems]);

  // 算押金
  useEffect(() => {
    const des = selectedItems
      ?.map((orderNumber) => {
        const selectedRecord = winningRecords.find(
          (record) => record.orderNumber === orderNumber
        ); // 使用orderNumber
        return selectedRecord ? selectedRecord.price : 0;
      })
      .reduce((sum, price) => sum + price, 0);

    const finallydes = Math.round(0 - des * 0.01);
    setDeposit(finallydes);
  }, [selectedItems, winningRecords]);

  // 加總所有金額
  useEffect(() => {
    const allfee = subtotal + deliveryfee + servicefee;
    setAllfee(allfee);
  }, [subtotal, deliveryfee, servicefee]);

  useEffect(() => {
    setWinningRecordsCard(
      winningRecords.length > 0 ? (
        winningRecords.map((bp, i) => {
          return (
            <WinningRecordsCard
              key={i}
              WinningRecordsCardProps={bp}
              isSelecAllChecked={isSelecAllChecked}
              setIsSelecAll={setIsSelecAll}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          );
        })
      ) : (
        <Link to="/home">Let get what you like...</Link>
      )
    );
    console.log(winningRecordsCard);
  }, [winningRecords, isSelecAllChecked]);

  const navigate = useNavigate();

  const handlePaymentClick = () => {
    // 將選中的項目以及其他資料存到 localStorage
    const orderObjectList = [];
    selectedItems.map((i) => {
      orderObjectList.push({ orderNumber: `${i}` });
    });
    localStorage.setItem(
      "selectedOrderNumbers",
      JSON.stringify(orderObjectList)
    );
    // localStorage.setItem("selectedOrderNumbers", JSON.stringify(selectedItems));
    localStorage.setItem("subtotal", subtotal);
    localStorage.setItem("servicefee", servicefee);
    localStorage.setItem("deliveryfee", deliveryfee);
    localStorage.setItem("deposit", deposit);
    localStorage.setItem("allfee", allfee);

    // 導航至 OrderPage 頁面
    navigate("/home/cusdashboard/OrderPage");
  };
  return (
    <div className="container">
      <div className="title mb-5 py-5 border-bottom">
        <h2>Winning Records</h2>
      </div>
      <div className="cart mb-5">
        <div className="">
          <div className="form-check ">
            <input
              className="form-check-input "
              type="checkbox"
              checked={isSelecAll}
              onChange={handleSelectedAllChange} // 當狀態改變時觸發事件處理
            />
            <label className="form-check-label" htmlFor="selectAll">
              Select All
            </label>
          </div>

          <div className="p-5">{winningRecordsCard}</div>

          <div className="row d-flex justify-content-end px-5">
            <div className="col-8">
              <div className="d-flex justify-content-between row">
                <div className="col-4">
                  <h4>Subtotal</h4>
                </div>
                <div className="col-1">
                  <h4>NT$</h4>
                </div>
                <div className="col-4 text-end me-5">
                  <h4>{subtotal}</h4>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between row">
                  <div className="col-4">
                    <h4>Delivery fee</h4>
                  </div>
                  <div className="col-1">
                    <h4>NT$</h4>
                  </div>
                  <div className="col-4 text-end me-5">
                    <h4>{deliveryfee}</h4>
                  </div>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between row text-info">
                  <div className="col-4 ">
                    <h4>Deposit</h4>
                  </div>
                  <div className="col-1">
                    <h4>NT$</h4>
                  </div>
                  <div className="col-4 text-end me-5">
                    <h4>{deposit}</h4>
                  </div>
                </div>
              </div>

              <div className=" border-bottom">
                <div className="d-flex justify-content-between row">
                  <div className="col-4">
                    <h4>Service fee</h4>
                  </div>
                  <div className="col-1">
                    <h4>NT$</h4>
                  </div>
                  <div className="col-4 text-end me-5">
                    <h4>{servicefee}</h4>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between row">
                <div className="col-4">
                  <h3>Total</h3>
                </div>
                <div className="col-1">
                  <h3>NT$</h3>
                </div>
                <div className="col-4 text-end me-5">
                  <h3>{allfee}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center m-5 ">
            <div
              className="col-3 btn btn-primary py-3 h5"
              onClick={handlePaymentClick}
            >
              Enter payment information
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
