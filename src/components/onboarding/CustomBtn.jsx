import React from "react";
import { FiLoader } from "react-icons/fi";

const CustomBtn = ({ text, handleClick, loading }) => {
  return (
    <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
      <button
        type="button"
        className="w-full h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
        onClick={() => handleClick()}
      >
        <div className="flex items-center">
          <span className="mr-1">{text}</span>
          {loading && <FiLoader className="animate-spin text-lg mx-auto" />}
        </div>
      </button>
    </div>
  );
};

export default CustomBtn;
