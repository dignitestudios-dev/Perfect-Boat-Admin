import React, { useState } from "react";
import { CancelIcon, Dustbinicon } from "../../assets/export";
import TextFields from "../onboarding/TextFields";
import CustomBtn from "../onboarding/CustomBtn";
import axios from "../../axios";
import { SuccessToast } from "../Toaster/Toaster";

const AddBoat = ({ isOpen, onClose, getTasks }) => {
  const [boats, setBoats] = useState([{ boatType: "" }]);
  const [submitLoading, setSubmitLoading] = useState("");

  const handleAddBoat = () => {
    setBoats((prevBoats) => [...prevBoats, { boatType: "" }]);
  };

  const handleRemoveBoat = (index) => {
    setBoats((prevBoats) => prevBoats.filter((_, i) => i !== index));
  };
  const handleBoatChange = (value, index) => {
    setBoats((prevBoats) =>
      prevBoats.map((boat, i) =>
        i === index ? { ...boat, boatType: value } : boat
      )
    );
  };
  const handleSave = async () => {
    try {
      setSubmitLoading(true);
      // const response = await axios.post(`/admin/management/boat`, obj);
      const promises = boats.map((boat) =>
        axios.post("/admin/management/boat", { boatType: boat.boatType })
      );
      const responses = await Promise.all(promises);
      if (responses[0].status === 200) {
        SuccessToast("Boats Added Success");
        setBoats([{ boatType: "" }]);
        getTasks();
        onClose();
      }
    } catch (err) {
      console.log("🚀 ~ handleSave ~ err:", err);
      ErrorToast(err.response.data.message);
      setSubmitLoading(false);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#001229] rounded-lg w-[587px] p-6 shadow-lg">
        <div className="flex justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-white text-start">
              Add Boat
            </h2>
            <p className="text-[13px] mt-2 text-[#D9D9D9] font-[400]">
              Add any additional boat here to include them in the list for your
              customers.
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
            {boats?.map((boat, index) => (
              <div key={index} className="flex flex-col gap-2 mb-3">
                <TextFields
                  text={`Boat Type ${index + 1}`}
                  className="w-full"
                  placeholder="Enter boat type"
                  state={boat.boatType}
                  setState={(e) => handleBoatChange(e, index)}
                />
                <div className="flex items-center justify-end gap-4">
                  {/* Show "Delete" button only if more than one boat exists */}
                  {boats.length > 1 && (
                    <div
                      className="text-[#F44237] flex items-center gap-2 cursor-pointer"
                      onClick={() => handleRemoveBoat(index)}
                    >
                      <img
                        src={Dustbinicon}
                        className="w-[9px] h-[10px]"
                        alt="Delete icon"
                      />
                      Delete
                    </div>
                  )}
                  {/* Show "Add more" button only for the last item */}
                  {index === boats.length - 1 && (
                    <div
                      className="text-[#199BD1] cursor-pointer"
                      onClick={handleAddBoat}
                    >
                      Add more boats
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <CustomBtn
              text="Add"
              handleClick={handleSave}
              loading={submitLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBoat;
