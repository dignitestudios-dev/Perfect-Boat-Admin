import React from "react";
import { Singleuserprofile } from "../../assets/export";
import AuthInput from "../onboarding/AuthInput";
import { Link } from "react-router-dom";

const DeleteSingleUser = () => {
  return (
    <div>
      <div className="card bg-[#001229] p-10 rounded-[16px] mt-4  ">
        <div className="flex  justify-between  gap-4">
          <div className="flex items-center mx-5 gap-4">
            <img src={Singleuserprofile} className="w-[80px] h-[80px]" alt="" />
            <div className="text-[24px] font-[700]">Alexander Smith</div>
          </div>
          <div>
            <button className="bg-[#F44237] w-[86px] h-[34px] rounded-[8px] text-[#FFFFFF] text-[13px] font-[500] ">
              Remove
            </button>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2 sm:grid-cols-1 mt-5">
          <div className="mt-4">
            <AuthInput text="Name" placeholder="Mark Taylor" type="text" />
          </div>
          <div className="mt-4">
            <AuthInput text="Email" placeholder="mark@gmail.com" type="email" />
          </div>

          <div className="mt-4">
            <AuthInput
              text="Phone Number"
              placeholder="000 0000 0000"
              type="number"
            />
          </div>

          <div className="mt-4">
            <AuthInput
              text="Onboarding Date"
              placeholder="12/12/2024"
              type="number"
            />
          </div>
          <div className="mt-4">
            <AuthInput
              text="Subscription"
              placeholder="Subscription Plan 1"
              type="text"
            />
            <div className="flex flex-col sm:flex-row sm:justify-between w-full sm:w-[434px]">
              <div className="text-[#FF3B30] text-[13px] mt-2 cursor-pointer">
                Expires on: 12/12/2024
              </div>
              <div className="text-[#FF3B30] text-[13px] mt-2 cursor-pointer underline">
                Cancel Subscription
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-3 gap-3">
        <div className="">
          <div className="card bg-[#001229] p-5 col-span-3 rounded-[20px]">
            <div className="flex justify-between">
              <h3 className="text-[18px] font-[700]">Subscription History</h3>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-4 gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
                <div className="text-start">Date</div>
                <div className="text-center">Subscription Plan</div>
                <div className="text-center">Subscription Fee</div>
                <div className="text-end">Revenue</div>
              </div>
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2  text-white "
                >
                  <div className="font-medium">Sep 3., 2024</div>
                  <div className="text-center">Subscription Plan A</div>
                  <div className="text-center">$100</div>
                  <div className="text-end">$150</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Link to={"/deleteusers   "} className="hover:no-underline">
        <div className="flex justify-end mt-4">
          <button className="bg-[#199BD1] w-[235px]  h-[54px] rounded-[8px] text-white">
            Back
          </button>
        </div>
      </Link>
    </div>
  );
};

export default DeleteSingleUser;
