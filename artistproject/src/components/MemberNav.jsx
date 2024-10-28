
import { MainContext } from "./ContextProvider/MainContext";
import { Link, useLocation } from "react-router-dom"; // 從 react-router-dom 引入


function MemberNav (){
    const location = useLocation();
    return(
        <div className="container mt-5">
            <ul className="nav justify-content-center h4">
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/home/cusdashboard/myaccount' ? 'active border-bottom' : ''}`} to="/home/cusdashboard/myaccount">
            My Account
            </Link>
            </li>

            <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/home/cusdashboard/winningRecords' ? 'active border-bottom' : ''}`} to="/home/cusdashboard/winningRecords">
            My WinningRecords
            </Link>
            </li>

            <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/home/cusdashboard/OrderRecord' ? 'active border-bottom' : ''}`} to="/home/cusdashboard/OrderRecord">
            My Order
            </Link>
            </li>

            <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/home/cusdashboard/MyWallet' ? 'active border-bottom' : ''}`} to="/home/cusdashboard/MyWallet">
            My Wallet
            </Link>
            </li>

            <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/home/cusdashboard/MyWishList' ? 'active border-bottom' : ''}`} to="/home/cusdashboard/MyWishList">
            My Wishlist
            </Link>
            </li>
            </ul>
        </div>
    )

}

export default MemberNav;