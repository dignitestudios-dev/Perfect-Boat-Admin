import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { HeaderProfile, NotificationIcon } from "../../assets/export";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { GlobalContext } from "../../contexts/GlobalContext";

const Header = ({ toggleSidebar }) => {
  const { navigate, notifications,profilepic } = useContext(GlobalContext);



  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;
  return (
    <header className="flex w-full  h-[60px] justify-between items-center bg-[#0E1B31] p-4 text-white">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden p-2">
          <FaBars size={24} />
        </button>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="bg-[#1A293D] p-2 text-center rounded-[8px] w-[38px] h-[38px]">
          {unreadCount ? (
            <div className="bg-red-600 h-[10px] absolute top-4 w-[10px] rounded-[20px] mx-5 "></div>
          ) : (
            <div className="absolute top-4 w-[10px] mx-5"></div>
          )}

          <Link to={"/notifications"}>
            <img src={NotificationIcon} alt="" />
          </Link>
        </div>
        <div>
          <img
            src={
              profilepic ||
              `https://ui-avatars.com/api/?name=${Cookies.get("name")}`
            }
            alt="Profile"
            className="w-[28px] h-[28px] rounded-full"
            onClick={() => navigate("/profile", "Profile")}
          />
        </div>
        <div className="hover:no-underline no-underline">
          <div>
            <div className="text-[11px] text-[#FFFFFF80]  ">Welcome back,</div>
            <div className="text-[11px] text-[#FFFFFF] ">
              {" "}
              {Cookies.get("name")}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
