import React from "react";

const TaskLoader = () => {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex justify-between p-3 bg-[#1A293D] mt-3 h-[60px] rounded-[4px] items-center animate-pulse"
        >
          {/* Left Content Placeholder */}
          <div className="w-1/3 h-[14px] bg-gray-700 rounded"></div>

          {/* Right Icons Placeholder */}
          <div className="flex items-center gap-4">
            <div className="w-[22px] h-[22px] bg-gray-700 rounded"></div>
            <div className="w-[18px] h-[18px] bg-gray-700 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskLoader;
