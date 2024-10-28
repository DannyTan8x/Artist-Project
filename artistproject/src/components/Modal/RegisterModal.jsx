import axios from "axios";
import { useState } from "react";
import projectLogo from "../../assets/LOGO.png";
export default function RegisterModal() {
  const path = import.meta.env.VITE_DATA_HOST_API;
  const api = path + "/customers/register";
  const [data, setData] = useState({
    name: "",
    nickName: "",
    phone: "",
    email: "",
    address: "",
    account: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setData({ ...data, [name]: value });
    console.log(data);
  };
  const submit = async () => {
    try {
      const result = await axios.post(api, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="modal fade"
      id="registerModel"
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

          <div className="h2 my-3 "></div>
          <div className="py-3 d-flex justify-content-center">
            <img
              className="projectLogo  w-50 h-50"
              src={projectLogo}
              alt="Logo"
            ></img>
          </div>
          <form action="">
            <div className="input">
              <div className="d-block mt-3 m-2">
                <div className="row m-2 d-flex justify-content-center">
                  <label
                    className="col-4 d-flex justify-content-start"
                    htmlFor="name"
                  >
                    Name :
                  </label>
                  <input
                    id="name"
                    className="txtbox col-7"
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="row m-2 d-flex justify-content-center">
                  <label
                    className="col-4 d-flex justify-content-start"
                    htmlFor="nickname"
                  >
                    NickName :
                  </label>
                  <input
                    id="nickname"
                    className="txtbox col-7"
                    name="nickName"
                    type="text"
                    placeholder="NickName"
                    onChange={handleChange}
                  />
                </div>

                <div className="row m-2 d-flex justify-content-center">
                  <label
                    className="col-4 d-flex justify-content-start"
                    htmlFor="Email"
                  >
                    Email :
                  </label>
                  <input
                    id="Email"
                    className="txtbox col-7"
                    name="email"
                    type="text"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </div>
                <div className="row m-2 d-flex justify-content-center">
                  <label
                    className="col-4 d-flex justify-content-start"
                    htmlFor="Password"
                  >
                    Password :
                  </label>
                  <input
                    id="Password"
                    className="txtbox col-7"
                    name="password"
                    type="text"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
                <div className="row m-2 d-flex justify-content-center">
                  <label
                    className="col-4 d-flex justify-content-start"
                    htmlFor="Phone"
                  >
                    Phone :
                  </label>
                  {/* <span class="col-1 px-0" >:</span> */}
                  <input
                    id="Phone"
                    className="txtbox col-7"
                    name="phone"
                    type="text"
                    placeholder="Phone"
                    onChange={handleChange}
                  />
                </div>
                <div className="row m-2 d-flex justify-content-center">
                  <label
                    className="col-4 d-flex justify-content-start"
                    htmlFor="Address"
                  >
                    Address :
                  </label>
                  <textarea
                    id="Address"
                    className="txtbox col-7 overflow-scroll"
                    name="address"
                    type="text"
                    placeholder="Address"
                    rows="3"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center m-5">
              <div
                className="btn col-4 btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#SignupSuccess"
                onClick={submit}
              >
                SIGN UP
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
