import React, { useState } from "react";
import SearchInput from "../inputs/SearchInput";
import { IoMdArrowDropdown } from "react-icons/io";
import { Delteicon } from "../../assets/export";
import { Link } from "react-router-dom";

const UserInformation = () => {
  const [tabs, setTabs] = useState("1");
  const [dropdownStates, setDropdownStates] = useState({});

  const toggleDropdown = (id) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  return (
    <div>
      <div className="flex  justify-between">
        <div>
          <h2 className="text-[24px] font-[700]">User Information</h2>
          <p className="text-[#FFFFFF80] w-[486px] font-[400] mt-2">
            Navigate through your user details effortlessly, managing your
            account settings for a seamless and personalized experience.
          </p>
        </div>
        <div className="bg-[#199BD1] text-white w-[93px] h-[32px] rounded-[10px] text-[11px] hover:text-white text-center items-center flex justify-center">
          <Link
            to={"/ownerdetail"}
            className="text-white no-underline hover:no-underline hover:text-white"
          >
            + Add Owner
          </Link>
        </div>
      </div>
      <SearchInput />
      <div>
        <div>
          <div className="flex gap-3 items-center mt-3">
            <button
              className={`w-[51px] h-[27px] mt-3 text-[11px] rounded-[100px] ${
                tabs === "1"
                  ? "bg-[#199BD1] text-white"
                  : "bg-[#199BD126] text-[#199BD1]"
              }`}
              onClick={() => setTabs("1")}
            >
              Owners
            </button>
            <button
              className={`w-[72px] h-[27px] mt-3 text-[11px] rounded-[100px] ${
                tabs === "2"
                  ? "bg-[#199BD1] text-white"
                  : "bg-[#199BD126] text-[#199BD1]"
              }`}
              onClick={() => setTabs("2")}
            >
              Single Users
            </button>
          </div>
        </div>
          <div className="h-[702px]  overflow-y-auto  scrollbar-thin">
            {tabs === "1" && (
              <div className="w-full h-[640px] rounded-lg ">
                <div className="grid grid-cols-[1.5fr_1.5fr_1.5fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 p-4 text-[#FFFFFF80] text-[12px] font-semibold">
                  {[
                    "Owner Name",
                    "Total No. of Users",
                    "Email",
                    "Phone Number",
                    "Onboarding Date",
                    "Subscription",
                    "Actions",
                  ].map((item, index) => (
                    <div key={index} className="text-[11px] font-[500]">
                      {item === "Subscription" ? (
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown("headerDropdown")}
                            className="flex items-center gap-1 text-[11px] font-medium text-[#FFFFFF80]"
                          >
                            Subscription <IoMdArrowDropdown size={18} />
                          </button>
                          {dropdownStates["headerDropdown"] && (
                            <div className="absolute top-2 left-0 w-[105px] mt-2 rounded-md shadow-lg p-2 bg-[#1A293D] z-10">
                              <p className="text-white text-[11px] py-1 cursor-pointer hover:bg-[#199BD1] rounded-md">
                                Active
                              </p>
                              <p className="text-white text-[11px] py-1 cursor-pointer hover:bg-[#199BD1] rounded-md">
                                Inactive
                              </p>
                              <p className="text-white text-[11px] py-1 cursor-pointer hover:bg-[#199BD1] rounded-md">
                                Pending
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        item
                      )}
                    </div>
                  ))}
                </div>
                {Array.from({ length: 19 }).map((_, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="grid grid-cols-[1.5fr_1.5fr_1.5fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 p-4 text-white text-[12px] border-b border-[#FFFFFF24]"
                  >
                    {[
                      "Owner ABC",
                      "156",
                      "ethanliam@gmail.com",
                      "+1 000 000 0000",
                      "12/12/2024",
                    ].map((item, colIndex) => (
                      <div key={colIndex} className="text-[11px] font-[500]">
                        {item}
                      </div>
                    ))}

                    <div className="flex items-center justify-center text-[11px] font-[500] bg-[#199BD1] w-[67px] h-[27px] rounded-full">
                      Active
                    </div>

                    <div className="flex items-center justify-center">
                      <button>
                        <img
                          src={Delteicon}
                          className="w-[16px] h-[16px]"
                          alt="Delete Icon"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tabs === "2" && (
              <div className="w-full rounded-lg overflow-hidden">
                <div className="grid grid-cols-[1.5fr_1.5fr_1.5fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 p-4 text-[#FFFFFF80] text-[12px] font-semibold">
                  {[
                    "User Name",
                    "Total No. of Users",
                    "Email",
                    "Phone Number",
                    "Onboarding Date",
                    "Subscription",
                    "Actions",
                  ].map((item, index) => (
                    <div key={index} className="text-[11px] font-[500]">
                      {item === "Subscription" ? (
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown("headerDropdown")}
                            className="flex items-center gap-1 text-[11px] font-medium text-[#FFFFFF80]"
                          >
                            Subscription <IoMdArrowDropdown size={18} />
                          </button>
                          {dropdownStates["headerDropdown"] && (
                            <div className="absolute top-2 left-0 w-[105px] mt-2 rounded-md shadow-lg p-2 bg-[#1A293D] z-10">
                              <p className="text-white text-[11px] py-1 cursor-pointer hover:bg-[#199BD1] rounded-md">
                                Active
                              </p>
                              <p className="text-white text-[11px] py-1 cursor-pointer hover:bg-[#199BD1] rounded-md">
                                Inactive
                              </p>
                              <p className="text-white text-[11px] py-1 cursor-pointer hover:bg-[#199BD1] rounded-md">
                                Pending
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        item
                      )}
                    </div>
                  ))}
                </div>
                {Array.from({ length: 13 }).map((_, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="grid grid-cols-[1.5fr_1.5fr_1.5fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 p-4 text-white text-[12px] border-b border-[#FFFFFF24]"
                  >
                    {[
                      "Owner ABC",
                      "156",
                      "ethanliam@gmail.com",
                      "+1 000 000 0000",
                      "12/12/2024",
                    ].map((item, colIndex) => (
                      <div key={colIndex} className="text-[11px] font-[500]">
                        {item}
                      </div>
                    ))}

                    <div className="flex items-center justify-center text-[11px] font-[500] bg-[#199BD1] w-[67px] h-[27px] rounded-full">
                      Active
                    </div>

                    <div className="flex items-center justify-center">
                      <button>
                        <img
                          src={Delteicon}
                          className="w-[16px] h-[16px]"
                          alt="Delete Icon"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default UserInformation;
