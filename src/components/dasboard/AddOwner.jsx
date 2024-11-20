import React from "react";
import {
  BoatIcon,
  BookIcon,
  CoinIcon,
  OwnerProfile,
  User_icon2,
  UserIcon,
} from "../../assets/export";
import OwnerDetailLineChart from "./OwnerDetailChart";
import OwnerUserTables from "./OwnerUserTables";
import OwnerSubscriptionTable from "./OwnerSubscriptionTable";
import AuthInput from "../onboarding/AuthInput";
import { Link } from "react-router-dom";

const AddOwner = () => {
  const cardData = [
    { icon: UserIcon, number: 16, label: "Managers" },
    { icon: User_icon2, number: 200, label: "Employees" },
    { icon: CoinIcon, number: 240, label: "Total Revenue" },
  ];
  return (
    <div>
      <div className="card bg-[#001229] p-5 rounded-[16px] mt-4  ">
        <div className="text-[18px] font-[700]">Owner Details</div>
        <div className="grid gap-5 lg:grid-cols-2 sm:grid-cols-1 mt-5">
          <div className="mt-4">
            <AuthInput text="Name" placeholder="Mark Taylor" type="text" />
          </div>
          <div className="mt-4">
            <AuthInput text="Email" placeholder="mark@gmail.com" type="email" />
          </div>
          <div className="mt-4">
            <AuthInput
              text="Job Title"
              placeholder="Dock manager"
              type="text"
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
              text="Phone Number"
              placeholder="000 0000 0000"
              type="number"
            />
          </div>
          <div className="mt-4">
            <AuthInput
              text="Onboarding Date"
              placeholder="12/12/2024"
              type="date"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 flex-wrap">
        <Link to={"/ownerlist"} className="hover:no-underline">
          <div className="flex justify-end mt-4">
            <button className="bg-[#02203A] w-[235px]   h-[54px] rounded-[8px] text-[#199BD1] font-[700]">
              Back
            </button>
          </div>
        </Link>
        <Link to={"/home"} className="hover:no-underline">
          <div className="flex justify-end mt-4">
            <button className="bg-[#199BD1] w-[235px]  h-[54px] rounded-[8px] text-white">
              Next
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AddOwner;
