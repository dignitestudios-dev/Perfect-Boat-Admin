import React from "react";
import { FiSearch } from "react-icons/fi";
import { Searchicon } from "../../assets/export";

const SearchInput = ({
  placeholder = "Search here",
  value = "",
  onChange = () => {},
  className = "",
}) => {
  return (
    <div>
      <div
        className={`flex mt-4 w-1/2 lg:w-[295px] h-[36px] justify-start items-start rounded-[8px] bg-[#1A293D] relative ${className}`}
      >
        <span className="w-[32px] h-full flex items-center justify-center">
          <img src={Searchicon} className="w-[14px] h-[14px]" alt="" />
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-[calc(100%-35px)] outline-none text-[12px] bg-transparent h-full text-white"
        />
      </div>
    </div>
  );
};

export default SearchInput;
