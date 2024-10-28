import { useContext, useEffect, useState } from "react";
import projectLogo from "../../assets/LOGO.png";
import { MainContext } from "../../components/ContextProvider/MainContext";
import axiosInstance from "../../axiosConfig";
export default function PasswordChanged() {
  const path=import.meta.env.VITE_DATA_HOST_API;
  const Authorization = localStorage.getItem("biddingHistory");
  
  const[password,setPassword] = useState({
    password:"",
    confirmPassword:""
  });
  const [data,setData]=useState();
  const [error, setError] = useState(""); // 用來存放密碼不匹配的錯誤訊息
  const [passwordsMatch, setPasswordsMatch] = useState(false); // 控制勾勾顯示

  const getData = async()=>{
    const api= path + "/customers/initEditData";
    if(Authorization){
    //axiosInstance就有回傳token的功能
      const result = await axiosInstance.get(api);
      console.log(result.data);
      setData(result.data)
    }else{
      // showLogingModal();
      console.log("please login")
    }
  };
  useEffect(()=>{
    getData();
  },[])

  const handleChange=(e) => {
    const { name, value } = e.target;
    setData({...data,[name]:value}) 
    setPassword((prevState) => {
      const updatedPassword = { ...prevState, [name]: value };
      console.log(updatedPassword); // 這裡的 updatedPassword 是更新後的狀態
      return updatedPassword;
    });
  };
  const submit= async ()=>{
    try {
      console.log(data);
      // setData({...data,[password]:password}) 
      // console.log(data);
     
     if(Authorization){
      const api= path + "/customers/EditPassword";
      const result = await axiosInstance.put(api, data, {
       headers: {
        //  Authorization: `Bearer ${Authorization}`,
         "Content-Type": "application/json",
       },
       });
      console.log(result);
     }else{
        // const api= path + "/reset-password/";
        // const token = localStorage.get("token")
        // const result = await axiosInstance.put(api,token, data, {
        //   headers: {
        //     Authorization: `Bearer ${Authorization}`,
        //     "Content-Type": "application/json",
        //   },
        // });
     }
   } catch (error) {
     console.log(error);
   }
  }
  const isPasswordMatch = password.confirmPassword && password.password === password.confirmPassword;
  return (
          <div className="PasswordChanged" id="PasswordChanged">
            <div className="py-5 d-flex justify-content-center">
              <img
                className="projectLogo  w-50 h-100 "
                src={projectLogo}
                alt="Logo"
              ></img>
            </div>
            <form action="" className="was-validated">
            <div className="px-4 h5 m-3">
              <div className="form-group">
                <label className="mt-3">Please enter a new password:</label>
                <input type="password " 
                       className="form-control mt-3" 
                       style={{backgroundColor: "light"}} 
                       onChange={handleChange} 
                       name="password" 
                       required>
                </input>
                {/* 只有在密碼匹配時顯示勾勾 */}
            {passwordsMatch && password.newPassword && (
              <div className="valid-feedback">Passwords match!</div>
            )}
                <div className="invalid-feedback">Please fill out this field.</div>
              </div>
              <div className="form-group">
                <label className="mt-3">Please confirm your password:</label>
                <input type="password " 
                       className="form-control mt-3"
                       style={{backgroundColor: "light"}} 
                       onChange={handleChange} 
                       name="confirmPassword" 
                       required>
                </input>
               
                <div className="invalid-feedback">Passwords do not match.</div>
              </div>
            </div>
            <div className="row my-5 mx-auto justify-content-center">
                <div
                  className="btn col-3 mx-2"
                  id="OK"
                  data-bs-toggle="modal"
                  data-bs-target="#PassChangedSuccessModal"
                  onClick={submit}
                >
                  OK
                </div>
            </div>
            </form>
          </div>

  
  );
}
