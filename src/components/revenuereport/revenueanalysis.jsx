import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../inputs/SearchInput";
import { Calender, OwnerProfile } from "../../assets/export";
import OwnerList from "../dasboard/OwnerList";
import DateModal from "../global/DateModal";
import axios from "../../axios";
import Pagination from "../paginations/Pagination";
import Skeleton from "../global/Skeleton";
import moment from "moment";
const RevenueAnalysis = () => {
  const [tab, setTabs] = useState("1");
  const [calendarOpen, setCalenderOpen] = useState(false);
  const [dueDate, setDueDate] = useState("");

  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);
  const [revenueTableData, setRevenueTableData] = useState([]);
  const [pageDetails, setPageDetails] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [loadingDownload, setloadingDownload] = useState(false);
  const [pageDisable, setPageDisable] = useState(false);

  const getRevenueTableData = async () => {
    try {
      setLoading(true);
      setPageDisable(true);
      let url = `/admin/revenue/subscription/details?page=${currentPage}&pageSize=12`;
      if (tab === "2") {
        url = `/admin/revenue/subscription/details?isSingleUser=false&page=${currentPage}&pageSize=12`;
      } else if (tab === "3") {
        url = `/admin/revenue/subscription/details?isSingleUser=true&page=${currentPage}&pageSize=12`;
      }

      if (dueDate?.calendar) {
        url += `&startDate=${dueDate?.calendar}&endDate=${dueDate?.calendar}`;
      }
      if (searchValue) {
        url += `&search=${encodeURIComponent(searchValue)}`;
      }

      const { data } = await axios.get(url);

      setRevenueTableData(data?.data?.data || []);
      setTotalPages(data?.data?.paginationDetails?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    } finally {
      setPageDisable(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRevenueTableData();
  }, [tab, currentPage]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCurrentPage(1);
      getRevenueTableData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchValue, dueDate]);

  useEffect(() => {
    setCurrentPage(1);
    setDueDate("");
  }, [tab]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    console.log("Search Value:", e.target.value);
  };

  const handleDownload = async () => {
    setloadingDownload(true);
    try {
      const response = await axios.get(
        "/admin/revenue/subscription/details/csv"
      );

      if (response?.status === 200) {
        const result = response?.data;
        if (result?.success && result?.data) {
          const downloadUrl = result?.data.file;
          const filename = downloadUrl.split("/")[0];
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error("Failed to fetch download link:", response?.message);
        }
      }
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    } finally {
      setloadingDownload(false);
    }
  };

  // const generateYears = (startYear) => {
  //   const currentYear = new Date().getFullYear();
  //   const years = [];
  //   for (let i = startYear; i <= currentYear; i++) {
  //     years.push(i);
  //   }
  //   return years;
  // };

  // useEffect(() => {
  //   const years = generateYears(2000);
  //   setAllYears(years);
  // }, []);

  return (
    <div className="">
      <div className="card bg-[#001229] p-5 rounded-[20px] h-[820px] overflow-y-auto  scrollbar-thin ">
        <div className="flex justify-between mt-2 ">
          <h3 className="text-[18px] font-[700]">Revenue Analysis</h3>
        </div>
        <div>
          <div>
            <SearchInput
              placeholder="Search here"
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
              className={`w-[86px] h-[35px] rounded-full text-[11px] font-semibold ${
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
                className={`flex items-center justify-center rounded-[100px] gap-2 h-[27px] w-[120px] ${
                  dueDate
                    ? "bg-[#199BD1] text-white"
                    : "bg-[#199BD126] text-[#199BD1]"
                }`}
                onClick={() => setCalenderOpen(true)}
              >
                <img
                  className="w-[12px] h-[13.33px]"
                  src={Calender}
                  alt="calendar"
                />
                <span className="text-[12px] font-[500]">
                  {dueDate.unix
                    ? moment.unix(dueDate.unix).local().format("MM-DD-YYYY")
                    : "Select date"}
                </span>
                {dueDate && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDueDate("");
                      getRevenueTableData();
                    }}
                    className=" bg-red-500 rounded-full p-[2px] h-[20px] w-[20px] text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </button>

              <DateModal
                isOpen={calendarOpen}
                setIsOpen={setCalenderOpen}
                setDueDate={setDueDate}
                setInputError={setInputError}
                minDate={new Date(2024, 0, 4)}
                // maxDate={new Date(2025, 0, 4)}
              />

              <div>
                <button
                  className="bg-[#199BD1] flex items-center justify-center text-center w-[95px] h-[32px] rounded-[100px] text-[12px] text-white"
                  onClick={handleDownload}
                >
                  {loadingDownload ? (
                    <div className="animate-spin flex items-center justify-center text-center rounded-full border-t-2 border-white w-4 h-4"></div> // Spinner styling
                  ) : (
                    <div>Download</div>
                  )}
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
              <div>Total Cost of Users</div>
              <div>Total Revenue</div>
            </div>

            <div>
              {loading ? (
                <Skeleton />
              ) : revenueTableData?.length === 0 ? (
                <p>No data available.</p>
              ) : (
                revenueTableData?.map((item, index) => (
                  <Link
                    key={index}
                    to={
                      item?.isSingleUser
                        ? `/detailuser/${item?._id}`
                        : `/detailowner/${item?._id}`
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className={`grid grid-cols-8 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2 text-white`}
                    >
                      <div>{moment(item?.createdAt)?.format("MM-DD-YYYY")}</div>
                      <div>{item?.name || "N/A"}</div>
                      <div>{item?.totalUser || 0}</div>
                      <div>{item?.subscriptionPlan?.name || "N/A"}</div>
                      <div>
                        ${parseFloat(item?.subscriptionPrice)?.toFixed(2) || 0}
                      </div>
                      <div>
                        ${parseFloat(item?.perUserPrice)?.toFixed(2) || 0}
                      </div>
                      <div>
                        ${parseFloat(item?.totalUserCost)?.toFixed(2) || 0}
                      </div>
                      <div>
                        ${parseFloat(item?.totallRevenue)?.toFixed(2) || 0}
                      </div>
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
            ) : revenueTableData?.length === 0 ? (
              <p>No data available.</p>
            ) : (
              revenueTableData?.map((item, index) => (
                <Link
                  key={index}
                  to={`/detailowner/${item?._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className={`grid grid-cols-7 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2 text-white`}
                  >
                    <div>{moment(item?.createdAt)?.format("MM-DD-YYYY")}</div>
                    <div>{item?.name || "N/A"}</div>
                    <div>{item?.totalUser || "N/A"}</div>
                    <div>{item?.subscriptionPlan?.name || "N/A"}</div>
                    <div>
                      {parseFloat(item?.subscriptionPrice)?.toFixed(2) || "N/A"}
                    </div>
                    <div>
                      {parseFloat(item?.perUserPrice)?.toFixed(2) || "N/A"}
                    </div>
                    <div>
                      {parseFloat(item?.totallRevenue)?.toFixed(2) || "N/A"}
                    </div>
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
              <div className="animate-pulse">
                <div className="h-4 bg-gray-500 mt-3 mb-6 rounded"></div>
                <div className="h-4 bg-gray-500 mb-6 rounded"></div>
                <div className="h-4 bg-gray-500 mb-6 rounded"></div>
                <div className="h-4 bg-gray-500 mb-6 rounded"></div>
                <div className="h-4 bg-gray-500 mb-6 rounded"></div>
              </div>
            ) : revenueTableData?.length === 0 ? (
              <p>No data available.</p>
            ) : (
              revenueTableData?.map((item, index) => (
                <Link
                  key={index}
                  to={`/detailuser/${item?._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className={`grid grid-cols-5 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2 text-white`}
                  >
                    <div>{moment(item?.createdAt)?.format("MM-DD-YYYY")}</div>
                    <div>{item?.name || "N/A"}</div>
                    <div>{item?.subscriptionPlan?.name || "N/A"}</div>
                    <div>
                      {parseFloat(item?.subscriptionPrice)?.toFixed(2) || "N/A"}
                    </div>
                    <div>
                      {parseFloat(item?.totallRevenue)?.toFixed(2) || "N/A"}
                    </div>
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
        pageDisable={pageDisable}
      />
    </div>
  );
};

export default RevenueAnalysis;
