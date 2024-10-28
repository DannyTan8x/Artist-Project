import React from "react";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { MainContext } from "./ContextProvider/MainContext";

function CustomerInfo() {
  const [customer, setCustomer] = useState({
    name: "",
    nickName: "",
    email: "",
    phone: "",
    address: "",
  });

  //1.先回傳token
  const getCustomer = async () => {
    const path = import.meta.env.VITE_DATA_HOST_API;
    const api = path + "/customers/initEditData";
    try {
      // 直接發送請求，不再檢查 token，因為已經假設用戶已登入
      const result = await axiosInstance.get(api);
      // console.log(result.data);

      // 將獲取到的客戶資料設置到狀態中
      setCustomer(result.data);
    } catch (error) {
      // 處理請求錯誤
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <div className="customerinfo">
      <div className="h1 underline">Customer Information</div>
      <div className="mt-5">
        <div className="d-flex flex-column justify-content-star">
          <div className="row d-flex justify-content-star">
            <div className="col-2">
              <h4>Name:</h4>
            </div>
            <div className="col-3">
              <h4>{customer.name}</h4>
            </div>
          </div>
          <div className="row d-flex justify-content-star">
            <div className="col-2">
              <h4>E-mail:</h4>
            </div>
            <div className="col-3">
              <h4>{customer.email}</h4>
            </div>
          </div>
          <div className="row d-flex justify-content-star">
            <div className="col-2">
              <h4>Phone:</h4>
            </div>
            <div className="col-3">
              <h4>{customer.phone}</h4>
            </div>
          </div>
          <div className="row d-flex justify-content-star">
            <div className="col-2">
              <h4>Address:</h4>
            </div>
            <div className="col-3">
              <h4>{customer.address}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;
