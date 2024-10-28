import PropTypes from "prop-types";
import axiosInstance from "../axiosConfig";
import { useContext, useEffect, useState, useRef } from "react";
import { MainContext } from "./ContextProvider/MainContext";
const path = import.meta.env.VITE_DATA_HOST_API;

export default function AddFavoriteBtn({ paintingId }) {
  const [liked, setLiked] = useState();
  const [hearProps, setHearProps] = useState();
  const [addPainting, setAddPainting] = useState(null);
  const [resetColor, setResetColor] = useState(false);

  const {
    showLoginModal,
    addRemoveWishlistprocessed,
    setaddRemoveWishlistprocessed,
    WToS,
  } = useContext(MainContext);

  function handleClick() {
    // console.log("Favornewclicked: ", paintingId);
    setAddPainting({ paintingId: paintingId });
    // console.log("step 1: clicked");
  }
  useEffect(() => {
    if (addPainting === null) return;
    if (addPainting) {
      !liked ? addWishlist() : removeWishlist(paintingId);
      // console.log("step2: execute add/ remove");
    }
  }, [addPainting]);

  const addWishlist = async () => {
    const authorization = localStorage.getItem("token");
    const api = path + "/api/wishlist";
    try {
      if (authorization) {
        await axiosInstance.post(api, addPainting);
        // setLoadWishlist(true); // Trigger wishlist update
        // setLike(!like);
        setaddRemoveWishlistprocessed(!addRemoveWishlistprocessed);
        setLiked(true);
        // console.log("step 3: add!");
      } else {
        showLoginModal();
        console.log("please login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeWishlist = async (cardId) => {
    try {
      const api = path + `/api/wishlist/${cardId}`;
      await axiosInstance.delete(api);
      setaddRemoveWishlistprocessed(!addRemoveWishlistprocessed);
      setLiked(false);
      // console.log("step 3: removed!");
    } catch (e) {
      console.log(e);
    }
  };
  // useEffect(() => {
  //   setGetWishListData(!getWishlistData);
  //   setLoadWishlist(!loadWishlist);
  // }, [ liked]);

  useEffect(() => {
    setLiked(false);
    if (localStorage.getItem("paintingIdArray") != null)
      JSON.parse(localStorage.getItem("paintingIdArray")).map((i) => {
        if (i == paintingId) {
          setLiked(true);
        }
      });
    // console.log("step 6: check localStorage to setLiked", liked);

    setResetColor(!resetColor);
  }, [WToS]);

  useEffect(() => {
    let color = "";
    let fill = "";
    let d = "";
    if (liked) {
      color = "red";
      fill = "bi bi-heart-fill";
      d =
        "M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314";
    } else {
      color = "currentColor";
      fill = "bi bi-heart";
      d =
        "m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15";
    }
    setHearProps(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill={color}
        className={fill}
        viewBox="0 0 16 16"
      >
        <path fillRule="evenodd" d={d} />
      </svg>
    );
  }, [resetColor]);

  return (
    <>
      {" "}
      <span className="btn btn mx-3" style={{ position: "relative" }}>
        <span
          onClick={handleClick}
          data-value={liked}
          id={paintingId}
          style={{
            position: "absolute",
            display: "flex",
            height: "100%",
            width: "100%",
            opacity: "90%",
            zIndex: "2",
          }}
        ></span>
        FAV
        {hearProps}
        RITE
      </span>
    </>
  );
}

AddFavoriteBtn.propTypes = {
  paintingId: PropTypes.string.isRequired,
};
