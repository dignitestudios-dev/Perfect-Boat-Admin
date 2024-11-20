import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DateModal from "../global/DateModal";
import { Calender } from "../../assets/export";

const SubscriptionList = () => {
  const [tab, setTabs] = useState("1");
  const [calendarOpen, setCalenderOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const navigate  =useNavigate()
  return (
    <div className="">
      <div className="card bg-[#001229] p-5 rounded-[20px] h-[944px] overflow-y-auto  scrollbar-thin ">
        <div className="flex justify-between mt-2">
          <h3 className="text-[18px] font-[700]">Subscription History</h3>
          <div className="flex gap-2">
            <h5 className="text-[13px] text-[#199BD1] font-[500] content-end">
              Total Revenue
            </h5>
            <h3 className="text-[24px] font-[500]">$1,225.66</h3>
          </div>
        </div>

        <div className="flex gap-x-2 justify-between mt-4">
          <div className="flex gap-x-2">
            <button
              onClick={() => setTabs("1")}
              className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
                tab === "1"
                  ? "bg-[#199BD1] text-white"
                  : "bg-[#042742] text-[#199BD1]"
              }`}
            >
              Owner
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
          {tab === "2" && (
            <div>
              <button className="flex items-center justify-center rounded-[100px] gap-2 bg-[#199BD126] h-[27px] w-[99px] " onClick={() => setCalenderOpen(true)}>
                <img className="w-[12px] h-[13.33px]" src={Calender} alt="" /> 
                <span className="text-[12px] font-[500] text-[#199BD1] ">Select</span>
              </button>
              <DateModal
                isOpen={calendarOpen}
                setIsOpen={setCalenderOpen}
                setDueDate={setDate}
              />
            </div>
          )}
        </div>
        {tab === "1" && (
          <div className="grid gap-4 ">
            <div className="grid grid-cols-3  gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Paid On</div>
              <div className="text-center">License Fee</div>
              <div className="text-end">Renewal Date</div>
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2  text-white "
              >
                <div className="font-medium">Jan 1, 2023</div>
                <div className="text-center">$300</div>
                <div className="text-end">Jan 1, 2025</div>
              </div>
            ))}
          </div>
        )}
        {tab === "2" && (
          <div className="grid gap-4">
            <div className="grid grid-cols-4 gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Date</div>
              <div>Users Onboard</div>
              <div className="text-center">Per User Cost</div>
              <div className="text-end">Total Cost of Users</div>
            </div>
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2  text-white "
              >
                <div className="font-medium">Sep 3, 2024</div>
                <div className="">122</div>
                <div className="text-center">$10</div>
                <div className="text-end">$1,220</div>
              </div>
            ))}
          </div>
        )}
      </div>
    
        <div className="flex justify-end mt-4" onClick={()=>navigate(-1)}>
          <button className="bg-[#199BD1] w-[235px] h-[54px] rounded-[8px] text-white">
            Back
          </button>
        </div>
      
    </div>
  );
};

export default SubscriptionList;
