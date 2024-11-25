import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../inputs/SearchInput";
import { Calender, OwnerProfile } from "../../assets/export";
import OwnerList from "../dasboard/OwnerList";
import DateModal from "../global/DateModal";
import axios from "../../axios";
import Pagination from "../paginations/Pagination";
import Skeleton from "../global/Skeleton";
const RevenueAnalysis = () => {
  const [tab, setTabs] = useState("1");
  const [calendarOpen, setCalenderOpen] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [inputError, setInputError] = useState("");
  console.log(dueDate, "setDueDate");
  const [loading, setLoading] = useState(false);
  const [revenueTableData, setRevenueTableData] = useState([]);
  const [pageDetails, setPageDetails] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const getRevenueTableData = async () => {
    try {
      setLoading(true);

      let url = `/admin/revenue/subscription/details?page=${currentPage}&pageSize=12`;
      if (tab === "2") {
        url = `/admin/revenue/subscription/details?isSingleUser=false&page=${currentPage}&pageSize=12`;
      } else if (tab === "3") {
        url = `/admin/revenue/subscription/details?isSingleUser=true&page=${currentPage}&pageSize=12`;
      }
      if (searchValue) {
        url += `&search=${encodeURIComponent(searchValue)}`;
      }
      const { data } = await axios.get(url);

      setRevenueTableData(data?.data?.data || []);
      setPageDetails(data?.data?.paginationDetails || []);
      setTotalPages(data?.data?.paginationDetails?.totalPages);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRevenueData = revenueTableData.filter((item) => {
    if (!searchValue) return true;
    const searchText = searchValue.toLowerCase();
    return (
      item?.name?.toLowerCase().includes(searchText) ||
      item?.email?.toLowerCase().includes(searchText) ||
      item?.subscriptionId?.toLowerCase().includes(searchText)
    );
  });


  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getRevenueTableData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchValue, filteredRevenueData,tab, currentPage]);
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    console.log("Search Value:", e.target.value);
  };
  return (
    <div className="">
      <div className="card bg-[#001229] p-5 rounded-[20px] h-[820px] overflow-y-auto  scrollbar-thin ">
        <div className="flex justify-between mt-2 ">
          <h3 className="text-[18px] font-[700]">Revenue Analysis</h3>
        </div>
        <div>
          <div>
            <SearchInput
              placeholder="Search by Customer"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="flex gap-x-2 mt-4 items-center justify-between">
          <div className="flex gap-3">
            <button
              onClick={() => setTabs("1")}
              className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
                tab === "1"
                  ? "bg-[#199BD1] text-white"
                  : "bg-[#042742] text-[#199BD1]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setTabs("2")}
              className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
                tab === "2"
                  ? "bg-[#199BD1] text-white"
                  : "bg-[#042742] text-[#199BD1]"
              }`}
            >
              Owners
            </button>
            <button
              onClick={() => setTabs("3")}
              className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
                tab === "3"
                  ? "bg-[#199BD1] text-white"
                  : "bg-[#042742] text-[#199BD1]"
              }`}
            >
              Single Users
            </button>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <button
                className="flex items-center justify-center rounded-[100px] gap-2 bg-[#199BD126] h-[27px] w-[99px] "
                onClick={() => setCalenderOpen(true)}
              >
                <img className="w-[12px] h-[13.33px]" src={Calender} alt="" />
                <span className="text-[12px] font-[500] text-[#199BD1] ">
                  Select date
                </span>
              </button>
              <DateModal
                isOpen={calendarOpen}
                setIsOpen={setCalenderOpen}
                setDueDate={setDueDate}
                setInputError={setInputError}
              />
              <div>
                <button className="bg-[#199BD1] w-[95px] h-[32px] rounded-[100px] text-[12px]">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
        {tab === "1" && (
          <div className="grid gap-4">
            <div className="grid grid-cols-8 gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Onboarding Date</div>
              <div>Customers</div>
              <div>Total No. of Users</div>
              <div>Subscription Plan</div>
              <div>Subscription Fee</div>
              <div>Per User Cost</div>
              <div>Total Cost of users</div>
              <div>Total Revenue</div>
            </div>

            <div>
              {loading ? (
                <Skeleton />
              ) : filteredRevenueData?.length === 0 ? (
                <p>No data available.</p>
              ) : (
                filteredRevenueData?.map((item, index) => (
                  <Link key={index} to="#" style={{ textDecoration: "none" }}>
                    <div
                      className={`grid grid-cols-8 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2 text-white`}
                    >
                      <div>
                        {new Date(item?.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </div>
                      <div>{item?.name || "N/A"}</div>
                      <div>{item?.totalUser || "N/A"}</div>
                      <div>{item?.subscriptionPlan?.name || "N/A"}</div>
                      <div>{item?.subscriptionPrice || "N/A"}</div>
                      <div>{item?.perUserPrice || "N/A"}</div>
                      <div>{item?.perUserPrice || "N/A"}</div>
                      <div>{item?.totallRevenue || "N/A"}</div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
        {tab === "2" && (
          <div className="grid gap-4">
            <div className="grid grid-cols-7 gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Onboarding Date</div>
              <div>Customers</div>
              <div>Total No. of Users</div>
              <div>Subscription Plan</div>
              <div>Subscription Fee</div>
              <div>Per User Cost</div>
              <div>Total Revenue</div>
            </div>
            {loading ? (
              <Skeleton />
            ) : filteredRevenueData?.length === 0 ? (
              <p>No data available.</p>
            ) : (
              filteredRevenueData?.map((item, index) => (
                <Link key={index} to="#" style={{ textDecoration: "none" }}>
                  <div
                    className={`grid grid-cols-7 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2 text-white`}
                  >
                    <div>
                      {new Date(item?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </div>
                    <div>{item?.name || "N/A"}</div>
                    <div>{item?.totalUser || "N/A"}</div>
                    <div>{item?.subscriptionPlan?.name || "N/A"}</div>
                    <div>{item?.subscriptionPrice || "N/A"}</div>
                    <div>{item?.perUserPrice || "N/A"}</div>
                    <div>{item?.totallRevenue || "N/A"}</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
        {tab === "3" && (
          <div className="grid gap-4">
            <div className="grid grid-cols-5 gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Onboarding Date</div>
              <div>Customers</div>
              <div>Subscription Plan</div>
              <div>Subscription Fee</div>
              <div>Revenue</div>
            </div>
            {loading ? (
              <div class="animate-pulse">
                <div class="h-4 bg-gray-500 mt-3 mb-6 rounded"></div>
                <div class="h-4 bg-gray-500 mb-6 rounded"></div>
                <div class="h-4 bg-gray-500 mb-6 rounded"></div>
                <div class="h-4 bg-gray-500 mb-6 rounded"></div>
                <div class="h-4 bg-gray-500 mb-6 rounded"></div>
              </div>
            ) : filteredRevenueData?.length === 0 ? (
              <p>No data available.</p>
            ) : (
              filteredRevenueData?.map((item, index) => (
                <Link key={index} to="#" style={{ textDecoration: "none" }}>
                  <div
                    className={`grid grid-cols-5 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2 text-white`}
                  >
                    <div>
                      {new Date(item?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </div>
                    <div>{item?.name || "N/A"}</div>
                    <div>{item?.subscriptionPlan?.name || "N/A"}</div>
                    <div>{item?.subscriptionPrice || "N/A"}</div>
                    <div>{item?.totallRevenue || "N/A"}</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
      />
    </div>
  );
};

export default RevenueAnalysis;
