import React, { useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import AuthInput2 from "../onboarding/AuthInput2";
import AuthSubmitBtn from "../onboarding/AuthSubmitBtn";
import UpdatePassword from "../Modal/UpdatePassword";
import CustomBtn from "../onboarding/CustomBtn";

const UserChangePass = () => {
  const [tab, setTabs] = useState("1");
  const [updateOpen, setUpdateOpen] = useState(false);
  return (
    <div>
      {tab === "1" && (
        <>
          <div className="flex  justify-between">
            <div>
              <h2 className="text-[24px] font-[700]">Password</h2>
            </div>
            <div>
              <button
                className="bg-[#199BD1] w-[158px] h-[34px] rounded-[10px] text-[13px] font-[700]"
                onClick={() => setTabs("2")}
              >
                Change Password
              </button>
            </div>
          </div>

          <div className="mt-5">
            <AuthInput text={"Password"} type={"password"} />
          </div>
        </>
      )}
      {tab === "2" && (
     <div className="flex justify-center items-center min-h-screen">
     <div className="w-[536px] h-[565px] bg-[#1A293D] rounded-[18px] flex flex-col items-center justify-center">
       <div className="text-center text-[20px] font-[700] text-white mb-8">
         Update Password
       </div>
       <div className="w-full px-12 flex flex-col items-center">
         <div className="w-full mb-5">
           <AuthInput2 text={"Current Password"} type={"password"} />
         </div>
         <div className="w-full mb-5">
           <AuthInput2 text={"New Password"} type={"password"} />
         </div>
         <div className="w-full mb-5">
           <AuthInput2 text={"Confirm Password"} type={"password"} />
         </div>
         <button
           className="bg-[#199BD1] w-[434px] h-[50px] rounded-[8px] font-[700] text-[16px] text-white"
           onClick={() => setUpdateOpen(true)}
         >
           Update Password
         </button>
         <div className="text-center mt-4">
           <button
             className="text-[#199BD1] text-[16px] underline font-[700]"
             onClick={() => setTabs("1")}
           >
             Back
           </button>
         </div>
       </div>
     </div>
   </div>
   
      )}
      <UpdatePassword
        isOpen={updateOpen}
        onClose={() => setUpdateOpen(false)}
      />
    </div>
  );
};

export default UserChangePass;
