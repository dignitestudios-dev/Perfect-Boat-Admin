import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../inputs/SearchInput";
import { Calender, OwnerProfile } from "../../assets/export";
import OwnerList from "../dasboard/OwnerList";
import DateModal from "../global/DateModal";

const RevenueAnalysis = () => {
  const [tab, setTabs] = useState("1");
  const [calendarOpen, setCalenderOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <div className="">
      <div className="card bg-[#001229] p-5 rounded-[20px] h-[820px] overflow-y-auto  scrollbar-thin ">
        <div className="flex justify-between mt-2 ">
          <h3 className="text-[18px] font-[700]">Revenue Analysis</h3>
        </div>
        <div>
          <SearchInput />
        </div>
        <div className="flex gap-x-2 mt-4 items-center justify-between">
          <div className="flex gap-3">
            <button
              onClick={() => setTabs("1")}
              className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
                tab === "1"
                  ? "bg-[#199BD1] text-white"
                  : "bg-[#042742] text-[#199BD1]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setTabs("2")}
              className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
                tab === "2"
                  ? "bg-[#199BD1] text-white"
                  : "bg-[#042742] text-[#199BD1]"
              }`}
            >
              Owners
            </button>
            <button
              onClick={() => setTabs("3")}
              className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
                tab === "3"
                  ? "bg-[#199BD1] text-white"
                  : "bg-[#042742] text-[#199BD1]"
              }`}
            >
              Single Users
            </button>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <button
                className="flex items-center justify-center rounded-[100px] gap-2 bg-[#199BD126] h-[27px] w-[99px] "
                onClick={() => setCalenderOpen(true)}
              >
                <img className="w-[12px] h-[13.33px]" src={Calender} alt="" />
                <span className="text-[12px] font-[500] text-[#199BD1] ">
                  Select date
                </span>
              </button>
              <DateModal
                isOpen={calendarOpen}
                setIsOpen={setCalenderOpen}
                setDueDate={setDate}
              />
              <div>
                <button className="bg-[#199BD1] w-[95px] h-[32px] rounded-[100px] text-[12px]">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
        {tab === "1" && (
          <div className="grid gap-4">
            <div className="grid grid-cols-8 gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Onboarding Date</div>
              <div>Customers</div>
              <div>Total No. of Users</div>
              <div>Subscription Plan</div>
              <div>Subscription Fee</div>
              <div>Per User Cost</div>
              <div>Total Cost of users</div>
              <div>Total Revenue</div>
            </div>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
              const isSpecialRow = index === 3;
              return (
                <Link
                  to={isSpecialRow ? "/detailuser" : "/detailowner"}
                  key={index}
                  className={`no-underline hover:no-underline ${
                    isSpecialRow ? "pointer-events " : ""
                  }`}
                >
                  <div
                    className={`grid grid-cols-8 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2 text-white ${
                      isSpecialRow ? "" : ""
                    }`}
                  >
                    <div>12/12/2024</div>
                    <div>{isSpecialRow ? "Single User" : "Owner ABC"}</div>
                    <div>{isSpecialRow ? "N/A" : "400"}</div>
                    <div>
                      {isSpecialRow
                        ? "Subscription Plan A"
                        : "Subscription Plan A"}
                    </div>
                    <div>USD $100</div>
                    <div>USD $10</div>
                    <div>{isSpecialRow ? "N/A" : "USD $1200"}</div>
                    <div>USD $110</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        {tab === "2" && (
          <div className="grid gap-4">
            <div className="grid grid-cols-7 gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Onboarding Date</div>
              <div>Customers</div>
              <div>Total No. of Users</div>
              <div>Subscription Plan</div>
              <div>Subscription Fee</div>
              <div>Per User Cost</div>
              <div>Total Revenue</div>
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-7 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2  text-white "
              >
                <div className="font-medium">12/12/2024</div>
                <div className="">Owner ABC</div>
                <div className="">400</div>
                <div className="">Subscription Plan A</div>
                <div className="">USD $100</div>
                <div className="">USD $10</div>
                <div className="">USD $110</div>
              </div>
            ))}
          </div>
        )}
        {tab === "3" && (
          <div className="grid gap-4">
            <div className="grid grid-cols-5 gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Onboarding Date</div>
              <div>Customers</div>
              <div>Subscription Plan</div>
              <div>Subscription Fee</div>
              <div>Revenue</div>
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-5 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2  text-white "
              >
                <div className="font-medium">12/12/2024</div>
                <div className="">Owner ABC</div>
                <div className="">Subscription Plan A</div>
                <div className="">USD $100</div>
                <div className="">USD $110</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueAnalysis;
