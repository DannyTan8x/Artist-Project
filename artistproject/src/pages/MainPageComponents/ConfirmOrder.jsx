import { useEffect, useState } from "react";
// import ConfirmOrderCustomerInfo from "../../components/ConfirmOrderCustomerInfo";
// import ConfirmOrderDetial from "../../components/ConfirmOrderDetial";
import CustomerInfo from "../../components/CustomerInfo";
import axiosInstance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import Thumbnail from "../../components/Thumbnail";

function ConfirmOrder() {
  const path = import.meta.env.VITE_DATA_HOST_API;

  const [formattedDate, setFormattedDate] = useState();
  const navigate = useNavigate();
  const [DeliveryOrders, setDeliveryOrders] = useState(() =>
    JSON.parse(localStorage.getItem("DeliveryOrders"))
  );
  const [Total, setTotal] = useState(() =>
    JSON.parse(localStorage.getItem("allfee"))
  );
  const [servicefee, setServiceFee] = useState(() =>
    JSON.parse(localStorage.getItem("servicefee"))
  );
  const [paintingArray, setPaintingArray] = useState([]);
  const [ThumbnailCards, setThumbnailCards] = useState(null);
  useEffect(() => {
    if (DeliveryOrders?.orderList) {
      const paintingIds = DeliveryOrders.orderList.map((o) => o.paintingId);
      setPaintingArray(paintingIds);
    }
  }, [DeliveryOrders, setPaintingArray]);

  useEffect(() => {
    if (paintingArray.length > 0) {
      setThumbnailCards(
        paintingArray.map((p, i) => <Thumbnail key={i} paintingID={p} />)
      );
    }
  }, [paintingArray, setThumbnailCards]);
  // 取得得標記錄

  const getDeliveryOrders = async () => {
    const DeliveryOrders = JSON.parse(
      localStorage.getItem("DeliveryOrderNumber")
    );
    try {
      const api =
        path +
        `/DeliveryOrderController/selectbydeliveryNumber/${DeliveryOrders}`;

      const result = await axiosInstance.get(api);
      console.log(result);
      localStorage.setItem("DeliveryOrders", JSON.stringify(result.data));
      setDeliveryOrders(result.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getDeliveryOrders();
  }, []);

  const localStorageCleaning = () => {
    localStorage.removeItem("DeliveryOrderNumber");
    localStorage.removeItem("DeliveryOrders");
    localStorage.removeItem("allfee");
    localStorage.removeItem("deposit");
    localStorage.removeItem("servicefee");
    localStorage.removeItem("subtotal");
    localStorage.removeItem("deliveryfee");
    navigate("/home");
  };

  useEffect(() => {
    const date = new Date(DeliveryOrders?.createDate);

    // Get the date parts
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    // Get the time parts
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format it to yyyy-mm-dd hh:mm:ss
    setFormattedDate(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
  }, [DeliveryOrders]);

  return (
    <div className="container mt-5">
      <div className="h1 text-center">Thank You</div>

      <div className="text-center grayfont">
        <div>
          <span className="me-3">Delivery Order number :</span>
          <span>{DeliveryOrders?.deliveryNumber}</span>
        </div>
        <div>
          <span className="me-3">Order date :</span>
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* <ConfirmOrderDetial /> */}
      <div className="d-flex justify-content-center mt-5">
        <div className="border w-75 mb-5">
          <div className="h1">Order Detail:</div>
          <div className="row gap-5 m-5">
            {/* Render Thumbnail components */}
            {/* {paintingArray?.map((p, i) => (
            <Thumbnail key={i} paintingID={p} />
          ))} */}
            {ThumbnailCards}
          </div>

          <div className="h1 underline ms-5 me-5"></div>

          <div className="d-flex justify-content-between align-items-start mb-5">
            {/* Delivery Instructions */}
            <div className="d-block w-100">
              <label className="h3 grayfont text-start ms-5">
                Delivery Instructions:
              </label>
              <textarea
                className="form-control ms-5 mt-2 w-75"
                rows="10"
                cols="5"
                defaultValue={DeliveryOrders?.deliveryInstrictions}
              ></textarea>
            </div>

            {/* Total calculation */}
            <div className="row d-flex justify-content-end ms-2 me-5 mt-5 w-100">
              <div className="col-8">
                <div className="d-flex justify-content-between row">
                  <div className="col-4">
                    <h4>Subtotal</h4>
                  </div>
                  <div className="col-1">
                    <h4>NT$</h4>
                  </div>
                  <div className="col-4">
                    <h4>
                      {new Intl.NumberFormat("en-IN", {}).format(
                        DeliveryOrders?.totalAmount
                      )}
                    </h4>
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
                    <div className="col-4">
                      <h4>
                        {new Intl.NumberFormat("en-IN", {}).format(
                          DeliveryOrders?.deliveryFee
                        )}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="d-flex justify-content-between row">
                    <div className="col-4">
                      <h4>Service fee</h4>
                    </div>
                    <div className="col-1">
                      <h4>NT$</h4>
                    </div>
                    <div className="col-4">
                      <h4>
                        {new Intl.NumberFormat("en-IN", {}).format(servicefee)}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="h1 underline me-3"></div>

                <div className="d-flex justify-content-between row">
                  <div className="col-4">
                    <h3>Total</h3>
                  </div>
                  <div className="col-1">
                    <h3>NT$</h3>
                  </div>
                  <div className="col-4">
                    <h3>{new Intl.NumberFormat("en-IN", {}).format(Total)}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ConfirmOrderCustomerInfo /> */}

      <div className="d-flex justify-content-center mt-5">
        <div className=" h1 border w-75 mb-5">
          <div className=" mt-5 ms-5 me-5">
            <CustomerInfo />

            {/*Recipient imformation */}
            <div className="h1 underline mt-5">Recipient information </div>
            <div className="mt-5">
              <div className=" flex-column h3">
                <p>Recipient&apos;s Name: {DeliveryOrders?.attName}</p>
                <p>Phone: {DeliveryOrders?.attPhone}</p>
                <p>Address: {DeliveryOrders?.deliveryAddress}</p>
                <p>Shipping Method: FOB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center mb-5">
        <div className="col-2">
          <div className="btn btn-primary" onClick={localStorageCleaning}>
            OK
          </div>
        </div>
      </div>
    </div>
  );
}
export default ConfirmOrder;
