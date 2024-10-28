import { useEffect, useState, useContext } from "react";
import projectLogo from "../assets/LOGO.png";
import $ from "jquery";
import { UserContext } from "./ContextProvider/UserContext";
import { Link, useNavigate } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import { MainContext } from "./ContextProvider/MainContext";
export default function NavBar() {
  const navigate = useNavigate();
  const { userName, setUserName, isLogin, setIsLogin } =
    useContext(UserContext);
  const { WToS, artistList, getArtistList, getWishList, reLoadBiddingNum } =
    useContext(MainContext);

  const [accountfeild, setAccountfeild] = useState();
  const [wishlistNumber, setWishlistNumber] = useState();
  const [token, setToken] = useState(null);
  const [biddingNum, setBiddingNum] = useState();
  const [paintingIdArray, setPaintingIdArray] = useState();

  useEffect(() => {
    const updateWishlistNumber = () => {
      setPaintingIdArray(JSON.parse(localStorage.getItem("paintingIdArray")));
    };

    updateWishlistNumber(); // Immediately recheck wishlist number
  }, [WToS, isLogin]);

  useEffect(() => {
    setWishlistNumber(paintingIdArray ? paintingIdArray.length : "");
    // console.log("step 6: change Navbar wishlist number");
  }, [paintingIdArray]);

  useEffect(() => {
    setBiddingNum(
      localStorage.getItem("biddingHistory") != null
        ? JSON.parse(localStorage.getItem("biddingHistory")).length
        : ""
    );
  }, [isLogin, reLoadBiddingNum]);

  useEffect(() => {
    $(".nav-link").on("click", function () {
      $(".nav-link").removeClass("active"); // Remove "active" class from all
      $(this).addClass("active"); // Add "active" class to the clicked element
    });

    return () => {
      $(".nav-link").off("click");
    };
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickName");
    localStorage.removeItem("paintingIdArray");
    localStorage.removeItem("Wishlist");
    localStorage.removeItem("biddingHistory");
    localStorage.removeItem("selectedOrderNumbers");
    // setReLoadBiddingNum(!reLoadBiddingNum);
    setIsLogin(false);
    setToken(null);
    setUserName(null);
    navigate("/home");
    // setLike(!like);
    // setLoadWishlist(!loadWishlist);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    getArtistList();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      setAccountfeild(
        <>
          <button
            type="button"
            className="btn "
            data-bs-toggle="modal"
            data-bs-target="#LoginModal"
          >
            Log_In
          </button>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#registerModel"
          >
            SIGN UP
          </button>
        </>
      );
    } else {
      setAccountfeild(
        <>
          <div className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Hi! {localStorage.getItem("nickName")}
            </span>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="cusdashboard/myaccount">
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="cusdashboard/winningRecords"
                >
                  My WinningRecords
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="cusdashboard/OrderRecord">
                  My Order
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="cusdashboard/MyWallet">
                  My Wallet
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="cusdashboard/MyWishList">
                  My WishList
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <span className="dropdown-item" onClick={logout}>
                  Log out
                </span>
              </li>
            </ul>
          </div>
        </>
      );
    }
    getWishList();
  }, [isLogin, userName, token]);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <Link to="/">
          <img className="projectLogo" src={projectLogo} alt="Logo"></img>
        </Link>
        <SearchComponent />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse m-2"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto m-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home" aria-current="page">
                Home
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Artists
              </a>
              <ul className="dropdown-menu">
                {artistList.map((a, i) => {
                  return (
                    <li key={i}>
                      <div className="dropdown-item d-flex justify-content-between">
                        <Link className="text-decoration-none" to={a.artistId}>
                          {a.artistName}
                        </Link>
                        <a className="ms-3" href={a.url} target="_blank">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-wikipedia"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8.835 3.003c.828-.006 2.688 0 2.688 0l.033.03v.288q0 .12-.133.12c-.433.02-.522.063-.68.29-.087.126-.258.393-.435.694l-1.52 2.843-.043.089 1.858 3.801.113.031 2.926-6.946q.152-.42-.044-.595c-.132-.114-.224-.18-.563-.195l-.275-.014a.16.16 0 0 1-.096-.035.1.1 0 0 1-.046-.084v-.289l.042-.03h3.306l.034.03v.29q0 .117-.133.117-.65.03-.962.281a1.64 1.64 0 0 0-.488.704s-2.691 6.16-3.612 8.208c-.353.672-.7.61-1.004-.019A224 224 0 0 1 8.044 8.81c-.623 1.285-1.475 3.026-1.898 3.81-.411.715-.75.622-1.02.019-.45-1.065-1.131-2.519-1.817-3.982-.735-1.569-1.475-3.149-1.943-4.272-.167-.4-.293-.657-.412-.759q-.18-.15-.746-.18Q0 3.421 0 3.341v-.303l.034-.03c.615-.003 3.594 0 3.594 0l.034.03v.288q0 .119-.15.118l-.375.016q-.483.02-.483.288-.002.125.109.4c.72 1.753 3.207 6.998 3.207 6.998l.091.023 1.603-3.197-.32-.71L6.24 5.095s-.213-.433-.286-.577l-.098-.196c-.387-.77-.411-.82-.865-.88-.137-.017-.208-.035-.208-.102v-.304l.041-.03h2.853l.075.024v.303q0 .104-.15.104l-.206.03c-.523.04-.438.254-.09.946l1.057 2.163 1.17-2.332c.195-.427.155-.534.074-.633-.046-.055-.202-.144-.54-.158l-.133-.015a.16.16 0 0 1-.096-.034.1.1 0 0 1-.045-.085v-.288l.041-.03Z" />
                          </svg>
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <a
              className="d-flex"
              href="#wishlistOffcanvas"
              role="button"
              data-bs-toggle="offcanvas"
              aria-controls="wishlistOffcanvas"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-suit-heart"
                viewBox="0 0 16 16"
              >
                <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
              </svg>
              <span className="wishlistNumber">
                {wishlistNumber}
                {/* {localStorage.getItem("paintingIdArray") != null
                  ? JSON.parse(localStorage.getItem("paintingIdArray")).length
                  : ""} */}
              </span>
            </a>
            <a
              className="d-flex"
              href="#biddingHistoryOffcanvas"
              role="button"
              data-bs-toggle="offcanvas"
              aria-controls="BiddingHistoryModal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-bag-check-fill m-4"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"
                />
              </svg>
              <span className="biddingNumber">
                {biddingNum}
                {/* {localStorage.getItem("biddingHistory") != null
                  ? JSON.parse(localStorage.getItem("biddingHistory")).length
                  : ""} */}
              </span>
            </a>
            {accountfeild}
          </div>
        </div>
      </div>
    </nav>
  );
}
