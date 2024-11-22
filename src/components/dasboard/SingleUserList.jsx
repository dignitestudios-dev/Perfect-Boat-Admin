import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import OwnerCard from "./OwnerCard";
import SignleUserCard from "./SignleUserCard";
import { FiSearch } from "react-icons/fi";
import axios from "../../axios";
import Skeleton from "../global/Skeleton";
const SingleUserList = () => {
  const [dropdownStates, setDropdownStates] = useState({});
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [singleUserData, setSingleUserData] = useState([]);
  const toggleDropdown = (id) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const filteredUsers = singleUserData?.filter((user) => {
    if (filterStatus === "active") return user.isSubscribed === true;
    if (filterStatus === "inactive") return user.isSubscribed === false;
    return true;
  });

  const getSingleUserTableData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "/admin/customer?isSingleUser=true&page=1&pageSize=12"
      );

      setSingleUserData(data?.data?.data);
      console.log(
        singleUserData,
        "singleUserDatasingleUserDatasingleUserDatasingleUserData"
      );
    } catch (error) {
      console.error("Error fetching owner data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleUserTableData();
  }, []);

  return (
    <>
      <div className="p-5 bg-[#001229] rounded-[20px] h-[944px] overflow-y-auto  scrollbar-thin">
        <div className="desktop_screen">
          <div className=" mb-4">
            <h3 className="text-[18px] font-800 mb-3">Single User List</h3>
            <div className="flex w-1/2 lg:w-[295px] h-[32px] justify-start items-start rounded-[8px] bg-[#1A293D] relative">
              <span className="w-[32px] h-full flex items-center justify-center">
                <FiSearch className="text-white/50 text-lg" />
              </span>
              <input
                type="text"
                placeholder="Search here"
                className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {/* Header Row */}
            <div className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-4 p-4 text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold bg-[#001229]">
              <div className="text-left">Single User Name</div>
              <div className="text-left">Email</div>
              <div className="text-center">Phone Number</div>
              <div className="text-center">Onboarding Date</div>
              <div className="text-center left-10 relative">
                <button
                  onClick={() => toggleDropdown("dropdown1")}
                  className="flex items-center justify-center gap-1 text-[#FFFFFF80] text-[11px] font-[500]"
                >
                  Subscription <IoMdArrowDropdown size={20} color="#FFFFFF80" />
                </button>
                {dropdownStates["dropdown1"] && (
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-[75px] rounded-md shadow-lg p-2 cursor-pointer z-10 bg-[#1A293D]">
                    <p
                      onClick={() => setFilterStatus("all")}
                      className="text-white text-[11px] mt-2 cursor-pointer "
                    >
                      All
                    </p>
                    <p
                      onClick={() => setFilterStatus("active")}
                      className="text-white text-[11px] mt-2 cursor-pointer "
                    >
                      Active
                    </p>
                    <p
                      onClick={() => setFilterStatus("inactive")}
                      className="text-white text-[11px] mt-2 cursor-pointer "
                    >
                      Inactive
                    </p>
                  </div>
                )}
              </div>
              <div className="text-right">Actions</div>
            </div>

            {loading ? (
              <div>
                <Skeleton />
              </div>
            ) : (
              filteredUsers?.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-4 p-3 text-[11px] border-b-2 border-[#FFFFFF24] text-white bg-[#001229]"
                >
                  <div className="text-left font-medium">{item?.name}</div>
                  <div className="text-left">{item?.email}</div>
                  <div className="text-center">{item?.phoneNumber}</div>
                  <div className="text-center">
                    {new Date(item?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </div>
                  <div className="text-center">
                    {item?.isSubscribed === true && (
                      <button className="bg-[#199BD1] w-[51px] h-[23px] rounded-full text-white text-xs">
                        Active
                      </button>
                    )}
                    {item?.isSubscribed === false && (
                      <button className="bg-[#9A9A9A] w-[59px] h-[23px] rounded-full text-white text-[11px]">
                        Inactive
                      </button>
                    )}
                  </div>
                  <div className="text-right">
                    <Link
                      to={`/detailuser/${item?._id}`}
                      className="underline text-white hover:text-white text-end"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Link to={"/home"} className="no-underline hover:no-underline">
        <div className="flex justify-end mt-4 ">
          <button className="bg-[#199BD1] w-[235px] h-[54px] rounded-[8px] text-white">
            Back
          </button>
        </div>
      </Link>
    </>
  );
};

export default SingleUserList;
