import React, { useEffect, useState } from "react";
import SearchInput from "../inputs/SearchInput";
import { IoMdArrowDropdown } from "react-icons/io";
import { Delteicon } from "../../assets/export";
import { Link } from "react-router-dom";
import axios from "../../axios";
import RemoveSingleUser from "../Modal/RemoveSingleUser";
import RemoveOwner from "../Modal/RemoveOwner";

const UserInformation = () => {
  const [tabs, setTabs] = useState("1");
  const [dropdownStates, setDropdownStates] = useState({});
  const [userOpen, setUserOpen] = useState(false);
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settingOwnerdata, setSettingOwnerdata] = useState([]);
  const toggleDropdown = (id) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };


  const getsettingsData = async () => {
    try {
      setLoading(true);
      let url = "/admin/revenue/setting/user";
      if (tabs === "1") {
        url = "/admin/setting/user?isSingleUser=false";
      } else if (tabs === "2") {
        url = "/admin/setting/user?isSingleUser=true";
      }

      const { data } = await axios.get(url);
      console.log(data?.data, "Fetched Revenue Data");
      setSettingOwnerdata(data?.data || []);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getsettingsData();
  }, [tabs]);
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
            <div className="w-full h-[640px] rounded-lg bg-[#0A192F]">
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
                          <div className="absolute top-full left-0 mt-2 w-[120px] rounded-md shadow-lg p-2 bg-[#1A293D] z-10">
                            {["Active", "Inactive", "Pending"].map(
                              (status, idx) => (
                                <p
                                  key={idx}
                                  className="text-white text-[11px] py-1 px-2 cursor-pointer hover:bg-[#199BD1] rounded-md"
                                >
                                  {status}
                                </p>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      item
                    )}
                  </div>
                ))}
              </div>
              {loading ? (
                <div class="animate-pulse">
                  <div class="h-4 bg-gray-500 mt-3 mb-6 rounded"></div>
                  <div class="h-4 bg-gray-500 mb-6 rounded"></div>
                  <div class="h-4 bg-gray-500 mb-6 rounded"></div>
                  <div class="h-4 bg-gray-500 mb-6 rounded"></div>
                  <div class="h-4 bg-gray-500 mb-6 rounded"></div>
                </div>
              ) : settingOwnerdata?.length === 0 ? (
                <p>No data available.</p>
              ) : (
                settingOwnerdata?.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1.5fr_1.5fr_1.5fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 p-4 text-white text-[12px] border-b border-[#FFFFFF24] items-center"
                  >
                    <div className="truncate">{item?.name || "N/A"}</div>

                    <div className="text-center">
                      {item?.totalUser || "N/A"}
                    </div>

                    <div className="truncate">{item?.email || "N/A"}</div>

                    <div className="text-center">
                      {item?.phoneNumber || "N/A"}
                    </div>

                    <div className="text-center">
                      {new Date(item?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </div>

                    <div className="text-center">
                      {item?.isSubscribed === true ? (
                        <button className="bg-[#199BD1] px-3 py-1 rounded-full text-white text-[11px]">
                          Active
                        </button>
                      ) : (
                        <button className="bg-[#9A9A9A] px-3 py-1 rounded-full text-white text-[11px]">
                          Inactive
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-center">
                      <button onClick={()=>setOwnerOpen(true)}>
                        <img
                          src={Delteicon}
                          className="w-[16px] h-[16px]"
                          alt="Delete Icon"
                        />
                      </button>
                    </div>
                  </div>
                ))
              )}
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
              {loading ? (
                <div class="animate-pulse">
                  <div class="h-4 bg-gray-500 mt-3 mb-6 rounded"></div>
                  <div class="h-4 bg-gray-500 mb-6 rounded"></div>
                  <div class="h-4 bg-gray-500 mb-6 rounded"></div>
                  <div class="h-4 bg-gray-500 mb-6 rounded"></div>
                  <div class="h-4 bg-gray-500 mb-6 rounded"></div>
                </div>
              ) : settingOwnerdata?.length === 0 ? (
                <p>No data available.</p>
              ) : (
                settingOwnerdata?.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1.5fr_1.5fr_1.5fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 p-4 text-white text-[12px] border-b border-[#FFFFFF24] items-center"
                  >
                    <div className="truncate">{item?.name || "N/A"}</div>

                    <div className="text-center">
                      {item?.totalUser || "N/A"}
                    </div>

                    <div className="truncate">{item?.email || "N/A"}</div>

                    <div className="text-center">
                      {item?.phoneNumber || "N/A"}
                    </div>

                    <div className="text-center">
                      {new Date(item?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </div>

                    {/* Subscription Status */}
                    <div className="text-center">
                      {item?.isSubscribed === true ? (
                        <button className="bg-[#199BD1] px-3 py-1 rounded-full text-white text-[11px]">
                          Active
                        </button>
                      ) : (
                        <button className="bg-[#9A9A9A] px-3 py-1 rounded-full text-white text-[11px]">
                          Inactive
                        </button>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-center">
                      <button onClick={()=>setUserOpen(true)}>
                        <img
                          src={Delteicon}
                          className="w-[16px] h-[16px]"
                          alt="Delete Icon"
                        />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      <RemoveSingleUser
      isOpen={userOpen}
      onClose={() => setUserOpen(false)}
      />
      
      <RemoveOwner
      isOpen={ownerOpen}
      onClose={() => setOwnerOpen(false)}
      />

    </div>
  );
};

export default UserInformation;
