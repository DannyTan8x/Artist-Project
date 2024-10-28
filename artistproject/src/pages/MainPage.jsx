import { Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import LoginModal from "../components/Modal/LoginModal";
import StaffLoginModal from "../components/Modal/StaffLoginModal";
import Register from "../components/Modal/RegisterModal";
import HomeLayout from "./MainPageComponents/HomeLayout";
import SignupSuccess from "../components/Modal/SignupSuccess";
import PasswordResetEmailModal from "../components/Modal/PasswordResetEmailModal";
import IncorrectPasswordModal from "../components/Modal/IncorrectPasswordModal";
import IncorrectAccountModal from "../components/Modal/IncorrectAccountModal";
import PasswordChanged from "./MainPageComponents/PasswordChanged";
import PassChangedSuccessModal from "../components/Modal/PassChangedSuccessModal";

import Deposit from "../components/Modal/DepositModal";

import DeleteAccount from "./MainPageComponents/MyAccountComponents/DeleteAccount";
import ViewContainer from "./MainPageComponents/ViewContainer";
import MyAccount from "./MainPageComponents/MyAccount";

import { MainContextProvider } from "../components/ContextProvider/MainContext";
import ViewByArtistContainer from "./MainPageComponents/ViewByArtistContainer";
import Auction from "../components/Auction";
import Footer from "../components/Footer";
import CusDashboard from "./CusDashboard";
import ComingSoon from "./Comingsoon";
import EditAccount from "./MainPageComponents/MyAccountComponents/EditAccount";
import OrderPage from "./MainPageComponents/OrderPage";
import OrderRecord from "./MainPageComponents/OrderRecord";
import WinningRecords from "./MainPageComponents/WinningRecords";
import WishlistOffcanvas from "../components/Offcanvas/WishlistOffcanvas";
import ConfirmOrder from "./MainPageComponents/ConfirmOrder";
import MyWallet from "./MainPageComponents/MyWallet";
import BiddingHistoryOffcanvas from "../components/Offcanvas/BiddingHistoryOffcanvas";
import ChangeCreditCardModal from "../components/Modal/ChangeCreditCardModal";
import MyWishList from "./MainPageComponents/MyWishList";

export default function MainPage() {
  return (
    <>
      <MainContextProvider>
        <NavBar></NavBar>
        <Routes>
          {/*不用登入就可以看到的 */}
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<ViewContainer />} />

            <Route path=":id" element={<ViewByArtistContainer />} />
            <Route path="/auction/:id" element={<Auction />} />
            <Route
              path="/reset-password/:token"
              element={<PasswordChanged />}
            />
          </Route>

          {/*要登入才可以看到的 */}
          <Route path="/cusdashboard" element={<CusDashboard />}>
            <Route path="myaccount" element={<MyAccount />} />
            <Route
              path="myaccount/PasswordChanged"
              element={<PasswordChanged />}
            />
            <Route path="comingsoon" element={<ComingSoon />}></Route>
            <Route path="winningRecords" element={<WinningRecords />} />
            <Route path="OrderRecord" element={<OrderRecord />} />
            <Route path="MyWallet" element={<MyWallet />} />
            <Route path="ConfirmOrder" element={<ConfirmOrder />} />
            <Route path="OrderPage" element={<OrderPage />} />
            <Route path="MyWishList" element={<MyWishList />} />
          </Route>
        </Routes>
        {/* modal for navbar vv */}
        <LoginModal></LoginModal>
        <EditAccount />
        <DeleteAccount />
        <StaffLoginModal></StaffLoginModal>
        <Register></Register>
        <SignupSuccess />
        <Deposit />
        <PasswordResetEmailModal />
        <IncorrectAccountModal />
        <IncorrectPasswordModal />
        <PassChangedSuccessModal />
        <ChangeCreditCardModal />

        {/* modal for navbar ^^ */}
        {/* Offcanvas vv*/}
        <WishlistOffcanvas />
        <BiddingHistoryOffcanvas />
        {/* Offcanvas ^^*/}
        <Footer />
      </MainContextProvider>
    </>
  );
}
