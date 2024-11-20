import React from "react";
import { CancelIcon, Generatekey } from "../../assets/export";

const GenerateCrediantial = ({ isOpen, onClose }) => {
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
        <div className="flex justify-center">
          <img src={Generatekey} className="w-[75px] h-[88px]" alt="" />
        </div>
        <p className="text-[16px] font-[500] mt-4 text-white text-center">
          The owner credentials have been successfully created. The new owner
          can now log in with their assigned username and password.
        </p>
      </div>
    </div>
  );
};

export default GenerateCrediantial;
