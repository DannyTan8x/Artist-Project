import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import Thumbnail from "../../components/Thumbnail";

export default function OrderRecord() {
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [order, setOrder] = useState();
  const path = import.meta.env.VITE_DATA_HOST_API;
  useEffect(() => {
    const api = path + "/customers/myorderrecords";
    async function fetchData() {
      try {
        const result = await axiosInstance.get(api);
        console.log(result.data);
        setDeliveryOrders(result.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const buildDeliveryOrder = () => {
    if (deliveryOrders.length > 0) {
      return deliveryOrders.map((order, index) => (
        <div key={index} className="border mt-5 mb-5">
          <div className="OrderInfo h4 mt-4 d-flex flex-column justify-content-center align-items-left gap-4 ms-5">
            <div className="d-flex gap-3">
              <label className="me-3">Delivery Order Number:</label>
              <p>{order.deliveryNumber}</p>
            </div>
            <div className="d-flex gap-3">
              <label className="me-3">Order Date:</label>
              <label>{order.createDate}</label>
            </div>
            <div className="d-flex gap-3">
              <label className="me-3">Order Stute:</label>
              <label>{order.status}</label>
            </div>

            <div className="d-flex gap-3">
              <label className="me-3">Reipent Address:</label>
              <label>{order.deliveryAddress}</label>
            </div>
            <div className="d-flex gap-3">
              <label className="me-3">Total:</label>
              <label>
                $ {new Intl.NumberFormat("en-IN", {}).format(order.totalAmount)}
              </label>
            </div>
          </div>

          <div className="h1 underline mt-5 ms-5 me-5"> </div>
          <div className="mb-5">
            {order.paintings?.map((p, i) => (
              <div key={i} className="col-md-11 ms-5">
                <div className="mt-5 d-flex gap-5 align-items-center">
                  <Thumbnail paintingID={p.paintingId} />

                  <div>
                    <label className="h2">{p.paintingName}</label>
                    <br />
                    <label className="h4 grayfont">{p.artistName}</label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ));
    } else {
      return <p>No orders found</p>;
    }
  };

  useEffect(() => {
    setOrder(buildDeliveryOrder());
  }, [deliveryOrders]);
  return (
    <div className="container mt-5 w-75">
      <div>
        <div className="h1 underline mt-5">My order</div>
        {order}
      </div>
    </div>
  );
}
