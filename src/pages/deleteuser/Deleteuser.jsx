import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import OwnerDelete from "../../components/deleteusers/OwnerDelete";
import SingleUserDelete from "../../components/deleteusers/SingleUserDelete";

const Deleteuser = () => {
  const [tabs, setTabs] = useState("1");

  return (
    <div>
      <div className="p-5 bg-[#001229] rounded-[20px] h-[944px] overflow-y-auto scrollbar-thin">
        <div className="desktop_screen">
          <div className="flex justify-between mb-4">
            <div>
              <h3 className="text-[18px] font-[700] mb-3 text-white">
                Owners List
              </h3>
              <div className="flex w-1/2 lg:w-[295px] h-[32px] justify-start items-center rounded-[8px] bg-[#1A293D] relative">
                <span className="w-[32px] h-full flex items-center justify-center">
                  <FiSearch className="text-white/50 text-lg" />
                </span>
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-[calc(100%-35px)] outline-none text-sm bg-transparent text-white h-full px-2"
                />
              </div>
              <div className="flex gap-3 items-center">
                <button
                  className={`w-[51px] h-[27px] mt-3 text-[11px] rounded-[100px] ${
                    tabs === "1"
                      ? "bg-[#199BD1] text-white"
                      : "bg-[#199BD126] text-[#199BD1]"
                  }`}
                  onClick={() => setTabs("1")}
                >
                  Owners
                </button>
                <button
                  className={`w-[72px] h-[27px] mt-3 text-[11px] rounded-[100px] ${
                    tabs === "2"
                      ? "bg-[#199BD1] text-white"
                      : "bg-[#199BD126] text-[#199BD1]"
                  }`}
                  onClick={() => setTabs("2")}
                >
                  Single Users
                </button>
              </div>
            </div>
          </div>
          {tabs === "1" && <OwnerDelete />}
          {tabs === "2" && <SingleUserDelete />}
        </div>
      </div>
    </div>
  );
};

export default Deleteuser;
