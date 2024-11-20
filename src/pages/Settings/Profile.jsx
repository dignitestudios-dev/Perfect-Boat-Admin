import React from "react";
import { Camera, ProfileImg } from "../../assets/export";
import AuthInput2 from "../../components/onboarding/AuthInput2";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigation =useNavigate()
  return (
    <div className="bg-[#001229] p-4 rounded-[18px]">
      <h1 className="text-[18px]  font-[700] mb-3 mx-4">Profile</h1>
      <div className="h-[815px] bg-[#1A293D] lg:w-[923px]  rounded-[32px]">
        <div className="h-auto  w-full flex flex-col  justify-start items-center">
          <div className="w-full  h-[219px]  rounded-t-[18px] bg-gradient text-white"></div>
          <div className="absolute top-[210px] left-[120px]">
            <div className="relative w-[158px] h-[158px]">
              <img
                src={ProfileImg}
                alt="Profile"
                className="w-full h-full rounded-full border-4 border-gray-800"
              />
              <div className="absolute bottom-4 w-[27.98px] text-center justify-center  flex items-center h-[27.98px] right-1 bg-[#199BD1]   rounded-full">
                <img src={Camera} className="w-[14.81px] h-[14.81px]" alt="" />
              </div>
            </div>
          </div>
          <div className="absolute lg:left-[260px] lg:top-[300px] grid sm:grid-cols-1 lg:grid-cols-2 gap-4 items-end justify-center w-full profile_sec_mob lg:w-[623px]">
            <h1 className="text-white text-[20px] sm:text-[18px] lg:text-[24px] mt-6 font-bold mx-11">
              Jonas Smith
            </h1>
            <button className="bg-[#199BD1] w-[100px] mx-14 sm:w-[107px] h-[32px] text-white text-[10px] sm:text-[11px] font-[700] px-4 py-1 rounded-[10px]" onClick={()=>navigation('/editprofile')}>
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid bg-[#1A293D] p-8 w-full    gap-5 lg:grid-cols-2 sm:grid-cols-1 mt-16 ">
          <div className="mt-11">
            <AuthInput2
              text="Email"
              placeholder="mark@gmail.com"
              type="email"
            />
          </div>
          <div className="mt-11">
            <AuthInput2
              text="User Name"
              placeholder="Dock manager"
              type="text"
            />
          </div>
          <div className="mt-5">
            <AuthInput2
              text="Password"
              placeholder="Password"
              type="password"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
