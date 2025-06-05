import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";
import Skeleton from "../global/Skeleton";
import Pagination from "../../components/paginations/Pagination";
import SearchInput from "../inputs/SearchInput";
import Cookies from "js-cookie";
import moment from "moment";

const OwnerList = () => {
  const [dropdownStates, setDropdownStates] = useState({});
  const [filterStatus, setFilterStatus] = useState("all");
  const [onboardingFilter, setOnboardingFilter] = useState("latest");
  const [loading, setLoading] = useState(false);
  const [ownerData, setOwnerData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const toggleDropdown = (id) => {
    setDropdownStates((prevState) => {
      const newState = {};
      if (prevState[id]) {
        return newState;
      }
      newState[id] = true;
      return newState;
    });
  };

  const closeDropdown = () => {
    setDropdownStates({});
  };

  const handleOnboardingFilterChange = (value) => {
    setOnboardingFilter(value);
    closeDropdown();
  };

  const getOwnerTableData = async () => {
    try {
      setLoading(true);
      let url = `/admin/customer?isSingleUser=false&page=${currentPage}&pageSize=12`;

      if (searchValue) url += `&search=${encodeURIComponent(searchValue)}`;
      if (filterStatus === "active") url += `&subscription=active`;
      if (filterStatus === "inactive") url += `&subscription=inactive`;
      if (onboardingFilter) url += `&onboarding=${onboardingFilter}`;

      const { data } = await axios.get(url);
      setOwnerData(data?.data?.data || []);
      setTotalPages(data?.data?.paginationDetails?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching owner data:", error);
      if (error?.response?.status === 401) {
        Cookies.remove("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getOwnerTableData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [currentPage]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCurrentPage(1);
      getOwnerTableData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchValue, filterStatus, onboardingFilter]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    closeDropdown();
  };

  const renderNoData = () => {
    if (loading) return <Skeleton />;
    if (ownerData.length === 0)
      return <div className="text-center text-white">No data found</div>;
    return null;
  };

  return (
    <>
      <div className="p-5 bg-[#001229] rounded-[20px] h-[944px] overflow-y-auto scrollbar-thin">
        <div className="">
          <div className="flex justify-between mb-4">
            <div>
              <h3 className="text-[18px] font-[700] mb-3">Owners List</h3>
              <SearchInput
                placeholder="Search here"
                value={searchValue}
                onChange={handleSearchChange}
              />
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

          <div className="grid gap-4">
            <div className="grid grid-cols-[1fr_1fr_2fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 p-4 text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Owner Name</div>
              <div>Total No. of Users</div>
              <div>Email</div>
              <div>Phone Number</div>
              <div className="text-center relative">
                <button
                  onClick={() => toggleDropdown("dropdown2")}
                  className="flex items-center justify-center gap-1 text-[#FFFFFF80] text-[11px] font-[500]"
                >
                  Onboarding <IoMdArrowDropdown size={20} color="#FFFFFF80" />
                </button>
                {dropdownStates["dropdown2"] && (
                  <div
                    className="absolute text-start top-8 left-10 px-3 transform -translate-x-1/2 w-[120px] rounded-md shadow-lg p-2 cursor-pointer z-10 bg-[#1A293D]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p
                      onClick={() => handleOnboardingFilterChange("latest")}
                      className="text-white text-[11px] mt-2 cursor-pointer hover:bg-[#294161] hover:rounded-md p-2 "
                    >
                      Latest
                    </p>
                    <p
                      onClick={() => handleOnboardingFilterChange("earliest")}
                      className="text-white text-[11px] mt-2 cursor-pointer hover:bg-[#294161] hover:rounded-md p-2"
                    >
                      Earliest
                    </p>
                  </div>
                )}
              </div>
              <div className="text-center relative">
                <button
                  onClick={() => toggleDropdown("dropdown1")}
                  className="flex items-center justify-center gap-1 text-[#FFFFFF80] text-[11px] font-[500]"
                >
                  Subscription <IoMdArrowDropdown size={20} color="#FFFFFF80" />
                </button>
                {dropdownStates["dropdown1"] && (
                  <div
                    className="absolute text-start top-8 left-10 px-3 transform -translate-x-1/2 w-[120px] rounded-md shadow-lg p-2 cursor-pointer z-10 bg-[#1A293D]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p
                      onClick={() => handleFilterChange("all")}
                      className="text-white text-[11px] mt-2 cursor-pointer hover:bg-[#294161] hover:rounded-md p-2"
                    >
                      All
                    </p>
                    <p
                      onClick={() => handleFilterChange("active")}
                      className="text-white text-[11px] mt-2 cursor-pointer hover:bg-[#294161] hover:rounded-md p-2"
                    >
                      Active
                    </p>
                    <p
                      onClick={() => handleFilterChange("inactive")}
                      className="text-white text-[11px] mt-2 cursor-pointer hover:bg-[#294161] hover:rounded-md p-2"
                    >
                      Inactive
                    </p>
                  </div>
                )}
              </div>
              <div className="text-end mx-4">Actions</div>
            </div>

            {renderNoData() ||
              ownerData?.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_1fr_2fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 p-3 text-[11px] border-b-2 border-[#FFFFFF24] text-white"
                >
                  <div>{item?.name || "N/A"}</div>
                  <div>{item?.totalUser || 0}</div>
                  <div>{item?.email || "N/A"}</div>
                  <div>{item?.phoneNumber || "N/A"}</div>
                  <div>{moment(item?.createdAt)?.format("MM-DD-YYYY")}</div>
                  {item?.isSubscribed === true && (
                    <button className="bg-[#199BD1] w-[51px] h-[23px] rounded-full text-white text-[11px]">
                      Active
                    </button>
                  )}
                  {item?.isSubscribed === false && (
                    <button className="bg-[#9A9A9A] w-[59px] h-[23px] rounded-full text-white text-[11px]">
                      Inactive
                    </button>
                  )}
                  <Link
                    to={`/detailowner/${item?._id}`}
                    className="underline text-white hover:text-white text-end"
                  >
                    View Details
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
        <button
          className="bg-[#199BD1] w-[235px] h-[54px] rounded-[8px] text-white"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default OwnerList;
