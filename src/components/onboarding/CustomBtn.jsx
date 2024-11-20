import React from "react";

const CustomBtn = ({ text,handleClick }) => {
  return (
    <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
      <button
        type="submit"
        className="w-full h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
        onClick={()=>handleClick()}
      >
        {text}
      </button>
    </div>
  );
};

export default CustomBtn;