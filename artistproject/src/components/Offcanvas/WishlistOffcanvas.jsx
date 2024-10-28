import { useEffect, useState, useContext } from "react";
import WishlistOffCanCard from "./WishlistOffCanCard";
import { UserContext } from "../ContextProvider/UserContext";
import { MainContext } from "../ContextProvider/MainContext";

export default function WishlistOffcanvas() {
  const { isLogin } = useContext(UserContext);
  const { WToS } = useContext(MainContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // console.log("isLogin state:", isLogin);
    if (isLogin) {
      const storedWishlist = localStorage.getItem("Wishlist");
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
        // console.log("Wishlist found:", JSON.parse(storedWishlist));
      } else {
        // console.log("No Wishlist found in localStorage");
      }
    } else {
      // console.log("User is not logged in, clearing wishlist");
      setWishlist([]);
    }
  }, [isLogin, WToS]);

  return (
    <>
      <div
        className="offcanvas offcanvas-end "
        tabIndex="-1"
        id="wishlistOffcanvas"
        aria-labelledby="wishlistOffcanvasLabel"
      >
        <div className="offcanvas-header bg-primary-text-gold">
          <h5 className="offcanvas-title" id="wishlistOffcanvasLabel">
            Favorites List
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex  flex-column">
          {wishlist.length > 0
            ? wishlist.map((wp, i) => {
                return <WishlistOffCanCard key={i} wishlisProps={wp} />;
              })
            : "please feel free to add plainting to Favorites List"}
        </div>
      </div>
    </>
  );
}
