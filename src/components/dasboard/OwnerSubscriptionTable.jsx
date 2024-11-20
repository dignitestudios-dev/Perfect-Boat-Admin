import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../inputs/SearchInput";

const OwnerSubscriptionTable = () => {
  const [tab, setTabs] = useState("1");
  return (
    <div className="">
      <div className="card bg-[#001229] p-5 rounded-[20px] ">
        <div className="flex justify-between mt-2">
          <h3 className="text-[18px] font-[700]">Subscription History </h3>
          <Link
            to={"/subscriptionlist"}
            className="text-[#199BD1] bg-[#042742] w-[107px] h-[32px] text-center text-[11px] font-[700] flex justify-center rounded-[10px] items-center"
            style={{textDecoration:"none"}}
          >
            View all
          </Link>
        </div>

        <div className="flex gap-x-2 mt-3">
          <button
            onClick={() => setTabs("1")}
            className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
              tab === "1"
                ? "bg-[#199BD1] text-white"
                : "bg-[#042742] text-[#199BD1]"
            }`}
          >
            Managers
          </button>
          <button
            onClick={() => setTabs("2")}
            className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
                tab === "2"
                ? "bg-[#199BD1] text-white"
                : "bg-[#042742] text-[#199BD1]"
            }`}
          >
            Employee
          </button>
        </div>
        {tab === "1" && (
          <div className="grid gap-4">
            <div className="grid grid-cols-[2fr_2fr_1fr]  gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Paid On</div>
              <div>License Fee</div>
              <div>Renewal Date</div>
            </div>
            {[1, 2, 3, 4, 5, 6,7].map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_2fr_1fr]  gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2  text-white "
              >
                <div className="font-medium">Jan 1, 2023</div>
                <div className="">$300</div>
                <div className="">Jan 1, 2025</div>
              </div>
            ))}
          </div>
        )}
        {tab === "2" && (
          <div className="grid gap-4">
            <div className="grid grid-cols-[2fr_2fr_1fr] gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Name</div>
              <div>Job Title</div>
              <div>Onboarding Date</div>
            </div>
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_2fr_1fr] gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2  text-white "
              >
                <div className="font-medium">Employee ABC</div>
                <div className="">Dock manager</div>
                <div className="">12/12/2024</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerSubscriptionTable;
