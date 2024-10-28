import { Outlet } from "react-router-dom";
import StaffNavBar from "./MainPageComponents/StaffDashBoardpages/StaffNavBar";

export default function StaffDashboar() {
  return (
    <>
      <div className="staffDashboard">
        <StaffNavBar />
        <div className="container mt-5 pt-5">
          <Outlet />
        </div>
      </div>
    </>
  );
}
