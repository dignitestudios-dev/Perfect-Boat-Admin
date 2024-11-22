import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../inputs/SearchInput";
import Skeleton from "../global/Skeleton";

const OwnerUserTables = ({ ownerDetail, loading }) => {
  const navigate = useNavigate();
  const [tab, setTabs] = useState("1");

  const handleViewAllClick = () => {
    navigate("/owneruserlist", { state: ownerDetail });
  };
  return (
    <div className="">
      <div className="card bg-[#001229] overflow-y-auto  h-[447px] p-5 rounded-[20px] ">
        <div className="flex justify-between mt-2">
          <h3 className="text-[18px] font-[700]">Users</h3>
          <button
            onClick={handleViewAllClick}
            className="text-[#199BD1] bg-[#042742] w-[107px] h-[32px] text-center text-[11px] font-[700] flex justify-center rounded-[10px] items-center"
          >
            View all
          </button>
        </div>
        <div>
          <SearchInput />
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
            <div className="grid grid-cols-[2fr_2fr_1fr] gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Name</div>
              <div>Job Title</div>
              <div>Onboarding Date</div>
            </div>
            {loading ? (
              <Skeleton />
            ) : ownerDetail?.user?.manager?.length === 0 ? (
              <div>Data not Found</div>
            ) : (
              ownerDetail?.user?.manager?.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[2fr_2fr_1fr] gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2 text-white"
                >
                  <div className="truncate">{item?.name || "Not Found"}</div>
                  <div className="truncate">
                    {item?.jobtitle || "Not Found"}
                  </div>
                  <div>
                    {new Date(item?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {tab === "2" && (
          <div className="grid gap-4">
            <div className="grid grid-cols-[2fr_2fr_1fr] gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Name</div>
              <div>Job Title</div>
              <div>Onboarding Date</div>
            </div>
            {loading ? (
              <Skeleton />
            ) : ownerDetail?.user?.employee?.length === 0 ? (
              <div className="text-center h-10 font-bold">Data Not Found</div>
            ) : (
              ownerDetail?.user?.employee?.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[2fr_2fr_1fr] gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2  text-white "
                >
                  <div className="truncate">{item?.name || "Not Found"}</div>
                  <div className="truncate">
                    {item?.jobtitle || "Not Found"}
                  </div>
                  <div className="">
                    {new Date(item?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerUserTables;
