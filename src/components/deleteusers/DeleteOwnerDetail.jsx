import React, { useState } from "react";
import {
  CoinIcon,
  OwnerProfile,
  User_icon2,
  UserIcon,
} from "../../assets/export";
import AuthInput from "../onboarding/AuthInput";
import { Link } from "react-router-dom";
import OwnerDetailLineChart from "../dasboard/OwnerDetailChart";
import OwnerUserTables from "../dasboard/OwnerUserTables";
import OwnerSubscriptionTable from "../dasboard/OwnerSubscriptionTable";

const DeleteOwnerDetail = () => {
  const cardData = [
    { icon: UserIcon, number: 16, label: "Managers" },
    { icon: User_icon2, number: 200, label: "Employees" },
    { icon: CoinIcon, number: 240, label: "Total Revenue" },
  ];
  return (
    <div>
      <div className="flex flex-wrap lg:justify-between gap-3">
        <div className="flex  gap-3">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="card bg-[#001229] p-2 rounded-[24px] w-full sm:w-[214px] lg:w-[214px]"
            >
              <div className="flex gap-3 items-center">
                <div className="bg-[#1A293D] p-5 rounded-[18px]">
                  <img
                    src={card.icon}
                    className="w-[41px] h-[41px]"
                    alt={`${card.label} icon`}
                  />
                </div>
                <div>
                  <h3 className="text-[18px] font-[700]">{card.number}</h3>
                  <h3 className="text-[14px] text-[#FFFFFF80] leading-[18.9px]">
                    {card.label}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div >
          <button className="bg-[#F44237] w-[86px] h-[34px] rounded-[8px] text-[#FFFFFF] text-[13px] font-[500] ">Remove</button>
        </div>
      </div>
      <div className="card bg-[#001229] p-3 rounded-[16px] mt-4 h-[425px]">
        <OwnerDetailLineChart />
      </div>
      <div className="card bg-[#001229] p-10 rounded-[16px] mt-4  ">
        <div className="flex items-center mx-5 gap-4">
          <img src={OwnerProfile} className="w-[80px] h-[80px]" alt="" />
          <div className="text-[24px] font-[700]">Alexander Smith</div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2 sm:grid-cols-1 mt-5">
          <div className="mt-4">
            <AuthInput text="Name" placeholder="Mark Taylor" type="text" />
          </div>
          <div className="mt-4">
            <AuthInput text="Email" placeholder="mark@gmail.com" type="email" />
          </div>
          <div className="mt-4">
            <AuthInput text="Username" placeholder="mikesmith" type="text" />
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
              text="Location"
              placeholder="East California dock"
              type="text"
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
          <div className="mt-4">
            <AuthInput text="Password" placeholder="..." type="password" />
            <div className="text-[#199BD1] text-[16px] font-[700] mt-2 underline cursor-pointer">
              Update Password
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 mt-3 gap-3">
        <OwnerUserTables />
        <OwnerSubscriptionTable />
      </div>
      <Link to={"/deleteusers"} className="hover:no-underline">
        <div className="flex justify-end mt-4">
          <button className="bg-[#199BD1] w-[235px]  h-[54px] rounded-[8px] text-white">
            Back
          </button>
        </div>
      </Link>
    </div>
  );
};

export default DeleteOwnerDetail;
