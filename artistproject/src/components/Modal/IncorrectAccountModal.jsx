import { useContext } from "react";
import projectLogo from "../../assets/LOGO.png";
import { MainContext } from "../ContextProvider/MainContext";
import * as bootstrap from "bootstrap"; // Import Bootstrap as a module

export default function IncorrectAccountModal() {
  const { incorrectAccountModalRef} = useContext(MainContext);
  
  return (
    <div
      ref={incorrectAccountModalRef}
      className="modal fade"
      id="IncorrectAccountModal"
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
              // data-bs-dismiss="IncorrectAccountModal"
              // onClick={closeaction}
               data-bs-toggle="modal"
                data-bs-target="#LoginModal"
        
              aria-label="Close"
            ></button>
          </div>
          <div className="IncorrectAccountModal">
            <div className="py-5 d-flex justify-content-center">
              <img
                className="projectLogo  w-50 h-100 "
                src={projectLogo}
                alt="Logo"
              ></img>
            </div>
            <div className="px-4">
              <h2 className="h3 text-center">
                Account does not exist, please check your input or register a
                new account.
              </h2>
            </div>
            <div className="login-btn d-flex justify-content-center m-5">
              <div
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#LoginModal"
              >
                Confirm
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
