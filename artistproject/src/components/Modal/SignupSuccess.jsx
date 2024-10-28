import projectLogo from "../../assets/LOGO.png";
export default function SignupSuccess() {
  return (
    <div
      className="modal fade"
      id="SignupSuccess"
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
          <div className="Signupsuccess">
            <div className="py-5 d-flex justify-content-center">
              <img
                className="projectLogo  w-50 h-100 "
                src={projectLogo}
                alt="Logo"
              ></img>
            </div>
            <div className="">
              <div className="h2 text-center">Sign Up Successful.</div>
              <div className="h2 text-center">Click the Button to log in.</div>
            </div>
            <div className="login-btn d-flex justify-content-center m-5">
              <div
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#LoginModal"
              >
                LOG IN
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
