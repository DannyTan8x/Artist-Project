import { useContext, useRef } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../axiosConfig";
import { MainContext } from "../../components/ContextProvider/MainContext";
import {useNavigate } from "react-router-dom";

const path = import.meta.env.VITE_DATA_HOST_API;
export default function MyWishListCard({ wishlisProps, minWidth, imgHeight }) {
  const { setaddRemoveWishlistprocessed,
     addRemoveWishlistprocessed } =
     useContext(MainContext);
  const divRef = useRef(null);
  const navigate = useNavigate();
  const removeWishlist = async (event) => {
    const api = path + `/api/wishlist/${event.target.id}`;
    const result = await axiosInstance.delete(api);
    setaddRemoveWishlistprocessed(!addRemoveWishlistprocessed);

  };
  const placeBid = (e) => {
    if(divRef.current){
      console.log(divRef.current.id);
      navigate(`/home/auction/${divRef.current.id}`);
    }
  };
  return (
    <>
      <div className="cards d-flex flex-column align-items-center">
        <div className="photoFrame"  style={{ minWidth: `${minWidth}` }}>
          <div id={wishlisProps.paintingId} onClick={placeBid} ref={divRef}>
            <div className="d-flex justify-content-center">
            <img
                className="img-fluid"
                src={wishlisProps.smallUrl}
                alt="product1"
                style={{ height: `${imgHeight}` }}
            />
            </div>
            <label className="form-check-label mt-3" htmlFor="select">
            <div className="h5">{wishlisProps.paintingName}</div>
            <div>{wishlisProps.artisName}</div>
            <div>{wishlisProps.price}</div>
            </label>
          </div>
            <div className="d-flex justify-content-center align-items-center ">
            <div
                className="btn d-flex justify-content-center"
                // type="button"
                style={{ position: "relative" }}
                id={wishlisProps.paintingId}
            >
                <span
                onClick={removeWishlist}
                id={wishlisProps.paintingId}
                style={{
                    position: "absolute",
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    // backgroundColor: "black",
                    opacity: "90%",
                    zIndex: "2",
                }}
                ></span>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3-fill"
                viewBox="0 0 16 16"
                >
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg>
            </div>
            </div>
        </div>
      </div>
    </>
  );
}

MyWishListCard.propTypes = {
  wishlisProps: PropTypes.shape({
    artisName: PropTypes.string.isRequired,
    paintingId: PropTypes.string.isRequired,
    paintingName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    smallUrl: PropTypes.string.isRequired,
  }).isRequired,
};
