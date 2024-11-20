import React from "react";
import { FaBars } from "react-icons/fa";
import { HeaderProfile, NotificationIcon } from "../../assets/export";
import { Link } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex w-full  h-[60px] justify-between items-center bg-[#0E1B31] p-4 text-white">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden p-2">
          <FaBars size={24} />
        </button>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="bg-[#1A293D] p-2 text-center rounded-[8px] w-[38px] h-[38px]">
          <div className="bg-red-600 h-[10px] absolute top-4 w-[10px] rounded-[20px] mx-5 "></div>
          <Link to={"/notifications"}>
            <img src={NotificationIcon} alt="" />
          </Link>
        </div>
        <Link to={'/profile'}>
          <img
            src={HeaderProfile}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
        </Link>
        <Link to={"/profile"} className="hover:no-underline no-underline">
          <div>
            <div className="text-[11px] text-[#FFFFFF80]  ">Welcome back,</div>
            <div className="text-[11px] text-[#FFFFFF] "> Jhonas Smith</div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
