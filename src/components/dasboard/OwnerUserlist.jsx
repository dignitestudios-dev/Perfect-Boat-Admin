import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../inputs/SearchInput";

const OwnerUserlist = () => {
  const [tab, setTabs] = useState("1");
  const navigate = useNavigate()
  return (
    <div className="">
      <div className="card bg-[#001229] p-5 rounded-[20px] h-[944px] overflow-y-auto  scrollbar-thin ">
        <div className="flex justify-between mt-2">
          <h3 className="text-[18px] font-[700]">Users</h3>
        </div>
        <div>
          <SearchInput />
        </div>
        <div className="flex gap-x-2 mt-4">
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
          
            <div className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-4 p-4 text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Name</div>
              <div>Job Title</div>
              <div>Location</div>
              <div>Email</div>
              <div>Phone Number</div>
              <div>Onboarding Date</div>
            </div>

          
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(
              (item, index, array) => (
                <div
                  key={index}
                  className={`grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-4 p-3 text-[11px] border-b-2 border-[#FFFFFF24] text-white ${
                    index === array.length - 1 ? "rounded-b-lg" : ""
                  }`}
                >
                  <div className="font-medium">Employee ABC</div>
                  <div>Dock manager</div>
                  <div>East California Dock</div>
                  <div>ethanliam@gmail.com</div>
                  <div>+1 000 000 0000</div>
                  <div>12/12/2024</div>
                </div>
              )
            )}
          </div>
        )}
        {tab === "2" && (
          <div className="grid gap-4">
            <div className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Name</div>
              <div>Job Title</div>
              <div>Location</div>
              <div>Email</div>
              <div>Phone Number</div>
              <div>Onboarding Date</div>
            </div>
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2  text-white "
              >
                <div className="font-medium">Employee ABC</div>
                <div className="">Dock manager</div>
                <div className="">East California Dock</div>
                <div className="">ethanliam@gmail.com</div>
                <div className="">+1 000 000 0000</div>
                <div className="">12/12/2024</div>
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

export default OwnerUserlist;
