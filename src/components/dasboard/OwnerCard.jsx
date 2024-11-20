import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const ResponsiveOwnerCard = () => {
  const [dropdownStates, setDropdownStates] = useState({});

  const toggleDropdown = (id) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="p-4 mt-4 bg-[#001229] rounded-lg">
      <div className="shadow-md rounded-lg">
        <div className="p-6">
          {/* Use flex-wrap to make items wrap on smaller screens */}
          <dl className="flex flex-wrap gap-4 md:gap-0 md:space-y-2">
            {/* Owner Name */}
            <div className="flex  flex-wrap w-full md:w-1/2 justify-between items-center p-3 rounded-md">
              <dt className="text-sm font-medium text-gray-500">Owner Name</dt>
              <dd className="text-sm text-white">Owner ABC</dd>
            </div>
            {/* Total No. of Users */}
            <div className="flex w-full flex-wrap md:w-1/2 justify-between items-center p-3 rounded-md">
              <dt className="text-sm font-medium text-gray-500">Total No. of Users</dt>
              <dd className="text-sm text-white">156</dd>
            </div>
            {/* Email */}
            <div className="flex w-full flex-wrap md:w-1/2 justify-between items-center p-3 rounded-md">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="text-sm text-white">ethanliam@gmail.com</dd>
            </div>
            {/* Phone Number */}
            <div className="flex w-full flex-wrap md:w-1/2 justify-between items-center p-3 rounded-md">
              <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
              <dd className="text-sm text-white">+1 000 000 0000</dd>
            </div>
            {/* Onboarding Date */}
            <div className="flex w-full flex-wrap md:w-1/2 justify-between items-center p-3 rounded-md">
              <dt className="text-sm font-medium text-gray-500">Onboarding Date</dt>
              <dd className="text-sm text-white">12/12/2024</dd>
            </div>
            {/* Subscription */}
            <div className="relative flex-wrap flex w-full md:w-1/2 justify-between items-center p-3 rounded-md">
              <dt className="text-sm font-medium text-gray-500">
                <button
                  onClick={() => toggleDropdown("dropdown1")}
                  className="flex items-center gap-1 text-sm font-medium text-gray-500"
                >
                  Subscription <IoMdArrowDropdown size={18} color="gray" />
                </button>
                {dropdownStates["dropdown1"] && (
                  <div className="absolute top-10 w-[105px] mt-2 rounded-md shadow-lg p-2 bg-[#1A293D] z-10">
                    <p className="text-white text-[11px] mt-2 cursor-pointer">Active</p>
                    <p className="text-white text-[11px] mt-2 cursor-pointer">Inactive</p>
                  </div>
                )}
              </dt>
              <dd className="text-sm ">
                <button className="bg-[#199BD1] text-white px-3 py-1 rounded-full text-xs">
                  Active
                </button>
              </dd>
            </div>
            {/* Actions */}
            <div className="flex flex-wrap w-full md:w-1/2 justify-between items-center p-3 rounded-md">
              <dt className="text-sm font-medium text-gray-500">Actions</dt>
              <dd className="text-sm text-white underline cursor-pointer">View Details</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveOwnerCard;
