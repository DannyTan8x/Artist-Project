import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function OrderMgn() {
  const path = import.meta.env.VITE_DATA_HOST_API;
  const [deliveryList, setDeliveryList] = useState([]); //所有訂單明細 目前for navBar 選單用
  const [inputData,setInputData] = useState();
  const [orderTable, setOrderTable] = useState();
  const [readData, setReadData] = useState();
  const [uploadToggle, setUploadToggle] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  // const [findByStatus,setFindByStatus] =useState();
  const {
    register, //Form state
    handleSubmit, //submit action
    reset,
    setValue, //set value from watched control
  } = useForm();
  const [role3staff,setRole3staff] =useState();
  const [role2Staff,setRole2Staff] =useState();
  const [staffList,setStaffList] =useState();
  const [deliveryStaffList,setDeliveryStaffList]=useState();
  const [packageStaffList,setPackageStaffList] =useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [staffOption,setStaffOption] =useState("");
  const [packagestaffOption,setPackageStaffOption] =useState("");
  const handleDeliverySelectChange = (event) => {
    setStaffOption(event.target.value);
    // console.log(event.target.value);
  };
  const handlePackageSelectChange = (event) => {
    setPackageStaffOption(event.target.value);
    // console.log(event.target.value);
  };
  const handleStatusChange =(event) =>{
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  }
  //取得status的data
  const getdata = useCallback(async () => {
    const api = path + "/DeliveryOrderController/selectByStatus/";
    if (!selectedOption) return; // Prevent call if artistId is not available

    try {
      const result = await axiosInstance.get(
        `${api}${selectedOption}`
      );
      console.log(result.data);
      setDeliveryList(result.data)
    } catch (error) {
      console.log(error);
    }
  }, [selectedOption]);

  const getDeliveryStaff = useCallback(async () => {
    const api = path +"/DeliveryOrderController/selectByDeliveryStaff/";
    if (!staffOption) return; // Prevent call if artistId is not available

    try {
      console.log(staffOption);
      const result = await axiosInstance.get(
        `${api}${staffOption}`
      );
      console.log(result.data);
      setDeliveryList(result.data)
    } catch (error) {
      console.log(error);
    }
  }, [staffOption]);

  const getPackageStaff = useCallback(async () => {
    const api = path +"/DeliveryOrderController/selectByPackageStaff/";
    if (!packagestaffOption) return; // Prevent call if artistId is not available 
    try {
      console.log(packagestaffOption);
      const result = await axiosInstance.get(
        `${api}${packagestaffOption}`
      );
      console.log(result);
      setDeliveryList(result.data)
    } catch (error) {
      console.log(error);
    }
  }, [packagestaffOption]);
  useEffect(() => {
    getDeliveryStaff();
    setValue("deliveryStaff",staffOption)
  }, [staffOption]);

  useEffect(() => {
    getPackageStaff();
    setValue("packageStaff",packagestaffOption)
  }, [packagestaffOption]);

  useEffect(() => {
    getdata();
    setValue("status",selectedOption)
  }, [selectedOption]);
  const buildDeliveryStaffList = () => {
    return role3staff?.map((a, i) => {
      return (
        <option key={i} value={a.staffUsername}>
          {a.staffUsername}
        </option>
      );
    });
  };
  const buildPackageStaffList = () => {
    return role2Staff?.map((a, i) => {
      return (
        <option key={i} value={a.staffUsername}>
          {a.staffUsername}
        </option>
      );
    });
  };
  // methods for loading data
  const getDeliveryList = async () => {
    const api = path + "/DeliveryOrderController/selectall";
    // 等同 $.ajax(" get blablablba ")
    try {
      const result = await axiosInstance.get(`${api}`);
      console.log(result.data);
      setDeliveryList(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getStaffList =async () =>{
    const api = path + "/StaffController/findall";
    // 等同 $.ajax(" get blablablba ")
    try {
      const result = await axiosInstance.get(`${api}`);
      console.log(result.data);
      const filteredStaff2 = result.data.filter(staff => staff.roleId === 2);
      const filteredStaff3 = result.data.filter(staff => staff.roleId === 3);
      console.log(filteredStaff2);
      
      setRole2Staff(filteredStaff2);
      setRole3staff(filteredStaff3);
      // setStaffList(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDeliveryList();
    getStaffList();
  }, []);

  useEffect(() => {
    console.log(deliveryList);
    if (deliveryList) setOrderTable(buildDeliveryTable());
    setDeliveryStaffList(buildDeliveryStaffList());
    setPackageStaffList(buildPackageStaffList())
  }, [deliveryList,uploadToggle,expandedRow]);

  const editDelivery = async(event) =>{
    const id = event.target.id
    console.log(id);
    
    const api = path + "/DeliveryOrderController/selectbydeliveryNumber/"
    try{
      const result = await axiosInstance.get(`${api}${id}`)
      console.log(result.data);
      setReadData(result.data)
    }catch(error){
      console.log(error);   
    }
  }
  useEffect(() => {
    if (readData) {
      document.getElementById("deliveryNumber").value = readData.deliveryNumber;
      setValue("deliveryNumber", readData.deliveryNumber);
      document.getElementById("deliveryInstrictions").value = readData.deliveryInstrictions;
      setValue("deliveryInstrictions", readData.deliveryInstrictions);
      document.getElementById("packageStaff").value = readData.packageStaff;
      setValue("packageStaff", readData.packageStaff);
      document.getElementById("deliveryAddress").value = readData.deliveryAddress;
      setValue("deliveryAddress", readData.deliveryAddress);
      document.getElementById("status").value = readData.status;
      setValue("status", readData.status);
      document.getElementById("attName").value = readData.attName;
      setValue("attName", readData.attName);
      document.getElementById("attPhone").value = readData.attPhone;
      setValue("attPhone", readData.attPhone);
      document.getElementById("deliveryStaff").value = readData.deliveryStaff;
      setValue("deliveryStaff", readData.deliveryStaff);
    } 
  }, [readData]);
  const updataDelivery = async()=>{
    const api = path + "/DeliveryOrderController/editDeliveryOrders";
    try{
      const result = await axiosInstance.put(`${api}`, inputData);
      //刷新頁面用
      setUploadToggle(!uploadToggle)
      //清空input
      reset();
      alert("修改成功")
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    if(inputData)
    try {
      updataDelivery();
    } catch (error) {
      console.log(error);
    }
  }, [inputData]);
  const onSubmit = (data)=>{
    console.log(data);
    //確認資料
    if (data.confirmed) {
    setInputData(data);
    } else {
    alert("Please Confirmed");
    }
  }
 
  
  const toggleDetails = (deliveryNumber) => {
    // 若點擊同一列則收起詳細資料，否則展開該列
      setExpandedRow((prev) => (prev === deliveryNumber ? null : deliveryNumber));
    };

  const buildDeliveryTable = () => {
      return deliveryList.map((a, i) => {
        // console.log(deliveryList);
        return (
          <React.Fragment key={a.deliveryNumber}>
          <tr>
            <th scope="row">{a.deliveryNumber}</th>
            <td>{a.createDate}</td>
            <td>{a.status}</td>
            <td className="col-4">
              <div className="row d-flex">
                <div className="btn col-4" id={a.deliveryNumber} onClick={editDelivery}>
                  Edit
                </div>
                <div className="btn col-4" id={a.deliveryNumber} onClick={() => toggleDetails(a.deliveryNumber)}>
                  Details
                </div>
              </div>
            </td>
          </tr>
          <tr className="">
        <td colSpan="4">
        {expandedRow === a.deliveryNumber && (
        <table className="table table-striped table-hover">
          <thead>
            <tr className="active-row underline bg-dark">
              <th scope="col">OrderNumber</th>
              <th scope="col">CustomerId</th>
              <th scope="col">OrderDate</th>
              <th scope="col">PaintingId</th>
              <th scope="col">Desposit</th>
              <th scope="col">ServiceFee</th>
              <th scope="col">TotalAmount</th>
            </tr>
          </thead>
          <tbody style={{ maxHeight: "380px", overflowY: "auto" }}>
            {a.orderList.map((o, i) => (
              <tr key={i}>
                <th scope="row">{o.orderNumber}</th>
                <td>{o.customerId}</td>
                <td>{o.orderDate}</td>
                <td>{o.paintingId}</td>
                <td>{o.desposit}</td>
                <td>{o.serviceFee}</td>
                <td>{o.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
            )}
            </td>
          </tr>
          </React.Fragment>
        );
      });
  };
  return (
    <>
      <div className="h1 mt-5">DeliveryOrders Managerment</div>
      <div className="row">
        <form className="col-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
            <label htmlFor="deliveryNumber" className="form-label">
            Delivery_number
            </label>
            <input
              type="text"
              className="form-control"
              id="deliveryNumber"
              aria-describedby="emailHelp"
              {...register("deliveryNumber")}
            />
          </div>
          <div className="mb-3">
          <label htmlFor="packageStaff" className="form-label">
          PackageStaff
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              id="packageStaff"
              {...register("packageStaff")}
              value={packagestaffOption}
              onChange={handlePackageSelectChange}
            >
              <option defaultValue={0}></option>
              {packageStaffList}
            </select>
            {/* <input
              type="text"
              className="form-control"
              id="deliveryStaff"
              aria-describedby="emailHelp"
              {...register("deliveryStaff")}
            /> */}
          </div>
          <div className="mb-3">
          <label htmlFor="deliveryStaff" className="form-label">
          DeliveryStaff
            </label>
            {/* <input
              type="text"
              className="form-control"
              id="deliveryStaff"
              aria-describedby="emailHelp"
              {...register("deliveryStaff")}
            /> */}
             <select
                className="form-select"
                aria-label="Default select example"
                id="deliveryStaff"
                {...register("deliveryStaff")}
                value={staffOption}
                onChange={handleDeliverySelectChange}
                >
                <option defaultValue={0}></option>
                {deliveryStaffList}
             </select>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              id="status"
              {...register("status")}
              // value={selectedOption}
              onChange={handleStatusChange}
            >
              <option defaultValue={0}>Pending</option>
              <option defaultValue={1}>packed</option>
              <option defaultValue={2}>Shipped</option>
              <option defaultValue={3}>Delivered</option>
              <option defaultValue={4}>Picked up</option>
              {/* {artistSelectionList} */}
            </select>
          </div>
          {/* <div className="mb-3">
          <label htmlFor="status" className="form-label">
              Status
            </label>
            <input
              type="text"
              className="form-control"
              id="status"
              aria-describedby="emailHelp"
              {...register("status")}
            />
          </div> */}
          <div className="mb-3">
          <label htmlFor="deliveryAddress" className="form-label">
              Delivery_Address
            </label>
            <input
              type="text"
              className="form-control"
              id="deliveryAddress"
              aria-describedby="emailHelp"
              {...register("deliveryAddress")}
            />
          </div>
          <div className="mb-3">
          <label htmlFor="attName" className="form-label">
          Att_Name
            </label>
            <input
              type="text"
              className="form-control"
              id="attName"
              aria-describedby="emailHelp"
              {...register("attName")}
            />
          </div>
          <div className="mb-3">
          <label htmlFor="attPhone" className="form-label">
          Att_Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="attPhone"
              aria-describedby="emailHelp"
              {...register("attPhone")}
            />
          </div>
          <div className="mb-3">
          <label htmlFor="deliveryInstrictions" className="form-label">
          Delivery_Instrictions
            </label>
            <input
              type="text"
              className="form-control"
              id="deliveryInstrictions"
              aria-describedby="emailHelp"
              {...register("deliveryInstrictions")}
            />
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
                <th scope="col">DeliveryNumber</th>
                {/* <th scope="col">Order_Date</th> */}
                <th scope="col">CreateDate</th>
                <th scope="col">Status</th>
                {/* <th scope="col">Delivery_Address</th>
                <th scope="col">Att_Name</th>
                <th scope="col">Att_Phone</th>
                <th scope="col">Delivery_Instrictions</th> */}
                <th scope="col">Modify</th>
              </tr>
            </thead>
            <tbody style={{ maxHeight: "380px", overflowY: "auto" }}>
              {orderTable}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
