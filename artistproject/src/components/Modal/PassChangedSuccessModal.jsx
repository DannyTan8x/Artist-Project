import projectLogo from "../../assets/LOGO.png";
export default function PassChangedSuccessModal() {
  return (
    <div
      className="modal fade"
      id="PassChangedSuccessModal"
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
          <div className="PassChangedSuccessModal">
            <div className="py-5 d-flex justify-content-center">
              <img
                className="projectLogo  w-50 h-100 "
                src={projectLogo}
                alt="Logo"
              ></img>
            </div>
            <div className="px-4 text-center h5">
              <p>
              Password has been changed, please log in.
              </p>

            </div>

            <div className="row my-5 mx-auto justify-content-center">
                <div
                  className="btn col-3 mx-2"
                  id="OK"
                  data-bs-dismiss="modal"
                >
                  OK
                </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}
