import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchInput = ({
  placeholder = "Search here", 
  value = "", 
  onChange = () => {}, 
  className = "", 
}) => {
  return (
    <div>
      <div
        className={`flex mt-4 w-1/2 lg:w-[295px] h-[32px] justify-start items-start rounded-[8px] bg-[#1A293D] relative ${className}`}
      >
        <span className="w-[32px] h-full flex items-center justify-center">
          <FiSearch className="text-white/50 text-lg" />
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full text-white"
        />
      </div>
    </div>
  );
};

export default SearchInput;
