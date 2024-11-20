import React, { useEffect, useState } from "react";
import { CancelIcon, Dustbinicon } from "../../assets/export";
import TextFields from "../onboarding/TextFields";
import CustomBtn from "../onboarding/CustomBtn";

const EditBoat = ({ isOpen, onClose, boat }) => {
  if (!isOpen) return null;
  const [boatName, setBoatName] = useState("");
  console.log(boatName, "boatName");
  useEffect(() => {
    if (boat) setBoatName(boat);
  }, [boat]);

  const handleSave = () => {
    console.log("Updated Boat Name:", boatName);
    onClose();
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
                onChange={(e) => setBoatName(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5">
            <CustomBtn text="Save" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBoat;
