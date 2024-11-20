import React, { useState } from "react";
import Sidebar from "../components/layout/sidebar";
import Header from "../components/layout/header";

const AppLayout = ({ page }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex w-full overflow-y-hidden justify-start items-start  h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="w-full lg:w-[calc(100%-240px)] relative justify-start items-start flex flex-col h-full flex-grow">
        <Header toggleSidebar={toggleSidebar} />
        <div className="w-full lg:h-[calc(100%-60px)] overflow-y-scroll relative justify-start items-startflex-grow p-6 bg-[#1a293d] text-white">
          {page}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
