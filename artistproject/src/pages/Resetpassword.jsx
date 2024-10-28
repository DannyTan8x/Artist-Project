import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function Resetpassword(){
  const path = import.meta.env.VITE_DATA_HOST_API;
  const api = path + "/verifyResetUrl";
  const resendApi = path + "/sendPasswordResetLink";
  const params= useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [isResending, setIsResending] = useState(false);
//  useEffect(async()=>{
//     const result=await axios.get(`${api}`);
//     if(result){
      
//     }
//  },[])
 useEffect(() => {
   const verifyReset = async () => {
    console.log("Token from URL:", params.token);
    console.log(params);
    
     try {
       const result = await axios.get(api,{ params: { token: params.token } });
       
       // Check for success response
       if (result.data) {
         // Redirect to the password reset page
         localStorage.setItem("token", params.token);
         console.log("Token stored in localStorage:", params.token); 
         navigate("/home/reset-password/"+params.token);
       } else {
        setVerificationFailed(true); // Indicate that verification failed
       }
     } catch (error) {
      console.error("Verification error:", error);
      setVerificationFailed(true); // Indicate that verification failed
     }
   };
   verifyReset();
 }, [api, params, navigate]);
 
 const handleResendEmail = async () => {
  if (!email) {
    alert("Please enter a valid email address.");
    return;
  }
  try {
    setIsResending(true);
    // Assuming params.email is available and sent as a parameter
    const result = await axios.post(resendApi,{ email });

    if (result.data.success) {
      alert("Reset email has been resent successfully.");
    } else {
      alert("Failed to resend email. Please try again later.");
    }
  } catch (error) {
    console.error("Error resending email:", error);
    alert("An error occurred. Please try again later.");
  } finally {
    setIsResending(false);
  }
};

    return(
        <div>
             <div>
              {verificationFailed ? (
                <>
                  <p>Verification failed. Please try resending the password reset email.</p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button onClick={handleResendEmail} disabled={isResending}>
                    {isResending ? "Resending..." : "Resend Password Reset Email"}
                  </button>
                </>
              ) : (
                <p>Verifying...</p>
              )}
            </div>
            {/* {params.token} */}
        </div>

     )
}