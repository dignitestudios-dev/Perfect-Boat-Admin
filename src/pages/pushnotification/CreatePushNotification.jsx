import React, { useState } from "react";
import DateTime from "../../components/global/DateTime";
import SendNotification from "../../components/Modal/SendNotification";
import Checkbox from "../../components/onboarding/Checkbox";
import TextFields from "../../components/onboarding/TextFields";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { ErrorToast } from "../../components/Toaster/Toaster";
import { FiLoader } from "react-icons/fi";

const CreatePushNotification = () => {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState("firstForm");
  const [calendarOpen, setCalenderOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputError, setInputError] = useState({});
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    option: "",
  });

  const [selectedOption, setSelectedOption] = useState();
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    let hasError = false;

    if (!title) {
      setErrors((prev) => ({ ...prev, title: "Title is required" }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, title: "" }));
    }

    if (!description) {
      setErrors((prev) => ({
        ...prev,
        date: "Description is required",
      }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, description: "" }));
    }

    if (!hasError) {
      setTabs("secondForm");
    }
  };

  const handlePushNotification = async () => {
    console.log("api call");
    let hasError = false;

    if (!selectedOption) {
      setErrors((prev) => ({ ...prev, option: "Select Option" }));
      hasError = true;
      return;
    } else {
      setErrors((prev) => ({ ...prev, option: "" }));
    }

    if (!hasError) {
      try {
        setLoading(true);
        const obj = {
          title: title,
          description: description,
          role: selectedOption,
          ...(date?.unix && { schedule: date.unix }),
          isAdmin: true,
        };
        const response = await axios.post("/admin/notification", obj);
        if (response.status === 200) {
          setModalOpen(true);
        }
      } catch (err) {
        console.log("🚀 ~ handlePushNotification ~ err:", err);
        ErrorToast(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {tabs === "firstForm" && (
        <>
          <div className="bg-[#001229] rounded-[18px] p-4  overflow-y-auto  scrollbar-thin">
            <div className="text-[18px] font-[700]">Create Notifications</div>
            <div className="mt-5">
              <TextFields
                text={"Title"}
                placeholder={"Write your title here"}
                state={title}
                setState={(e) => {
                  setTitle(e);
                  setErrors((prev) => ({ ...prev, title: "" }));
                }}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div className="flex justify-between mt-5">
              <h4 className="text-[16px]">Description</h4>
              <p className="text-[16px] text-[#FFFFFF80]">0/150</p>
            </div>
            <textarea
              name="description"
              id="description"
              placeholder="Write description here"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors((prev) => ({ ...prev, description: "" }));
              }}
              className="w-full  h-[221px] bg-[#1A293D] outline-none p-3 rounded-xl focus:border-[1px] focus:border-[#55C9FA]"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div className="flex justify-end gap-5 mt-6">
            <button
              className="w-[235px] h-[54px]  bg-[#02203A] rounded-[8px] text-[#199BD1] font-[700]"
              onClick={() => navigate("/pushnotification")}
            >
              Back
            </button>
            <button
              className="w-[235px] h-[54px]  bg-[#199BD1] rounded-[8px] text-white font-[700]"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      )}

      {tabs === "secondForm" && (
        <>
          <div className="h-[896px]  bg-[#001229] rounded-[18px] p-4">
            <div className="flex justify-end gap-5">
              <button
                className="text-[#199BD1] underline text-[16px] font-[700]"
                onClick={() => setTabs("firstForm")}
              >
                Back
              </button>
              <button
                className="w-[155px] h-[34px]  bg-[#02203A] rounded-[8px] text-[#199BD1] font-[700]"
                onClick={() => setCalenderOpen(true)}
              >
                Schedule for later
              </button>
              <button
                disabled={loading}
                className="w-[full] lg:w-[120px] h-[34px]  bg-[#199BD1] rounded-[10px] text-white font-[700] flex items-center justify-center leading-[21.6px] tracking-[-0.24px]"
                onClick={handlePushNotification}
              >
                <div className="flex items-center">
                  <span className="mr-1">Send</span>
                  {loading && (
                    <FiLoader className="animate-spin text-lg mx-auto" />
                  )}
                </div>
              </button>
            </div>
            <h3 className="text-[26px] font-[700] text-center">Send To</h3>
            <div className=" flex flex-col justify-center items-center  p-4">
              <Checkbox
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                setErrors={() => setErrors((prev) => ({ ...prev, option: "" }))}
              />
              {errors?.option && (
                <p className="text-red-500 text-sm mt-1">{errors?.option}</p>
              )}
            </div>
            <DateTime
              isOpen={calendarOpen}
              setIsOpen={setCalenderOpen}
              setDueDate={setDate}
              setInputError={setInputError}
            />
            <SendNotification
              isOpen={isModalOpen}
              onClose={() => {
                setModalOpen(false);
                setTabs("firstForm");
                navigate("/pushnotification");
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CreatePushNotification;
