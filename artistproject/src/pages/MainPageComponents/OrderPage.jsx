import CustomerInfo from "../../components/CustomerInfo";
import PaymentMethod from "../../components/PaymentMethod";
import Order from "../../components/Order";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import axios from "axios";

function OrderPage() {
  //local storage data
  const selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
  const subtotal = localStorage.getItem("subtotal");
  const servicefee = localStorage.getItem("servicefee");
  const deliveryfee = localStorage.getItem("deliveryfee");
  const allfee = localStorage.getItem("allfee");

  // State for CustomerInfo
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // State for PaymentMethod
  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: "CreditCard",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  // State for Order (Recipient)
  const [recipientInfo, setRecipientInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // 使用這些數據在下一個頁面中顯示
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(selectedItems, subtotal, servicefee, deliveryfee, allfee);
  }, [selectedItems, subtotal, servicefee, deliveryfee, allfee]);

  // Handle form submission
  // const handleSubmitOrder = () => {
  //   const orderData = {
  //     selectedItems,
  //     subtotal,
  //     servicefee,
  //     deliveryfee,
  //     allfee,
  //     customerInfo,
  //     paymentInfo,
  //     recipientInfo,

  //   };

  //   axios.post("/api/orders", orderData)
  //     .then(response => {
  //       console.log("Order submitted successfully", response);
  //     })
  //     .catch(error => {
  //       console.error("Error submitting order", error);
  //     });
  // };

  return (
    <div className="container mt-5 w-75">
      <CustomerInfo />
      <PaymentMethod
        paymentInfo={paymentInfo}
        setPaymentInfo={setPaymentInfo}
      />
      <Order
        recipientInfo={recipientInfo}
        setRecipientInfo={setRecipientInfo}
      />

      {/* <div className="d-flex justify-content-center m-5 ">
        <button
          className="btn btn-primary"
          // onClick={handleOrderConfirmClick}
        >
          Submit Order
        </button>
      </div> */}
    </div>
  );
}

export default OrderPage;
