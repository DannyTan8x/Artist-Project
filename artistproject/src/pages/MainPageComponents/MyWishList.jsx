import { useContext, useEffect, useState } from "react";
import WishlistOffCanCard from "../../components/Offcanvas/WishlistOffCanCard";
import { UserContext } from "../../components/ContextProvider/UserContext";
import { MainContext } from "../../components/ContextProvider/MainContext";
import MyWishListCard from "./MyWishListCard";

function MyWishList(){
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
    return(
        <div className="container mt-5 mb-5">
        {/* My MyWishList 標題區塊 */}
            <h1 className="mb-3">WishList</h1>
            <div className="h1 underline mb-4"></div>
            <div className="container d-flex flex-wrap">
            {wishlist.length > 0
            ? wishlist.map((wp, i) => {
                return <MyWishListCard key={i}
                 wishlisProps={wp}
                 minWidth="15rem"
                 imgHeight="15rem" />;
              })
              : "please feel free to add plainting to Favorites List"}
            </div>
        </div>
    );
}
export default MyWishList;