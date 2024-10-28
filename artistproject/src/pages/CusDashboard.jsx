import { Outlet } from "react-router-dom";
import MemberNav from "../components/MemberNav";

export default function CusDashboard() {
  return (
    <>
      <div className="cusdash">
        <MemberNav/>
        <Outlet />
      </div>
    </>
  );
}
