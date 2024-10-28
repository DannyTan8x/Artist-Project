import { useContext, useEffect, useState } from "react";
import MemberNav from "../../components/MemberNav";
import axiosInstance from "../../axiosConfig";
import { MainContext } from "../../components/ContextProvider/MainContext";
import axios from "axios";
import { Link } from "react-router-dom";
export default function MyAccount() {
  const [customer,setCustomer]=useState({
    name:"",
    nickName:"", 
    email:"",
    phone:"",
    address:"",
  });
  //呼叫showLogingModal的方法
  const {showLogingModal} = useContext(MainContext);
  //1.先回傳token
  const getCustomer = async()=>{
    const path=import.meta.env.VITE_DATA_HOST_API;
    const Authorization = localStorage.getItem("token");
    const api= path + "/customers/initEditData";
    if(Authorization){
    //axiosInstance就有回傳token的功能
      const result = await axiosInstance.get(api);
      // const result = await axios.get(api);
      console.log(result.data);
      setCustomer(result.data)
    }else{
      showLogingModal();
      console.log("please login")
    }
  };
 
  useEffect(()=>{
    getCustomer();
  },[])
  
  // const getdata = async ()=>{
  //   try{
  //     const result =await axios.get(
  //       `${api}`
  //     );
  //     console.log(result);
  //     setCustomer(result.data);
  //   }catch (error) {
  //     console.log(error);
  //   }
  // }
  

  return (
      <div className="container">
        <h2 className="mb-5 py-5 border-bottom">My Account</h2>
        <div className="row mb-5">
          <div className="d-flex flex-column justify-content-center">
            <div className="row d-flex justify-content-center">
              <div className="col-2"><h4>Name:</h4></div>
              <div className="col-3"><h4>{customer.name}</h4></div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-2"><h4>Nikename:</h4></div>
              <div className="col-3"><h4>{customer.nickName}</h4></div>
            </div> 
            <div className="row d-flex justify-content-center">
              <div className="col-2"><h4>E-mail:</h4></div>
              <div className="col-3"><h4>{customer.email}</h4></div>
            </div> 
            <div className="row d-flex justify-content-center">
              <div className="col-2"><h4>Phone:</h4></div>
              <div className="col-3"><h4>{customer.phone}</h4></div>
            </div> 
            <div className="row d-flex justify-content-center">
              <div className="col-2"><h4>Address:</h4></div>
              <div className="col-3"><h4>{customer.address}</h4></div>
            </div> 
            <div className="row d-flex justify-content-center">
              <div className="btn m-4 col-1 " 
                   id="edit"
                   data-bs-toggle="modal"
                   data-bs-target="#editAccount">
                    Edit
              </div>        
              <Link className="btn btn-primary m-4 col-1"id="delete" to="PasswordChanged">
                   Edit Password
              </Link>      
              <div className="btn btn-danger m-4 col-1" 
                   id="delete"
                   data-bs-toggle="modal"
                   data-bs-target="#DeleteAccount">
                   Delete
              </div>      
              <div className="col-1"></div>
            </div>
          </div>
        </div>
      </div>
  );
}
