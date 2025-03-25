import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DateModal from "../global/DateModal";
import { Calender } from "../../assets/export";
import moment from "moment";

const SubscriptionList = () => {
  const [tab, setTabs] = useState("1");
  const [calendarOpen, setCalenderOpen] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [inputError, setInputError] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  const ownerDetail = location?.state || {};

  const filteredData = ownerDetail?.subscription?.user?.filter((user) => {
    const userCreatedAt = new Date(user?.createdAt).toISOString().slice(0, 10);

    return !dueDate || userCreatedAt === dueDate?.normal;
  });

  useEffect(() => {}, [dueDate]);

  const totalPriceowner = ownerDetail?.subscription?.owner?.reduce(
    (sum, user) => {
      return sum + (user?.price || 0);
    },
    0
  );
  const totalPriceuser = ownerDetail?.subscription?.user?.reduce(
    (sum, user) => {
      return sum + (user?.price || 0);
    },
    0
  );

  return (
    <div className="">
      <div className="card bg-[#001229] p-5 rounded-[20px] h-[944px] overflow-y-auto  scrollbar-thin ">
        <div className="flex justify-between mt-2">
          <h3 className="text-[18px] font-[700]">Subscription History</h3>
          {tab === "1" && (
            <div className="pr-2">
              <h5 className="text-[13px] text-[#199BD1] font-[500] content-end">
                Total Revenue
              </h5>

              <h3 className="text-[26px] font-[500]">
                ${parseFloat(totalPriceowner).toFixed(1)}
              </h3>
            </div>
          )}
          {tab === "2" && (
            <div className="flex justify-center items-center">
              <h5 className="text-[13px] text-[#199BD1] font-[500] content-end pr-1 pt-2">
                Total Revenue
              </h5>
              <h3 className="text-[26px] font-[500]">
                ${parseFloat(totalPriceuser).toFixed(2)}
              </h3>
            </div>
          )}
        </div>

        <div className="flex gap-x-2 justify-between mt-4">
          <div className="flex gap-x-2">
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
          {tab === "2" && (
            <div>
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
                      // getRevenueTableData();
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
              />
            </div>
          )}
        </div>
        {tab === "1" && (
          <div className="grid gap-4 ">
            <div className="grid grid-cols-3  gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Paid On</div>
              <div className="text-center">License Fee</div>
              <div className="text-end">Renewal Date</div>
            </div>
            {ownerDetail?.subscription?.owner?.length === 0 ? (
              <div className="text-center h-10 font-bold">Data Not Found</div>
            ) : (
              ownerDetail?.subscription?.owner?.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2  text-white "
                >
                  <div className="font-medium">
                    {" "}
                    {new Date(item?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </div>
                  <div className="text-center">{item?.price}</div>
                  <div className="text-end">
                    {new Date(item?.updatedAt).toLocaleDateString("en-US", {
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
            <div className="grid grid-cols-4 gap-4 p-4 text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
              <div>Date</div>
              <div>Users Onboard</div>
              <div className="text-center">Per User Cost</div>
              <div className="text-end">Total Cost of Users</div>
            </div>
            {filteredData.length === 0 ? (
              <div className="text-center h-10 font-bold">Data Not Found</div>
            ) : (
              filteredData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2 text-white"
                >
                  <div className="font-medium">
                    {new Date(item?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </div>
                  <div>{item?.totalluser || "Not Found"}</div>
                  <div className="text-center">
                    {item?.perUserCost || "Not Found"}
                  </div>
                  <div className="text-end">{item?.price || "Not Found"}</div>
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

export default SubscriptionList;
