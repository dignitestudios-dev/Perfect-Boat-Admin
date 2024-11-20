import React, { useState } from "react";
import {
  Bellblue,
  BlueLock,
  Changepassicon,
  Noti2,
  Usermanagement,
  Whitepro,
} from "../../assets/export";
import UserInformation from "../../components/profilemanagement/UserInformation";
import UserNotifications from "../../components/profilemanagement/UserNotifications";
import UserChangePass from "../../components/profilemanagement/UserChangePass";

const ProfileManagement = () => {
  const [tabs, setTabs] = useState("1");

  return (
    <div className="bg-[#0E1B31] h-[928px] p-5 rounded-[18px] overflow-y-auto  scrollbar-thin ">
      <div className="grid grid-cols-12 gap-4 ">
        <div className="col-span-12 lg:col-span-4 p-3 border-[#243347] border-r-2 text-white">
          <h2 className="text-[18px] font-[700]">Profile Management</h2>
          <div className="pt-14">
            <h2 className="text-[#FFFFFF80] text-[13px]">User Setting</h2>
          </div>

          <div className="mt-6">
         
            <div
              className="flex items-center gap-5 cursor-pointer"
              onClick={() => setTabs("1")}
            >
              <img
                src={tabs === "1" ? Usermanagement : Whitepro}
                className="w-[20px] h-[20px]"
                alt="User Management Icon"
              />
              <h2
                className={`text-[13px] font-[400] ${
                  tabs === "1" ? "text-[#199BD1]" : "text-white"
                }`}
              >
                User Management
              </h2>
            </div>

          
            <div
              className="flex items-center gap-5 mt-8 cursor-pointer"
              onClick={() => setTabs("2")}
            >
              <img
                src={tabs === "2" ? Bellblue : Noti2}
                className="w-[20px] h-[20px]"
                alt="Notifications Icon"
              />
              <h2
                className={`text-[13px] font-[400] ${
                  tabs === "2" ? "text-[#199BD1]" : "text-white"
                }`}
              >
                Notifications
              </h2>
            </div>

         
            <div
              className="flex items-center gap-5 mt-8 cursor-pointer"
              onClick={() => setTabs("3")}
            >
              <img
                src={tabs === "3" ? BlueLock : Changepassicon}
                className="w-[20px] h-[20px]"
                alt="Change Password Icon"
              />
              <h2
                className={`text-[13px] font-[400] ${
                  tabs === "3" ? "text-[#199BD1]" : "text-white"
                }`}
              >
                Change Password
              </h2>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 rounded-md text-white">
    
          {tabs === "1" && <UserInformation />}
          {tabs === "2" && <UserNotifications />}
          {tabs === "3" && <UserChangePass />}
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
