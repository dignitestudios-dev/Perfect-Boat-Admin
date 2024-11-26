import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import TextFields from "../../components/onboarding/TextFields";
import Checkbox from "../../components/onboarding/Checkbox";
import DateTime from "../../components/global/DateTime";
import SendNotification from "../../components/Modal/SendNotification";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import moment from "moment";
import Skeleton from "../../components/global/Skeleton";

const PushNotification = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState([]);
  const [notificationData, setNotificationData] = useState([]);

  const [loading, setLoading] = useState(false);

  const getPushNotifications = async () => {
    try {
      setLoading(true);
      console.log("if call");
      const { data } = await axios.get("/admin/notification");
      console.log("🚀 ~ getTasks ~ data:", data);
      if (data.success === true) {
        setNotificationData(data?.data);
      }
    } catch (error) {
      console.log("🚀 ~ getTasks ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPushNotifications();
  }, []);

  return (
    <div className="bg-[#001229] rounded-[18px] p-4 h-[964px] overflow-y-auto  scrollbar-thin">
      <div className="flex justify-between">
        <>
          <div className="font-[700] text-[18px]">Notifications</div>
          <button
            className="bg-[#199BD1] flex  justify-center items-center w-[93px] h-[34px] rounded-[10px] text-[13px] font-[700]"
            onClick={() => navigate("/create-push-notification")}
          >
            <GoPlus color="white" size={14} /> Create
          </button>
        </>
      </div>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          {notificationData?.length === 0 ? (
            <div>No data found</div>
          ) : (
            <>
              {notificationData?.map((item, index) => (
                <div className="w-[1005px] mt-7 border-b border-[#243347] pb-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-[16px] font-[700]">{item?.title}</h1>
                    <p className="text-[#FFFFFF80]">
                      {" "}
                      {moment(item?.createdAt).format("h:mm A")}
                    </p>
                  </div>
                  <p className="text-[16px] mt-3 font-[400] text-[#FFFFFF80]">
                    {item?.description}
                  </p>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PushNotification;
