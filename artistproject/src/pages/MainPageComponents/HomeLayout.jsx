import { Outlet } from "react-router-dom";
import Carousel from "../../components/Carousel";

export default function HomeLayout() {
  return (
    <div className="homelayout">
      <Carousel></Carousel>

      <Outlet />
    </div>
  );
}
