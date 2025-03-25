import React, { useState } from "react";

const Checkbox = ({ selectedOption, setSelectedOption, setErrors }) => {
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setErrors();
  };
  return (
    <div>
      <div className=" w-[756px] h-[167px]  rounded-[12px] p-6 flex flex-col justify-center gap-4 border-[#FFFFFF52] border">
        <span className="text-[16px] text-white">
          This notification is for...
        </span>
        <div className="flex flex-col">
          <label className="flex">
            <input
              type="radio"
              value="everyone"
              checked={selectedOption === "everyone"}
              onChange={handleOptionChange}
              className="form-radio text-[#199BD1] bg-[#001229] focus:ring-[#199BD1] focus:ring-2 h-5 w-5"
            />
            <span className="ml-3 text-white text-[14px]">Everyone</span>
          </label>
          <label className="flex items-center mt-2">
            <input
              type="radio"
              value="owner"
              checked={selectedOption === "owner"}
              onChange={handleOptionChange}
              className="form-radio text-[#199BD1] bg-[#001229] focus:ring-[#199BD1] focus:ring-2 h-5 w-5"
            />
            <span className="ml-3 text-white text-[14px]">Only for Owners</span>
          </label>
          <label className="flex items-center mt-2">
            <input
              type="radio"
              value="singleuser"
              checked={selectedOption === "singleuser"}
              onChange={handleOptionChange}
              className="form-radio text-[#199BD1] bg-[#001229] focus:ring-[#199BD1] focus:ring-2 h-5 w-5"
            />
            <span className="ml-3 text-white text-[14px]">
              Only for Single Users
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
