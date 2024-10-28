import axios from "axios";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig";
export default function EditAccount() {
  const path = import.meta.env.VITE_DATA_HOST_API;
  const Authorization = localStorage.getItem("token");
  const api = path + "/customers/EditAccount";
  const [data, setData] = useState({
    name: "",
    nickName: "",
    phone: "",
    address: "",
  });
  // const [cust, setCust] = useState({
  //   name: "",
  //   nickName: "",
  //   phone: "",
  //   address: "",
  // });
  const getCustomer = async () => {
    const path = import.meta.env.VITE_DATA_HOST_API;
    const Authorization = localStorage.getItem("token");
    const api = path + "/customers/initEditData";
    if (Authorization) {
      //axiosInstance就有回傳token的功能
      const result = await axiosInstance.get(api);
      // const result = await axios.get(api);
      // console.log(result.data);
      // setData(result.data)
      setData(result.data);
      // handleChange();
    } else {
      // showLogingModal();
      console.log("please login");
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setData({ ...data, [name]: value });
    console.log(data);
  };
  const submit = async () => {
    try {
      console.log(data);
      if (Authorization) {
        const result = await axiosInstance.put(api, data);
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="modal fade"
      id="editAccount"
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
          <div className="px-5 d-flex ">
            <h2 className="w-100 border-bottom pb-3">Edit Account Setting </h2>
          </div>
          <form action="">
            <div className="input">
              <div className="d-block mt-5 m-2">
                <div className="row m-2 d-flex justify-content-center">
                  <label
                    className="col-3 d-flex justify-content-start"
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
                    value={data.name}
                  />
                </div>
                <div className="row m-2 d-flex justify-content-center">
                  <label
                    className="col-3 d-flex justify-content-start"
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
                    value={data.nickName}
                  />
                </div>
                <div className="row m-2 d-flex justify-content-center">
                  <label
                    className="col-3 d-flex justify-content-start"
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
                    value={data.phone}
                  />
                </div>
                <div className="row m-2 d-flex justify-content-center">
                  <label
                    className="col-3 d-flex justify-content-start"
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
                    value={data.address}
                  />
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center m-5">
              <div
                className="btn col-3 btn-primary"
                data-bs-dismiss="modal"
                onClick={submit}
              >
                Confirm
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
