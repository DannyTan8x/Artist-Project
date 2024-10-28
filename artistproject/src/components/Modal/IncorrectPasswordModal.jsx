import projectLogo from "../../assets/LOGO.png";
import { useContext } from "react";
import { MainContext } from "../ContextProvider/MainContext";


export default function IncorrectPasswordModal() {
  const { IncorrectPasswordModalRef } = useContext(MainContext);
  return (
    <div
    ref={IncorrectPasswordModalRef}
      className="modal fade"
      id="IncorrectPasswordModal"
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
             data-bs-toggle="modal"
                data-bs-target="#LoginModal"
              aria-label="Close"
            ></button>
          </div>
          <div className="IncorrectPasswordModal">
            <div className="py-5 d-flex justify-content-center">
              <img
                className="projectLogo  w-50 h-100 "
                src={projectLogo}
                alt="Logo"
              ></img>
            </div>
            <div className="h3 text-center">Your password is incorrect, please try again or reset your password.
            </div>
            <div className="login-btn d-flex justify-content-center m-5">
              <div
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#PasswordResetEmailModel"
              >
                Reset password
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
