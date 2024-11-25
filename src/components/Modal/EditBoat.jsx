import React, { useEffect, useState } from "react";
import { CancelIcon, Dustbinicon } from "../../assets/export";
import TextFields from "../onboarding/TextFields";
import CustomBtn from "../onboarding/CustomBtn";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/Toaster/Toaster";

const EditBoat = ({ isOpen, onClose, boat, getTasks }) => {
  if (!isOpen) return null;
  const [boatName, setBoatName] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    if (boat) setBoatName(boat?.boatType);
  }, [boat]);

  const handleSave = async () => {
    try {
      setEditLoading(true);
      let obj = {
        boatType: boatName,
      };
      const response = await axios.put(
        `/admin/management/boat/${boat?._id}`,
        obj
      );
      if (response.status === 200) {
        SuccessToast("Updated Successfully");
        getTasks();
        onClose();
      }
    } catch (err) {
      ErrorToast(err.response.data.message);
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="fixed top-0 right-0 w-screen h-screen z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#001229] rounded-lg w-[587px] p-6 shadow-lg">
        <div className="flex justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-white text-start">
              Edit Boat
            </h2>
            <p className="text-[13px] mt-2 text-[#D9D9D9] font-[400]">
              Make changes to your boat below. Update the fields as needed and
              save your changes.
            </p>
          </div>
          <div>
            <img
              src={CancelIcon}
              className="w-[30px] h-[30px] cursor-pointer"
              alt="Close"
              onClick={onClose}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="mt-4">
            <div className="flex flex-col gap-2 mb-3">
              <TextFields
                text={"Boat Name"}
                className="w-full"
                placeholder="Enter boat name"
                state={boatName}
                setState={setBoatName}
              />
            </div>
          </div>
          <div className="mt-5">
            <CustomBtn
              text="Save"
              handleClick={() => handleSave()}
              loading={editLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBoat;
