import React from "react";

const Skeleton = () => {
  return (
    <div>
      <div className="animate-pulse">
        <div className="h-4 bg-gray-500 mt-3 mb-6 rounded"></div>
        <div className="h-4 bg-gray-500 mb-6 rounded"></div>
        <div className="h-4 bg-gray-500 mb-6 rounded"></div>
        <div className="h-4 bg-gray-500 mb-6 rounded"></div>
        <div className="h-4 bg-gray-500 mb-6 rounded"></div>
      </div>
    </div>
  );
};

export default Skeleton;
