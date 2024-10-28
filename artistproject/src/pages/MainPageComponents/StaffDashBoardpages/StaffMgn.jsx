import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { useForm } from "react-hook-form";
import axios from "axios";
export default function StaffMgn() {
  const path = import.meta.env.VITE_DATA_HOST_API;
  const [staffList, setStaffList] = useState([]); //所有員工名單 目前for navBar 選單用
  const [staffTable, setStaffTable] = useState();
  const [uploadToggle, setUploadToggle] = useState(false);
  const [readData, setReadData] = useState();
  const [inputData, setInputData] = useState();

  const {
    register, //Form state
    handleSubmit, //submit action
    unregister,
    reset,
    watch, //watching form control change
    setValue, //set value from watched control
  } = useForm();

  // methods for loading data
  const getStaffList = async () => {
    const api = path + "/StaffController/findall";
    // 等同 $.ajax(" get blablablba ")
    try {
      const result = await axiosInstance.get(`${api}`);
      console.log(result.data);
      setStaffList(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStaffList();
  }, [uploadToggle]);
  //將資料更新至table
  useEffect(() => {
    if (staffList) setStaffTable(buildStaffTable());
  }, [staffList]);

  useEffect(() => {
    if (readData) {
      document.getElementById("staffId").value = readData.staffId;
      setValue("staffId", readData.staffId);
      document.getElementById("staffName").value = readData.staffName;
      setValue("staffName", readData.staffName);
      document.getElementById("staffDepartment").value =
        readData.staffDepartment;
      setValue("staffDepartment", readData.staffDepartment);
      document.getElementById("staffUsername").value = readData.staffUsername;
      setValue("staffUsername", readData.staffUsername);
      document.getElementById("staffPassword").value = readData.staffPassword;
      setValue("staffPassword", readData.staffPassword);
    }
  }, [readData]);

  //刪除按鈕
  const deleteStaff = async (event) => {
    const id = event.target.id;
    console.log(id);
    const api = path + "/StaffController/";
    // 等同 $.ajax(" get blablablba ")
    try {
      const result = await axios.delete(`${api}${id}`);
      console.log(result.data);
      //刷新頁面用
      setUploadToggle(!uploadToggle);
      alert("刪除成功");
    } catch (error) {
      console.log("delete" + error);
    }
  };

  //編輯按鈕
  const editStaff = async (event) => {
    const id = event.target.id;
    console.log(id);
    const api = path + "/StaffController/" + id;
    // 等同 $.ajax(" get blablablba ")
    try {
      const result = await axiosInstance.get(`${api}`);
      console.log(result.data);
      setReadData(result.data);
      // setInputData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  //有id就對資料進行修改
  const updataStaff = async () => {
    const api = path + "/StaffController/editStaff";

    const result = await axios.put(`${api}`, inputData);
    // console.log(result.data);
    //刷新頁面用
    setUploadToggle(!uploadToggle);
    reset();
    alert("修改成功");
  };
  //沒有id時就建立一個新的
  //新增
  const createStaff = async () => {
    console.log(inputData);
    try {
      const api = path + "/StaffController/createStaff";
      const result = await axiosInstance.post(api, inputData);
      // console.log(result.data);
      //刷新頁面用
      setUploadToggle(!uploadToggle);
      reset();
      alert("新增成功");
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (inputData)
      try {
        // 確認有沒有id
        if (!inputData.staffId) {
          if (
            inputData.staffName &&
            inputData.staffDepartment &&
            inputData.staffUsername &&
            inputData.staffPassword
          ) {
            console.log(inputData);
            createStaff();
          } else {
            alert("欄位不能為空");
          }
        } else {
          // setInputData(inputData);
          updataStaff();
        }
      } catch (error) {
        console.log(error);
      }
    console.log(inputData);
  }, [inputData]);

  const onSubmit = (data) => {
    console.log(data);
    //確認資料
    if (data.confirmed) {
      // unregister("confirmed");
      // console.log("unregister: ", data);
      setInputData(data);
    } else {
      alert("Please Confirmed");
    }
  };

  const buildStaffTable = () => {
    return staffList.map((a, i) => {
      console.log(a);
      return (
        <tr key={i}>
          <th scope="row">{a.staffId}</th>
          <td>{a.staffName}</td>
          <td>{a.staffDepartment}</td>
          <td>{a.staffUsername}</td>
          {/* <td>{a.staffPassword}</td> */}
          <td>
            {a.roleId == 1 ? "Manager" : a.roleId == 2 ? "Leader" : "Staff"}
          </td>
          <td className="d-flex align-items-center justify-content-center">
            <div className="row d-flex">
              <div className="btn col-6" id={a.staffId} onClick={editStaff}>
                Edit
              </div>
              <div
                className="btn btn-danger col-6"
                id={a.staffId}
                onClick={deleteStaff}
              >
                Delete
              </div>
            </div>
          </td>
        </tr>
      );
    });
  };
  return (
    <>
      <div className="h1 mt-5">Staff Managerment</div>
      <div className="row">
        <form className="col-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="staffId" className="form-label">
              Staff Id
            </label>
            <input
              type="text"
              className="form-control"
              id="staffId"
              aria-describedby="emailHelp"
              readOnly
              {...register("staffId")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="staffName" className="form-label">
              Staff Name
            </label>
            <input
              type="text"
              className="form-control"
              id="staffName"
              aria-describedby="emailHelp"
              {...register("staffName")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="staffDepartment" className="form-label">
              Staff Department
            </label>
            <input
              type="text"
              className="form-control"
              id="staffDepartment"
              aria-describedby="emailHelp"
              {...register("staffDepartment")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="staffUsername" className="form-label">
              Staff UserName
            </label>
            <input
              type="text"
              className="form-control"
              id="staffUsername"
              aria-describedby="emailHelp"
              {...register("staffUsername")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="staffPassword" className="form-label">
              Staff PassWord
            </label>
            <input
              type="text"
              className="form-control"
              id="staffPassword"
              aria-describedby="emailHelp"
              {...register("staffPassword")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="roleId" className="form-label">
              Role
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              id="roleId"
              {...register("roleId")}
              // value={selectedOption}
              // onChange={handleSelectChange}
            >
              <option value={0}>...</option>
              <option value={1}>Manager</option>
              <option value={2}>Leader</option>
              <option value={3}>Staff</option>
              {/* {artistSelectionList} */}
            </select>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="confirmed"
              {...register("confirmed")}
            />
            <label className="form-check-label" htmlFor="confirmed">
              Confirmed
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div className="col"></div>
        <div
          className="table-responsive col-8"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Staff Id</th>
                <th scope="col">Staff Name</th>
                <th scope="col">Staff Department</th>
                <th scope="col">Staff UserName</th>
                {/* <th scope="col">Staff PassWord</th> */}
                <th scope="col">Staff Role</th>
                <th scope="col">Modify</th>
              </tr>
            </thead>
            <tbody style={{ maxHeight: "380px", overflowY: "auto" }}>
              {staffTable}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
