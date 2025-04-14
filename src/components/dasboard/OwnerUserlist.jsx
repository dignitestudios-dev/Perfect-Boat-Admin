import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../inputs/SearchInput";
import moment from "moment";

const OwnerUserlist = () => {
  const location = useLocation();
  const ownerDetail = location?.state || {};
  const [searchValue, setSearchValue] = useState("");

  const [tab, setTabs] = useState("1");
  const navigate = useNavigate();
  const filteredManagers = ownerDetail?.user?.manager?.filter((manager) => {
    if (!searchValue) return true;
    const searchText = searchValue.toLowerCase();
    return (
      manager?.name?.toLowerCase()?.includes(searchText) ||
      manager?.jobtitle?.toLowerCase()?.includes(searchText)
    );
  });
  const filteredEmployee = ownerDetail?.user?.employee?.filter((manager) => {
    if (!searchValue) return true;
    const searchText = searchValue.toLowerCase();
    return (
      manager?.name?.toLowerCase()?.includes(searchText) ||
      manager?.jobtitle?.toLowerCase()?.includes(searchText)
    );
  });

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="">
      <div className="card bg-[#001229] p-5 rounded-[20px] h-[944px] overflow-y-auto  scrollbar-thin ">
        <div className="flex justify-between mt-2">
          <h3 className="text-[18px] font-[700]">Users</h3>
        </div>
        <div>
          <SearchInput
            placeholder="Search by name or email"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex gap-x-2 mt-4">
          <button
            onClick={() => setTabs("1")}
            className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
              tab === "1"
                ? "bg-[#199BD1] text-white"
                : "bg-[#042742] text-[#199BD1]"
            }`}
          >
            Managers
          </button>
          <button
            onClick={() => setTabs("2")}
            className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
              tab === "2"
                ? "bg-[#199BD1] text-white"
                : "bg-[#042742] text-[#199BD1]"
            }`}
          >
            Employee
          </button>
        </div>
        {tab === "1" && (
          <div className="grid gap-4">
            <div className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-4 p-4 text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Name</div>
              <div>Job Title</div>
              <div>Location</div>
              <div>Email</div>
              <div>Phone Number</div>
              <div>Onboarding Date</div>
            </div>
            {filteredManagers?.length === 0 ? (
              <div className="text-center font-bold h-screen items-center flex justify-center text-[20px]">
                Data Not Found
              </div>
            ) : (
              filteredManagers?.map((item, index, array) => (
                <div
                  key={index}
                  className={`grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-4 p-3 text-[11px] border-b-2 border-[#FFFFFF24] text-white ${
                    index === array.length - 1 ? "rounded-b-lg" : ""
                  }`}
                >
                  <div className="font-medium">{item?.name}</div>
                  <div>{item?.jobtitle}</div>
                  <div>{item?.location}</div>
                  <div>{item?.email}</div>
                  <div>{item?.phoneNumber || "Not Found"}</div>
                  <div>{moment(item?.createdAt)?.format("MM-DD-YYYY")}</div>
                </div>
              ))
            )}
          </div>
        )}
        {tab === "2" && (
          <div className="grid gap-4">
            <div className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Name</div>
              <div>Job Title</div>
              <div>Location</div>
              <div>Email</div>
              <div>Phone Number</div>
              <div>Onboarding Date</div>
            </div>
            {filteredEmployee?.length === 0 ? (
              <div className="text-center font-bold h-screen items-center flex justify-center text-[20px]">
                Data Not Found
              </div>
            ) : (
              filteredEmployee?.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2  text-white "
                >
                  <div className="font-medium">{item?.name}</div>
                  <div className="">{item?.jobtitle}</div>
                  <div className="">{item?.location}</div>
                  <div className="">{item?.email}</div>
                  <div className="">{item?.phoneNumber}</div>
                  <div className="">
                    {moment(item?.createdAt)?.format("MM-DD-YYYY")}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-4" onClick={() => navigate(-1)}>
        <button className="bg-[#199BD1] w-[235px] h-[54px] rounded-[8px] text-white">
          Back
        </button>
      </div>
    </div>
  );
};

export default OwnerUserlist;
