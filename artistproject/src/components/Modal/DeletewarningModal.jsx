export default function DeleteWarningModal() {
  return (
    <div
      className="modal modal-lg fade"
      id="DeleteWarning"
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
          <div className="DeleteWarning">
            <div className=" my-3">
              <h2>Do you want to remove the winning item?</h2>
            </div>
            <div className="icon">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-exclamation-triangle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </div>
            <div className="">
              <h5>
                Doing so may result in additional fees and restiriction of
                future participation
              </h5>
            </div>
            <div className="row  d-flex justify-content-center m-5">
              <div className="border border-dark col-2 py-2 ">DELETE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
