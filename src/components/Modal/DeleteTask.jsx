import React, { useState } from "react";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../Toaster/Toaster";

const DeleteTask = ({ isOpen, onClose, id, getTasks }) => {
  if (!isOpen) return null;
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const response = await axios.delete(`/admin/management/task/${id}`);
      if (response.status === 200) {
        SuccessToast("Deleted Successfully");
        getTasks();
        onClose();
      }
    } catch (err) {
      console.log("🚀 ~ handleDelete ~ err:", err);
      ErrorToast(err.response.data.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#02203A] rounded-lg w-[90%] max-w-md p-6 shadow-lg">
        <h2 className="text-[22px] font-[700] text-white text-start">
          Remove Task
        </h2>
        <p className="text-[16px] font-[400] mt-4 text-white text-start">
          Are you sure you want to remove this task?
        </p>
        <div className="flex justify-end gap-1 mt-6">
          <button
            className="px-4 py-2 text-[#199BD1] text-[16px] font-[700] "
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2  text-[#FF3B30] text-[16px] font-[700]  "
            onClick={handleDelete}
          >
            {deleteLoading ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
