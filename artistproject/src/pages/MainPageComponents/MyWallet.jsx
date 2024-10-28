import { useEffect, useState } from "react";
import MywalletCard from "./MyAccountComponents/MyWalletCard";
import axiosInstance from "../../axiosConfig";


function MyWallet() {

  //讀取後端api
  const path = import.meta.env.VITE_DATA_HOST_API;
  const Authorization = localStorage.getItem("token");
  const api = path + "/customers/mywallet";

  //API 返回錢包記錄
  const [walletInfo, setWalletInfo] = useState({
    bankAccount: "1234567890",
    creditCardNo: "4111111111111111",
    bankBalance: 640.0,
    biddingHistory: []
  });


  
  // 錢包記錄
  const [myWalletCard, setMyWalletCard] = useState();

  // 取得wallet記錄
  const getwalletInfo= async () => {
    if (Authorization) {
      //axiosInstance就有回傳token的功能
      const result = await axiosInstance.get(api);
      // console.log("line 28 :", result.data);
      setWalletInfo(result.data);
     
    }
  };

  useEffect(() => {
    getwalletInfo();
  }, []);

  useEffect(() => {
    // console.log("line 41", walletInfo.biddingHistory);
    if(walletInfo)
    setMyWalletCard(
      walletInfo.biddingHistory.length > 0
        ? walletInfo.biddingHistory.map((bh, i) => {
          console.log(i);
            return (
              
              
              <MywalletCard
                key={i}
                biddingHistory={bh}
                money="mb"
              />
            
            );
          })
        : "1"
    );
    console.log(myWalletCard);
  }, [walletInfo.biddingHistory]);
 
  
  

  return (
    <div className="container mt-5 mb-5">
      {/* My Wallet 標題區塊 */}

      <h1 className="mb-3">My Wallet</h1>
      <div className="h1 underline mb-4"></div>

      {/* 信用卡資訊區塊 */}
      <div className="border p-4">
        <div className="h2 mb-5">Credit Card Information:</div>
        <div className="d-flex justify-content-between gap-4 h4 mt-2">
          <div className="text-end w-50">
            <p>Bank :</p>
            <p>Credit Card Number :</p>
          </div>
          <div className="text-star w-50">
            <p>{walletInfo.bankAccount}</p>
            <p>{walletInfo.creditCardNo}</p>
          </div>
        </div>
        <div className="btn m-4 " 
        data-bs-toggle="modal"
                        data-bs-target="#ChangeCreditCardModal">Change credit card</div>
      </div>
     

      {/* 錢包資訊區塊 */}
      <div className="border p-4 mt-5">
        <div className="h2 mb-5">Wallet imformation :</div>
        <p>
          To participate in this auction,a refundable deposit is required. This
          deposit will be used as a guarantee of your bids and will be refunded
          if you do not win any items. The deposit amount is calculated as a
          percentage of the current bid. You are required to pay a deposit of
          10% of your current bid amount during the bid. The refunded deposit
          will be placed in the website wallet, and you can transfer the amount
          to your account from the website wallet.
        </p>

        {/* 錢包資訊區塊 */}
        <div className="d-flex justify-content-between h2  px-5 mt-5">
          <div className="h3 text-star">Current Balance :</div>
          <div className="h3 text-end">{walletInfo.bankBalance}</div>
        </div>
        <div className="underline"></div>
        <div>
          {myWalletCard }
        </div>
      </div>
    </div>
  );
}

export default MyWallet;
