import { useEffect, useState } from "react";
import Thumbnail from "./Thumbnail";

function ConfirmOrderDetail() {
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
  }, [paintingArray]);

  return (
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
  );
}

export default ConfirmOrderDetail;
