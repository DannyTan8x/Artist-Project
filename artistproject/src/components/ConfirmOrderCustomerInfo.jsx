import CustomerInfo from "./CustomerInfo";

function ConfirmOrderCustomerInfo() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className=" h1 border w-75 mb-5">
        <div className=" mt-5 ms-5 me-5">
          <CustomerInfo />

          {/* Payment imformation
        <div className="h1 underline mt-5">Payment </div>
        <div className="mt-5">
          <div className=" flex-column h3">
            <p>Payment method: Credit Card</p>
            <p>Credit Card Number: 1234-1234-1234-1234</p>
            <p>Credit Card Installments: 3 months</p>
          </div>
        </div> */}

          {/*Recipient imformation */}
          <div className="h1 underline mt-5">Recipient information </div>
          <div className="mt-5">
            <div className=" flex-column h3">
              <p>Recipient's Name: Chen Yo Yo</p>
              <p>Phone: 1234</p>
              <p>Address: 236 NewTaipeiCity</p>
              <p>E-mail: yoyoyo394@gmail.com</p>
              <p>Shipping Method: Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ConfirmOrderCustomerInfo;
