import React from "react";
import { CancelIcon, Tickicons } from "../../assets/export";

const UpdatePassword = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#02203A] rounded-lg w-[90%] max-w-md p-6 shadow-lg">
        <div
          className="flex justify-end cursor-pointer"
          onClick={() => onClose()}
        >
          <img src={CancelIcon} className="w-[30px] h-[30px]" alt="" />
        </div>
        <div className="flex justify-center items-center">
          <img src={Tickicons} className="w-[70px] h-[70px]" alt="" />
        </div>
        <p className="text-[22px] text-center font-[700] mt-4 text-white ">
          Password Updated
        </p>
        <div className="text-center text-[16px] text-[#FFFFFF] mt-2">
          Your password has been updated successfully!
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
