import React from "react";
import { CancelIcon, Ringbell } from "../../assets/export";

const SendNotification = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#02203A]  rounded-lg w-[90%] max-w-md p-6 shadow-lg">
        <div className="flex justify-end cursor-pointer"   onClick={onClose}>
            <img src={CancelIcon} className="w-[30px] h-[30px]" alt="" />
        </div>
        <div className="flex justify-center">
          <img src={Ringbell} className="w-[88px] h-[92px]  " alt="" />
        </div>
        <div className="text-[24px] font-[700] mt-4 text-white text-center">
          Notification Sent
        </div>
        <div className="text-center text-[16px] font-[500] mt-3">Notification has been sent to all owners successfully.</div>
      </div>
    </div>
  );
};

export default SendNotification;
