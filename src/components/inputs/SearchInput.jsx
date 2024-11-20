import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchInput = () => {
  return (
    <div>
      <div className="flex w-1/2 mt-4 lg:w-[295px] h-[32px] justify-start items-start rounded-[8px] bg-[#1A293D] relative">
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
  );
};

export default SearchInput;
