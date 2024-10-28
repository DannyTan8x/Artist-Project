import { useContext, useRef } from "react";
import projectLogo from "../../assets/LOGO.png";
import { MainContext } from "../ContextProvider/MainContext";
import axios from "axios";
import * as bootstrap from "bootstrap"; // 引入整個 Bootstrap 模組

export default function PasswordResetEmailModel() {
  // 從 context 中讀取 email
  const { email } = useContext(MainContext);
  // 使用 useRef 來引用模態框
  const modalRef = useRef(null);

  //讀取後端api
  const path = import.meta.env.VITE_DATA_HOST_API;
  const Authorization = localStorage.getItem("token");
  const api = path + "/sendPasswordResetLink";

  const submit = async () => {
    try {
      const result = await axios.post(
        api,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("password reset link sent:", result.data);
      const modalInstance = bootstrap.Modal.getInstance(modalRef.current);
      if (modalInstance) {
        modalInstance.hide(); // 關閉模態框
      }
    } catch (error) {
      console.log("Failed to send :", error);
    }
  };

  return (
    <div
      ref={modalRef}
      className="modal fade"
      id="PasswordResetEmailModel"
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
          <div className="PasswordResetEmailModel">
            <div className="py-5 d-flex justify-content-center">
              <img
                className="projectLogo  w-50 h-100 "
                src={projectLogo}
                alt="Logo"
              ></img>
            </div>
            <div className="px-4 text-center h5">
              <p>
                We have sent a password reset link to your email, please check
                and follow the instructions
              </p>

              <p className="grayfont">E-mail : {email}</p>
            </div>

            <div className="row my-5 mx-auto justify-content-center">
              <div className="btn col-3 mx-2" id="OK" onClick={submit}>
                OK
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
