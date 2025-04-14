import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../inputs/SearchInput";
import Skeleton from "../global/Skeleton";
import moment from "moment";

const OwnerSubscriptionTable = ({ ownerDetail, loading }) => {
  const [tab, setTabs] = useState("1");
  const navigate = useNavigate();
  const handleViewAllClick = () => {
    navigate("/subscriptionlist", { state: ownerDetail });
  };

  return (
    <div className="">
      <div className="card bg-[#001229] overflow-y-auto h-[477px] p-5 rounded-[20px] ">
        <div className="flex justify-between mt-2">
          <h3 className="text-[18px] font-[700]">Subscription History </h3>
          <button
            onClick={handleViewAllClick}
            className="text-[#199BD1] bg-[#042742] w-[107px] h-[32px] text-center text-[11px] font-[700] flex justify-center rounded-[10px] items-center"
          >
            View all
          </button>
        </div>

        <div className="flex gap-x-2 mt-3">
          <button
            onClick={() => setTabs("1")}
            className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
              tab === "1"
                ? "bg-[#199BD1] text-white"
                : "bg-[#042742] text-[#199BD1]"
            }`}
          >
            Owner
          </button>
          <button
            onClick={() => setTabs("2")}
            className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
              tab === "2"
                ? "bg-[#199BD1] text-white"
                : "bg-[#042742] text-[#199BD1]"
            }`}
          >
            User
          </button>
        </div>
        {tab === "1" && (
          <div className="grid gap-4">
            <div className="grid grid-cols-[2fr_2fr_1fr]  gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Paid On</div>
              <div>License Fee</div>
              <div>Renewal Date</div>
            </div>
            {loading ? (
              <Skeleton />
            ) : ownerDetail?.subscription?.owner?.length === 0 ? (
              <div className="text-center h-10 font-bold">Data Not Found</div>
            ) : (
              ownerDetail?.subscription?.owner
                ?.slice(0, 4)
                ?.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[2fr_2fr_1fr]  gap-4 p-2 text-[11px] border-[#FFFFFF24] border-b-2  text-white "
                  >
                    <div className="font-medium">
                      {moment(item?.createdAt)?.format("MM-DD-YYYY")}
                    </div>
                    <div className="">{item?.price}</div>
                    <div className="">
                      {moment(item?.updatedAt)?.format("MM-DD-YYYY")}
                    </div>
                  </div>
                ))
            )}
          </div>
        )}
        {tab === "2" && (
          <div className="grid gap-4">
            <div className="grid grid-cols-[2fr_2fr_2fr_2fr] gap-4 p-3  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Paid On</div>
              <div>Users Onboard</div>
              <div>Per User Cost</div>
              <div>Total Cost of Users</div>
            </div>
            {loading ? (
              <Skeleton />
            ) : ownerDetail?.subscription?.user?.length === 0 ? (
              <div className="text-center h-10 font-bold">Data Not Found</div>
            ) : (
              ownerDetail?.subscription?.user
                ?.slice(0, 4)
                ?.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[2fr_2fr_2fr_2fr] gap-4 p-2 text-[11px] border-[#FFFFFF24] border-b-2  text-white "
                  >
                    <div className="font-medium">
                      {new Date(item?.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </div>
                    <div className="">{item?.totalluser || "Not Found"}</div>

                    <div className="">
                      {" "}
                      $
                      {parseFloat(item?.totalluser * item?.perUserCost).toFixed(
                        2
                      ) || "Not Found"}
                    </div>
                    <div>${parseFloat(item?.price).toFixed(2)}</div>
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerSubscriptionTable;
