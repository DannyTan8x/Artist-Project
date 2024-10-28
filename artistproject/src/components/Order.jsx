import { useState } from "react";
import { useContext } from "react"; // 新增 useContext
import { MainContext } from "./ContextProvider/MainContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";

function Order() {
  //導航到confirmOrder頁面
  const navigate = useNavigate();
  const { recipientInfo, setRecipientInfo, errors, validateForm, paymentInfo } =
    useContext(MainContext);

  //處理表單確認按鈕
  const handleOrderConfirmClick = async (e) => {
    e.preventDefault();
    const isValid = validateForm(recipientInfo, paymentInfo);
    if (isValid) {
      try {
        // 構建 API 請求的 payload
        const payload = {
          attName: recipientInfo.name,
          attPhone: recipientInfo.phone,
          deliveryAddress: recipientInfo.address,
          deliveryInstrictions: document.getElementById("instructions").value,
          orderList: JSON.parse(localStorage.getItem("selectedOrderNumbers")),
          deliveryFee: parseInt(localStorage.getItem("deliveryfee")), // 假設有這個信息
          totalAmount: parseInt(localStorage.getItem("subtotal")), // 假設有這個信息
          // orderList: paymentInfo.orderList.map((orderNumber) => ({
          //   orderNumber: orderNumber,
          // })
          // ),
        };
        // 發送 POST 請求到後端 API，創建出貨單
        const response = await axiosInstance.post(
          "/DeliveryOrderController/createDeliveryOrder",
          payload
        );
        console.log(response.data);
        localStorage.setItem(
          "DeliveryOrderNumber",
          JSON.stringify(response.data)
        );
        // 導航至 OrderPage 頁面
        navigate("/home/cusdashboard/ConfirmOrder");
      } catch (error) {
        console.error("出貨單成立錯誤:", error);
      }
    } else {
      console.log("表單驗證失敗");
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setRecipientInfo({ ...recipientInfo, [name]: value });
  // };

  //處理checkbox的部份
  const [isChecked, setIsChecked] = useState(false);

  // 模擬獲取客戶資料的函數
  const getCustomer = async () => {
    const path = import.meta.env.VITE_DATA_HOST_API;
    const api = path + "/customers/initEditData";
    try {
      const result = await axiosInstance.get(api);
      console.log(result.data);

      // 返回獲取到的客戶資料
      return result.data;
    } catch (error) {
      console.error("Error fetching customer data:", error);
      return null;
    }
  };

  //當勾選的時候獲取客戶資料
  const handleCheckboxChange = async (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      // 當勾選時，調用 API 獲取客戶資料並填充表單
      const customer = await getCustomer();
      if (customer) {
        setRecipientInfo({
          name: customer.name,
          phone: customer.phone,
          address: customer.address,
        });
      }
    } else {
      // 如果取消勾選，清空表單資料
      setRecipientInfo({
        name: "",
        phone: "",
        address: "",
      });
    }
  };

  return (
    <div className="orderInfo mt-5 row justify-content-center">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-12">
            {/* Recipient Information 標題 */}
            <h1 className="underline mb-4">Recipient Information</h1>

            <form>
              {/* Same as customer information Checkbox */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="sameAsCustomer"
                  checked={isChecked}
                  onChange={handleCheckboxChange} // 綁定 onChange 事件
                />
                <label
                  className="form-check-label grayfont"
                  htmlFor="sameAsCustomer"
                >
                  Same as customer information
                </label>
              </div>
              {/* Name Input */}
              <div className="form-group mb-3">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter recipient name"
                  value={recipientInfo.name}
                  onChange={(e) =>
                    setRecipientInfo({ ...recipientInfo, name: e.target.value })
                  }
                />
                {/* 顯示名稱的錯誤訊息 */}
                {errors.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
              </div>
              {/* Phone Input */}
              <div className="form-group mb-3">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={recipientInfo.phone}
                  onChange={(e) =>
                    setRecipientInfo({
                      ...recipientInfo,
                      phone: e.target.value,
                    })
                  }
                />
                {/* 顯示電話號碼的錯誤訊息 */}
                {errors.phone && (
                  <div className="text-danger">{errors.phone}</div>
                )}
              </div>
              {/* Address Input */}
              <div className="form-group mb-3">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Enter your address"
                  value={recipientInfo.address}
                  onChange={(e) =>
                    setRecipientInfo({
                      ...recipientInfo,
                      address: e.target.value,
                    })
                  }
                />
                {/* 顯示地址的錯誤訊息 */}
                {errors.address && (
                  <div className="text-danger">{errors.address}</div>
                )}
              </div>
              {/* Shipping Method */}
              <div className="form-group mb-3">
                <p>Shipping Method : Delivery</p>
              </div>
              {/* Delivery Instructions */}
              <div className="form-group mb-3">
                <label htmlFor="instructions">Delivery Instructions:</label>
                <textarea
                  className="form-control"
                  id="instructions"
                  rows="3"
                ></textarea>
              </div>

              <div className="place-Bid d-flex justify-content-center m-5 ">
                <div
                  className="btn btn-primary"
                  onClick={handleOrderConfirmClick}
                >
                  Confirm
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
