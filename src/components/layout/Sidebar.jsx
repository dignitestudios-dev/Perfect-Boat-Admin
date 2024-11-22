import React, { useContext, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  CoinIcon,
  Gray1,
  Gray2,
  Gray3,
  Gray4,
  Gray5,
  Gray6,
  Gray7,
  Gray8,
  Gray9,
  SideBarLogo,
  White1,
  White2,
  White3,
  White4,
  White5,
  White6,
  White7,
  White8,
  White9,
} from "../../assets/export";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import LogoutModal from "../Modal/LogoutModal";
import { AuthContext } from "../../contexts/AuthContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeDropdown, setActiveDropdown] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [activeParent, setActiveParent] = useState("");

  const handleLogout = () => {
    console.log("User logged out");
    setModalOpen(false);
    logout();
  };

  const handleToggleDropdown = (label) => {
    setActiveDropdown((prev) => (prev === label ? "" : label));
  };

  const handleNavigation = (path) => {
    setActiveDropdown("");
    toggleSidebar();
    navigate(path);
  };

  const sidebarItems = [
    { to: "/home", label: "Dashboard", grayicon: Gray1, whiteicons: White1 },
    {
      to: "/customers",
      label: "Customers",
      grayicon: Gray2,
      whiteicons: White2,
      subLinks: [
        { to: "/ownerlist", label: "Owner" },
        { to: "/singleuser", label: "Single Users" },
      ],
    },
    {
      to: "/revenuereport",
      label: "Revenue Report",
      grayicon: Gray3,
      whiteicons: White3,
    },
    {
      to: "/taskmanagement",
      label: "Task & Boat Management",
      grayicon: Gray4,
      whiteicons: White4,
    },
    {
      to: "/blogs",
      label: "Tide, Tales & Guides",
      grayicon: Gray5,
      whiteicons: White5,
    },
    {
      to: "/pushnotification",
      label: "Push Notification",
      grayicon: Gray6,
      whiteicons: White6,
    },
    {
      to: "/deleteusers",
      label: "Delete Users",
      grayicon: Gray7,
      whiteicons: White7,
    },
    { to: "/settings", label: "Settings", grayicon: Gray8, whiteicons: White8 },
  ];

  return (
    <div className="md:relative ">
      <div
        className={`fixed lg:static inset-0 z-20 bg-black bg-opacity-50    transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      <div
        className={`fixed inset-y-0 left-0 w-[260px] h-screen overflow-auto scrollbar-thin bg-[#0E1B31] text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0 z-30`}
      >
        <div className="p-6">
          <div
            className="text-2xl font-bold cursor-pointer "
            onClick={() => navigate("/home")}
          >
            <img
              src={SideBarLogo}
              className="w-[190.36px] h-[117.18px] top-18px left-24px"
              alt="Sidebar Logo"
            />
          </div>

          <ul className="flex flex-col gap-6 mt-5">
            {sidebarItems.map((item, index) => {
              const isDropdownActive = activeDropdown === item.label;

              return (
                <li key={index}>
                  {item.subLinks ? (
                    <>
                      <button
                        className={`flex items-center gap-3 p-2 text-[13px] rounded-[10px] w-full text-left ${
                          isDropdownActive
                            ? "bg-[#199BD1] text-white"
                            : "text-[#FFFFFF80]"
                        }`}
                        onClick={() => handleToggleDropdown(item.label)}
                      >
                        <img
                          src={
                            isDropdownActive ? item.whiteicons : item.grayicon
                          }
                          className="w-[24px] h-[24px]"
                          alt=""
                        />
                        <span>{item.label}</span>
                        <span>
                          {isDropdownActive ? (
                            <FaChevronUp size={8} className="text-white" />
                          ) : (
                            <FaChevronDown size={8} className="text-gray-400" />
                          )}
                        </span>
                      </button>

                      {isDropdownActive && (
                        <ul className="ml-6 mt-2 flex flex-col gap-2">
                          {item.subLinks.map((subLink, subIndex) => (
                            <li key={subIndex}>
                              <button
                                className={`text-[13px] mx-5 ${
                                  location.pathname === subLink.to
                                    ? "text-[#199BD1]"
                                    : "text-[#FFFFFF80]"
                                } hover:text-white`}
                                onClick={() => handleNavigation(subLink.to)}
                              >
                                {subLink.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <button
                      className={`flex items-center gap-3 p-2 text-[13px] w-full text-left ${
                        activeDropdown === "" && location.pathname === item.to
                          ? "bg-[#199BD1] text-white rounded-[10px]"
                          : "text-[#FFFFFF80] hover:text-white"
                      }`}
                      onClick={() => handleNavigation(item.to)}
                    >
                      <img
                        src={
                          activeDropdown === "" && location.pathname === item.to
                            ? item.whiteicons
                            : item.grayicon
                        }
                        className="w-[24px] h-[24px]"
                        alt=""
                      />
                      <span>{item.label}</span>
                    </button>
                  )}
                </li>
              );
            })}
            <li>
              <button
                className="flex items-center gap-3 p-2 text-[13px] w-full text-left text-[#FFFFFF80] hover:text-white hover:bg-[#199BD1] rounded-[10px]"
                onClick={() => setModalOpen(true)}
              >
                <img
                  src={Gray9}
                  className="w-[24px] h-[24px]"
                  alt="Logout Icon"
                />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
