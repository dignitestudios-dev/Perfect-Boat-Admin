import React, { useState } from "react";

const ToggleBtn = () => {
  const [settings, setSettings] = useState([
    {
      title: "Task Assignment",
      para: "Receive notifications on task assignments across teams. Stay updated on progress and ensure timely completion.",
      isEnabled: true,
    },
    {
      title: "Boats Alerts",
      para: "Monitor all boats under your management. Stay informed about status changes, locations, and important updates.",
      isEnabled: true,
    },
    {
      title: "Maintenance Alerts",
      para: "Keep track of upcoming maintenance for your fleet. Ensure all tasks are completed to keep operations running smoothly.",
      isEnabled: true,
    },
    {
      title: "Billing Updates",
      para: "Receive billing-related updates and reminders.",
      isEnabled: true,
    },
    {
      title: "Security Alerts",
      para: "Receive instant alerts in case of security breaches or critical events. Safety first!",
      isEnabled: true,
    },
    {
      title: "New Task Request",
      para: "Get instant notifications when your team members submit new task request.",
      isEnabled: true,
    },
    {
      title: "Text",
      para: "Pause text notifications and enjoy uninterrupted moments.",
      isEnabled: true,
    },
    {
      title: "Email",
      para: "Pause  email notifications and reclaim your inbox for moments of calm.",
      isEnabled: true,
    },
  ]);

  const handleToggle = (index) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting, i) =>
        i === index ? { ...setting, isEnabled: !setting.isEnabled } : setting
      )
    );
  };

  return (
    <div className="space-y-4 ">
      {settings.map((setting, index) => (
        <div
          key={index}
          className="w-full flex items-start justify-between   rounded-lg"
        >
          <div className="flex flex-col mt-7 ">
            <h1 className="text-[16px] font-medium leading-[21.6px] text-white">
              {setting?.title}
            </h1>
            <p className="text-[12px] text-[#FFFFFF80] mt-2">{setting?.para}</p>
          </div>

          <div>
            <label className="inline-flex items-center mt-7 cursor-pointer">
              <input
                type="checkbox"
                checked={setting?.isEnabled}
                onChange={() => handleToggle(index)}
                className="sr-only peer"
              />
              <div className="relative w-[32.94px] h-[18.53px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.7px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14.82px] after:w-[14.82px] after:transition-all dark:border-gray-600 peer-checked:bg-[#028EE6]"></div>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToggleBtn;
