import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import TextFields from "../../components/onboarding/TextFields";
import Checkbox from "../../components/onboarding/Checkbox";
import DateTime from "../../components/global/DateTime";
import SendNotification from "../../components/Modal/SendNotification";
import { useNavigate } from "react-router-dom";

const PushNotification = () => {
  const [tabs, setTabs] = useState("1");
  const [calendarOpen, setCalenderOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      {tabs === "1" && (
        <div className="bg-[#001229] rounded-[18px] p-4 h-[964px] overflow-y-auto  scrollbar-thin">
          <div className="flex justify-between">
            <>
              <div className="font-[700] text-[18px]">Notifications</div>
              <button
                className="bg-[#199BD1] flex  justify-center items-center w-[93px] h-[34px] rounded-[10px] text-[13px] font-[700]"
                onClick={() => setTabs("2")}
              >
                <GoPlus color="white" size={14} /> Create
              </button>
            </>
          </div>

          {[...Array(10)]?.map((item, index) => (
            <div className="w-[1005px] mt-7 border-b border-[#243347] pb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-[16px] font-[700]">Employee name</h1>
                <p className="text-[#FFFFFF80]">9:00 PM</p>
              </div>
              <p className="text-[16px] mt-3 font-[400] text-[#FFFFFF80]">
                Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut
                tristique viverra blandit. Cras sem egestas praesent enim
                elementum dolor arcu.
              </p>
            </div>
          ))}
        </div>
      )}
      {tabs === "2" && (
        <>
          <div className="bg-[#001229] rounded-[18px] p-4  overflow-y-auto  scrollbar-thin">
            <div className="text-[18px] font-[700]">Create Notifications</div>
            <div className="mt-5">
              <TextFields
                text={"Title"}
                placeholder={"Write your title here"}
              />
            </div>
            <div className="flex justify-between mt-5">
              <h4 className="text-[16px]">Description</h4>
              <p className="text-[16px] text-[#FFFFFF80]">0/150</p>
            </div>
            <textarea
              name=""
              id=""
              placeholder="Write description here"
              className="w-full  h-[221px] bg-[#1A293D] outline-none p-3 rounded-xl focus:border-[1px] focus:border-[#55C9FA]"
            ></textarea>
          </div>
          <div className="flex justify-end gap-5 mt-6">
            <button
              className="w-[235px] h-[54px]  bg-[#02203A] rounded-[8px] text-[#199BD1] font-[700]"
              onClick={() => setTabs("1")}
            >
              Back
            </button>
            <button
              className="w-[235px] h-[54px]  bg-[#199BD1] rounded-[8px] text-white font-[700]"
              onClick={() => setTabs("3")}
            >
              Next
            </button>
          </div>
        </>
      )}

      {tabs === "3" && (
        <>
          <div className="h-[896px]  bg-[#001229] rounded-[18px] p-4">
            <div className="flex justify-end gap-5">
              <button
                className="text-[#199BD1] underline text-[16px] font-[700]"
                onClick={() => setTabs("2")}
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
                className="w-[107px] h-[34px]  bg-[#199BD1] rounded-[10px] text-white font-[700]"
                onClick={() => setModalOpen(true)}
              >
                Send
              </button>
            </div>
            <h3 className="text-[26px] font-[700] text-center">Send To</h3>
            <div className=" flex flex-col justify-center items-center  p-4">
              <Checkbox />
            </div>
            <DateTime
              isOpen={calendarOpen}
              setIsOpen={setCalenderOpen}
              setDueDate={setDate}
            />
            <SendNotification
              isOpen={isModalOpen}
              onClose={() => {
                setModalOpen(false);
                setTabs("1");
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default PushNotification;
