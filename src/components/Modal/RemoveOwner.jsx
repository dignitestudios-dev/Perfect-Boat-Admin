import React from "react";

const RemoveOwner = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#02203A] rounded-lg w-[90%] max-w-md p-6 shadow-lg">
        <h2 className="text-[18px] font-[700] text-white text-start">
          Remove Owner
        </h2>
        <p className="text-[16px] font-[400] mt-4 text-white text-start">
          Are you sure you want to remove this owner? The owner has 156 users
          associated and removing the owner will also remove all 156 users.
        </p>
        <div className="flex justify-end gap-1 mt-6">
          <button
            className="px-4 py-2 text-[#199BD1] text-[16px] font-[700] "
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="px-4 py-2  text-[#FF3B30] text-[16px] font-[700]  ">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveOwner;