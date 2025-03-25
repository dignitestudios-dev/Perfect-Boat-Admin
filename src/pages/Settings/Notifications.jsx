import React, { useContext, useEffect, useState } from "react";

import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/Toaster/Toaster";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FiLoader } from "react-icons/fi";
import NotificationRow from "../../components/notification/NotificationRow";
import Skeleton from "../../components/global/Skeleton";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [filteredNotifications, setFilteredNotifications] = useState([]);

  const {
    notifications,
    setNotifications,
    notificationUpdate,
    setNotificationUpdate,
  } = useContext(GlobalContext);

  const getNotifications = async () => {
    setNotificationLoading(true);
    try {
      const { data } = await axios.get("/admin/notification");
      setNotifications(data?.data?.reverse());
    } catch (err) {
      console.log(" ~ getNotifications ~ err:", err);
    } finally {
      setNotificationLoading(false);
    }
  };
  useEffect(() => {
    getNotifications();
  }, [notificationUpdate]);

  // Calculate unread notifications count
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  useEffect(() => {
    setFilteredNotifications(
      notifications.filter((notification) => {
        if (activeTab === "Read") return notification?.isRead;
        if (activeTab === "Unread") return !notification?.isRead;
        return true; // for "all" tab
      })
    );
  }, [activeTab, notifications]);
  // Function to mark all notifications as read
  const readAll = async () => {
    setUpdateLoading(true);
    try {
      const readResponse = await axios.put("/admin/notification/read");
      console.log("🚀  readAll  readResponse:", readResponse);

      // Ensure that the response status is 200 and has the expected format
      if (readResponse?.status === 200) {
        getNotifications();
      } else {
        // Handle cases where the status isn't 200, if needed
        throw new Error("Unexpected response status");
      }
    } catch (err) {
      // Only show the error toast if it's an actual error, and avoid triggering on success.
      if (err?.response?.data?.message) {
        ErrorToast(err?.response?.data?.message);
      } else {
        // If no specific message, you could display a general error message
        ErrorToast("An unexpected error occurred.");
      }
    } finally {
      setUpdateLoading(false);
    }
  };

  const DeleteAll = async () => {
    setUpdateLoading(true);
    try {
      const response = await axios.delete("/admin/notification");
      if (response?.status == 200) {
        getNotifications();
        setNotificationUpdate((prev) => !prev);
        SuccessToast("Notification cleared successfully.");
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setUpdateLoading(false);
    }
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
              onClick={() => {
                if (filteredNotifications.some((e) => e?.isRead === false)) {
                  readAll();
                }
                setActiveTab("Unread");
              }}
              className={`px-2 h-[34px] flex justify-between items-center gap-2 ${
                activeTab == "Unread" &&
                "text-[#199BD1]  font-bold border-b-[3px] border-[#199BD1]"
              } `}
            >
              <span>Unread</span>
              <span className="bg-[#199BD1] text-white w-[18px] h-[18px] rounded-full text-[10px] flex items-center justify-center">
                {unreadCount}
              </span>
            </button>
          </div>
          <button
            onClick={DeleteAll}
            className={
              "w-[107px] h-[32px] mb-2 text-[11px] font-bold rounded-[10px] text-white bg-[#199BD1] flex justify-center items-center"
            }
          >
            Clear All
            {updateLoading && (
              <FiLoader className="animate-spin text-lg ml-1" />
            )}
          </button>
        </div>

        {notificationLoading ? (
          <div className="w-full">
            <Skeleton />
          </div>
        ) : (
          <div className="w-full">
            {filteredNotifications?.map((notification) => (
              <NotificationRow
                notification={notification}
                key={notification?._id}
                setNotificationUpdate={setNotificationUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
