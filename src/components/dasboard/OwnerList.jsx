import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import OwnerCard from "./OwnerCard";
import { FiSearch } from "react-icons/fi";
import axios from "../../axios";
import Skeleton from "../global/Skeleton";
import Pagination from "../../components/paginations/Pagination";
const OwnerList = () => {
  const [dropdownStates, setDropdownStates] = useState({});
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [ownerData, setOwnerData] = useState([]);
  const [pageDetails, setPageDetails] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  console.log(pageDetails, "pageDetails");
  const navigate = useNavigate();
  const toggleDropdown = (id) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const filteredUsers = ownerData?.filter((user) => {
    if (filterStatus === "active") return user.isSubscribed === true;
    if (filterStatus === "inactive") return user.isSubscribed === false;
    return true;
  });

  const getOwnerTableData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/admin/customer?isSingleUser=false&page=${currentPage}&pageSize=12`
      );

      setOwnerData(data?.data?.data);
      setPageDetails(data?.data?.paginationDetails || []);
      setTotalPages(data?.data?.paginationDetails?.totalPages);
    } catch (error) {
      console.error("Error fetching owner data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOwnerTableData();
  }, [currentPage]);
  return (
    <>
      <div className="p-5 bg-[#001229] rounded-[20px] h-[944px] overflow-y-auto  scrollbar-thin">
        <div className="">
          <div className="flex justify-between mb-4">
            <div>
              <h3 className="text-[18px] font-[700] mb-3">Owners List</h3>
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
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-[1fr_1fr_2fr_1.5fr_1.5fr_1fr_0.5fr]  gap-4 p-4 text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Owner Name</div>
              <div>Total No. of Users</div>
              <div>Email</div>
              <div>Phone Number</div>
              <div>Onboarding Date</div>
              <div className="text-center  relative">
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

              <div className="text-end">Actions</div>
            </div>
            {loading ? (
              <div>
                <Skeleton />
              </div>
            ) : (
              filteredUsers?.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_1fr_2fr_1.5fr_1.5fr_1fr_0.5fr]  gap-4 p-3 text-[11px] border-b-2 border-[#FFFFFF24] text-white"
                >
                  {console.log(item?.id, "Itemidd")}
                  <div className="font-medium">{item?.name}</div>
                  <div>{item?.totalUser}</div>
                  <div>{item?.email}</div>
                  <div>{item?.phoneNumber}</div>
                  <div>
                    {" "}
                    {new Date(item?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </div>
                  {item?.isSubscribed === true && (
                    <button className="bg-[#199BD1] w-[51px] h-[23px] rounded-full text-white text-[11px]">
                      Active
                    </button>
                  )}
                  {item?.isSubscribed === false && (
                    <button className="bg-[#9A9A9A] w-[59px] h-[23px] rounded-full text-white text-[11px]">
                      inactive
                    </button>
                  )}
                  <Link
                    to={`/detailowner/${item?._id}`}
                    className="underline text-white hover:text-white text-end"
                  >
                    View Details
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
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
    </>
  );
};

export default OwnerList;
