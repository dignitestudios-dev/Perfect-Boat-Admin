import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import OwnerCard from "./OwnerCard";
import SignleUserCard from "./SignleUserCard";
import { FiSearch } from "react-icons/fi";

const SingleUserList = () => {
  const [dropdownStates, setDropdownStates] = useState({});

  const toggleDropdown = (id) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <div className="p-5 bg-[#001229] rounded-[20px] h-[944px] overflow-y-auto  scrollbar-thin">
        <div className="desktop_screen">
          <div className=" mb-4">
            <h3 className="text-[18px] font-800 mb-3">Single User List</h3>
            <div className="flex w-1/2 lg:w-[295px] h-[32px] justify-start items-start rounded-[8px] bg-[#1A293D] relative">
              <span className="w-[32px] h-full flex items-center justify-center">
                <FiSearch className="text-white/50 text-lg" />
              </span>
              <input
                type="text"
                placeholder="Search here"
                className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {/* Header Row */}
            <div className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-4 p-4 text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold bg-[#001229]">
              <div className="text-left">Single User Name</div>
              <div className="text-left">Email</div>
              <div className="text-center">Phone Number</div>
              <div className="text-center">Onboarding Date</div>
              <div className="text-center left-10 relative">
                <button
                  onClick={() => toggleDropdown("dropdown1")}
                  className="flex items-center justify-center gap-1 text-[#FFFFFF80] text-[11px] font-[500]"
                >
                  Subscription <IoMdArrowDropdown size={20} color="#FFFFFF80" />
                </button>
                {dropdownStates["dropdown1"] && (
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-[75px] rounded-md shadow-lg p-2 cursor-pointer z-10 bg-[#1A293D]">
                    <p className="text-white text-[11px] mt-2">Active</p>
                    <p className="text-white text-[11px] mt-2">Inactive</p>
                  </div>
                )}
              </div>
              <div className="text-right">Actions</div>
            </div>

            {/* Data Rows */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-4 p-3 text-[11px] border-b-2 border-[#FFFFFF24] text-white bg-[#001229]"
              >
                <div className="text-left font-medium">Owner ABC</div>
                <div className="text-left">ethanliam@gmail.com</div>
                <div className="text-center">+1 000 000 0000</div>
                <div className="text-center">12/12/2024</div>
                <div className="text-center">
                  <button className="bg-[#199BD1] w-[51px] h-[23px] rounded-full text-white text-xs">
                    Active
                  </button>
                </div>
                <div className="text-right">
                  <Link
                    to={"/detailuser"}
                    className="underline text-white hover:text-white"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mobile_screen">
          <SignleUserCard />
        </div>
      </div>
      <Link to={"/home"} className="no-underline hover:no-underline">
        <div className="flex justify-end mt-4 ">
          <button className="bg-[#199BD1] w-[235px] h-[54px] rounded-[8px] text-white">
            Back
          </button>
        </div>
      </Link>
    </>
  );
};

export default SingleUserList;
