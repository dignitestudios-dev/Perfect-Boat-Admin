import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Dropdown = ({ label, items, handleTimePeriod }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative bg-[#042742] w-[70px] h-[27px] rounded-[20px] flex items-center justify-center">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 text-[#199BD1] text-[11px] font-[500]"
      >
        {label} <IoMdArrowDropdown />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-8 w-[100px] rounded-md shadow-lg p-2 z-10 bg-[#1A293D]">
          {items?.map((item, index) => (
            <p
              key={index}
              className="text-white text-[11px] py-1 px-2 cursor-pointer hover:bg-[#0B3A58] rounded-md"
              onClick={() => {
                handleTimePeriod(item);
                setIsOpen(false);
              }}
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
