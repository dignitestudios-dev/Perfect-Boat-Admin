import React, { useEffect, useState } from "react";
import SearchInput from "../inputs/SearchInput";
import ToggleBtn from "../onboarding/ToggleBtn";
import axios from "../../axios";
import { FiLoader } from "react-icons/fi";
import { ErrorToast, SuccessToast } from "../Toaster/Toaster";
import Skeleton from "../global/Skeleton";

const UserNotifications = () => {
  const [settings, setSettings] = useState([]);
  const [settingsLoading, setSettingLoading] = useState(false);
  const [settingsUpdate, setSettingsUpdate] = useState(false);

  const getSettings = async () => {
    setSettingLoading(true);
    try {
      const { data } = await axios.get("/admin/notification/setting");
      setSettings(data?.data);
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setSettingLoading(false);
    }
  };

  const [updateLoading, setUpdateLoading] = useState(false);
  const handleSaveChanges = async () => {
    setUpdateLoading(true);
    try {
      await axios.put("/admin/notification/setting", settings);
      setSettingsUpdate((prev) => !prev); // Trigger re-fetch to ensure updates
      setUpdateLoading(false);
      SuccessToast("Updated");
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      console.error("Error saving settings:", err);
      setUpdateLoading(false);
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    getSettings();
  }, [settingsUpdate]);
  return (
    <div>
      <div className="flex  justify-between">
        <div>
          <h2 className="text-[24px] font-[700]">Notifications</h2>
          <p className="text-[#FFFFFF80] w-[486px] font-[400] mt-2">
            Tailor your voyage notifications to perfection. Stay informed with
            alerts that matter most on your Nautical Journey.
          </p>
        </div>
        <div>
          {/* <button className="bg-[#199BD1] w-[93px] h-[32px] rounded-[10px] text-[11px]"></button> */}

          <button
            onClick={handleSaveChanges}
            className="bg-[#199BD1] w-[103px] h-[32px] rounded-[10px] text-[11px] flex items-center justify-center"
          >
            Save Changes
            {updateLoading && (
              <FiLoader className="animate-spin text-lg ml-1" />
            )}
          </button>
        </div>
      </div>
      {settingsLoading ? (
        <div>
          <Skeleton />
        </div>
      ) : (
        <ToggleBtn settings={settings} setSettings={setSettings} />
      )}
    </div>
  );
};

export default UserNotifications;
