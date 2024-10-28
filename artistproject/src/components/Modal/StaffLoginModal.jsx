import { useForm } from "react-hook-form";
import projectLogo from "../../assets/LOGO.png";
import axiosInstance from "../../axiosConfig";
import axios from "axios";
// import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../ContextProvider/UserContext";
export default function StaffLoginModal() {
  const path = import.meta.env.VITE_DATA_HOST_API;
  const navigate = useNavigate();
  const [islogin, setIslogin] = useState(false);
  const { setIsLogin } = useContext(UserContext);
  // const divRef = useRef(null);
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const api = path + "/StaffController/login";
      const result = await axios.post(api, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("staffName", result.data.staffName);
      localStorage.setItem("roleId", result.data.roleId);
      setIslogin(!islogin);
      setIsLogin(true);
    } catch (error) {
      console.log("登入錯誤:" + error);
      if (error.response.data === "Username doesn't exist") {
        alert("Username doesn't exist");
        // showIncorrectAccountModal();
      } else if (error.response.data === "Invalid password") {
        // showIncorrectPasswordModal();
        alert("Invalid password");
      }
    }
  };
  useEffect(() => {
    const staffName = localStorage.getItem("staffName");
    // console.log(staffName);
    if (staffName) {
      navigate(`/staffdashboard`);
    }
  }, [islogin]);
  return (
    <div
      className="modal fade"
      id="StaffLoginModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="logo d-flex justify-content-center mt-5">
            <img
              className="projectLogo w-50 h-50"
              src={projectLogo}
              alt="Logo"
            ></img>
          </div>
          <form action="" onSubmit={handleSubmit(onSubmit)} id="myForm">
            <div className="input">
              <h2 className="d-flex m-5">Staff Log In</h2>
              <div className="d-block mt-5 m-2">
                <div className="row m-2">
                  <label className="col-3" htmlFor="staffUsername">
                    Username :
                  </label>
                  <input
                    id="username"
                    className="txtbox col-8"
                    name="staffUsername"
                    type="text"
                    placeholder="Username"
                    {...register("staffUsername")}
                  />
                </div>
                <div className="row m-2">
                  <label className="col-3" htmlFor="password">
                    Password :
                  </label>
                  <input
                    id="password"
                    className="txtbox col-8"
                    name="password"
                    type="text"
                    placeholder="Password"
                    {...register("password")}
                  />
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center m-5">
              {/* <div className="btn col-3" data-bs-dismiss="modal">
                LOG IN
              </div> */}
              <button
                type="submit"
                className="btn btn-primary col-3"
                data-bs-dismiss="modal"
              >
                LOG IN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
