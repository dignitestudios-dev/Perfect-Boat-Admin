import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import OwnerCard from "./OwnerCard";
import SignleUserCard from "./SignleUserCard";
import { FiSearch } from "react-icons/fi";
import axios from "../../axios";
import Skeleton from "../global/Skeleton";
import Pagination from "../paginations/Pagination";
import SearchInput from "../inputs/SearchInput";
const SingleUserList = () => {
  const [dropdownStates, setDropdownStates] = useState({});
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [singleUserData, setSingleUserData] = useState([]);
  const [pageDetails, setPageDetails] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const toggleDropdown = (id) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const closeDropdown = () => {
    setDropdownStates({});
  };

  const filteredUsers = singleUserData
    ?.filter((user) => {
      if (filterStatus === "active") return user?.isSubscribed === true;
      if (filterStatus === "inactive") return user?.isSubscribed === false;
      return true;
    })
    ?.filter((user) => {
      if (!searchValue) return true;
      const searchText = searchValue.toLowerCase();
      return (
        user?.name?.toLowerCase()?.includes(searchText) ||
        user?.email?.toLowerCase()?.includes(searchText)
      );
    });

  const getSingleUserTableData = async () => {
    try {
      setLoading(true);
      let url = `/admin/customer?isSingleUser=true&page=${currentPage}&pageSize=12`;

      if (searchValue) url += `&search=${encodeURIComponent(searchValue)}`;
      if (filterStatus === "active") url += `&subscription=active`;
      if (filterStatus === "inactive") url += `&subscription=inactive`;

      const { data } = await axios.get(url);
      setSingleUserData(data?.data?.data || []);
      setTotalPages(data?.data?.paginationDetails?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching owner data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getSingleUserTableData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchValue, filterStatus, currentPage]);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    closeDropdown();
  };

  const renderNoData = () => {
    if (loading) return <Skeleton />;
    if (singleUserData?.length === 0)
      return <div className="text-center text-white">No data found</div>;
    return null;
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    console.log("Search Value:", e.target.value);
  };
  return (
    <>
      <div className="p-5 bg-[#001229] rounded-[20px] h-[944px] overflow-y-auto  scrollbar-thin">
        <div className="desktop_screen">
          <div className=" mb-4">
            <h3 className="text-[18px] font-800 mb-3">Single User List</h3>
            <SearchInput
              placeholder="Search by name or email"
              value={searchValue}
              onChange={handleSearchChange}
            />
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
                  <div
                    className="absolute top-8 left-1/2 transform -translate-x-1/2 w-[100px] rounded-md shadow-lg p-2 cursor-pointer z-10 bg-[#1A293D]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p
                      onClick={() => handleFilterChange("all")}
                      className="text-white text-[11px] mt-2 cursor-pointer"
                    >
                      All
                    </p>
                    <p
                      onClick={() => handleFilterChange("active")}
                      className="text-white text-[11px] mt-2 cursor-pointer"
                    >
                      Active
                    </p>
                    <p
                      onClick={() => handleFilterChange("inactive")}
                      className="text-white text-[11px] mt-2 cursor-pointer"
                    >
                      Inactive
                    </p>
                  </div>
                )}
              </div>
              <div className="text-right">Actions</div>
            </div>

            {renderNoData() ||
              filteredUsers?.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-4 p-3 text-[11px] border-b-2 border-[#FFFFFF24] text-white bg-[#001229]"
                >
                  <div className="text-left font-medium">
                    {item?.name || "N/A"}
                  </div>
                  <div className="text-left">{item?.email || "N/A"}</div>
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
              ))}
          </div>
        </div>
      </div>

      <div className="flex justify-start content-start  text-start">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
        />
        <div className="flex justify-end mt-4" onClick={() => navigate(-1)}>
          <button className="bg-[#199BD1] w-[235px] h-[54px] rounded-[8px] text-white">
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleUserList;
