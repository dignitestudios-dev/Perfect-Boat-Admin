import React from "react";
import SearchInput from "../inputs/SearchInput";
import ToggleBtn from "../onboarding/ToggleBtn";

const UserNotifications = () => {
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
          <button className="bg-[#199BD1] w-[93px] h-[32px] rounded-[10px] text-[11px]">
            Save Changes
          </button>
        </div>
      </div>
      <ToggleBtn />
    </div>
  );
};

export default UserNotifications;
