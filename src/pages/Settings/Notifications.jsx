import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

import { AuthMockup } from "../../assets/export";
import { Link } from "react-router-dom";
import { sampleNotifications } from "../../constant/notification";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filterNotifications = () => {
    if (activeTab === "Read") {
      return sampleNotifications.filter((notification) => notification.read);
    } else if (activeTab === "Unread") {
      return sampleNotifications.filter((notification) => !notification.read);
    }
    return sampleNotifications;
  };

  return (
    <div className="h-full  w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <div className="w-full h-auto flex flex-col justify-start items-start gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        <h1 className="text-[28px] font-bold text-white leading-[37.8px]">
          Notifications
        </h1>
        <div className="w-full  border-b-[0.5px] border-white/15 flex  justify-between items-center h-[34px] text-base font-normal text-[#fff]/[50%]">
          <div className="w-auto h-[34px] flex gap-6 justify-start items-center">
            <button
              onClick={() => setActiveTab("All")}
              className={`px-2 h-[34px] ${
                activeTab == "All" &&
                "text-[#199BD1] font-bold  border-b-[3px] border-[#199BD1]"
              } `}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("Read")}
              className={`px-2 h-[34px] ${
                activeTab == "Read" &&
                "text-[#199BD1]  font-bold border-b-[3px] border-[#199BD1]"
              } `}
            >
              Read
            </button>
            <button
              onClick={() => setActiveTab("Unread")}
              className={`px-2 h-[34px] flex justify-between items-center gap-2 ${
                activeTab == "Unread" &&
                "text-[#199BD1]  font-bold border-b-[3px] border-[#199BD1]"
              } `}
            >
              <span>Unread</span>
              <span className="bg-[#199BD1] text-white w-[18px] h-[18px] rounded-full text-[10px] flex items-center justify-center">
                15
              </span>
            </button>
          </div>
          <button
            className={'w-[107px] h-[32px] mb-2 text-[11px] font-bold rounded-[10px] text-white bg-[#199BD1]'}
          >
            Clear All
          </button>
        </div>
      
        <div className="w-full">
          {filterNotifications().map((notification) => (
            <Link
              key={notification.id}
              className={`w-full grid grid-cols-1 md:grid-cols-5 notification border-b-[1px] border-white/10 gap-x-4 ${
                notification.read ? "read" : "unread"
              }`}
              style={{textDecoration:"none"}}
            >
              <div className="col-span-3 flex gap-2 justify-start items-start py-2 lg:py-4">
                <img
                  src={AuthMockup}
                  alt=""
                  className="w-16 h-16 rounded-full"
                />
                <div className="w-[90%] flex flex-col justify-start items-start">
                  <span className="text-md font-semibold text-white">
                    Employee Name
                  </span>
                  <p className="w-full font-normal text-sm text-[#fff]/[0.5]">
                    {notification.message}
                  </p>
                </div>
              </div>
              <div className="col-span-1 text-end  py-2 lg:py-4">
                <p className="text-[#199BD1] text-sm font-medium pt-1">
                  9:00 PM
                </p>
              </div>
              <div className="col-span-1 text-end py-4">
                <button className="w-[73px] bg-[#199BD126] text-[11px] text-[#199BD1] font-medium rounded-full flex items-center justify-center gap-1 py-2 float-end">
                  <FaTrash />
                  Delete
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;