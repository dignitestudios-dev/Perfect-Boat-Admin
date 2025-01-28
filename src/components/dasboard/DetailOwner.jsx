import React, { useEffect, useState } from "react";
import {
  BoatIcon,
  BookIcon,
  CoinIcon,
  OwnerProfile,
  User_icon2,
  UserIcon,
} from "../../assets/export";
import OwnerUserTables from "./OwnerUserTables";
import OwnerSubscriptionTable from "./OwnerSubscriptionTable";
import AuthInput from "../onboarding/AuthInput";
import { Link, useParams } from "react-router-dom";
import axios from "../../axios";
import { ErrorToast } from "../Toaster/Toaster";
import Dropdown from "../dropdown/Dropdown";
import OwnerDetailLineChart from "./OwnerDetailChart";
import moment from "moment";
const DetailOwner = () => {
  const { id } = useParams();

  const [ownerDetail, setOwnerDetail] = useState();
  const [loading, setLoading] = useState(false);

  const getDashboardData = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`/admin/customer/${id}`);

      if (data?.success) {
        setOwnerDetail(data?.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      ErrorToast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const cardData = [
    {
      icon: UserIcon,
      number: ownerDetail?.dashboard?.totallEmployee,
      label: "Managers",
    },
    {
      icon: User_icon2,
      number: ownerDetail?.dashboard?.totallManager,
      label: "Employees",
    },
    {
      icon: CoinIcon,
      number: ownerDetail?.dashboard?.totallRevenue,
      label: "Total Revenue",
      sing: "$",
    },
  ];
  const [timerange, setTimerange] = useState("Yearly");
  const handleSaleTimePeriodChange = (value) => {
    setTimerange(value);
    console.log("Selected Time Range:", value);
  };
  useEffect(() => {
    getDashboardData();
  }, []);
  const formatNameWithSpaces = (name) => {
    if (!name) return "Not Found";
    return name?.replace(/([A-Z])/g, " $1").trim();
  };
  console.log(
    ownerDetail?.customer?.subscriptionPlan?.expireOn,
    "ownerDetail?.subscription?.owner?.subscriptionPlan.name"
  );
  const getUnixDate = (date) => {
    if (date && moment(date).isValid()) {
      // Convert Unix timestamp to local time and format it
      return moment.unix(date).local().format("MM-DD-YYYY");
    }
    return undefined;
  };
  return (
    <div>
      <div className="flex flex-wrap lg:justify-start gap-3">
        {cardData?.map((card, index) => (
          <div
            key={index}
            className="card bg-[#001229] p-2 rounded-[24px] w-full sm:w-[214px] lg:w-[214px]"
          >
            <div className="flex gap-3 items-center">
              <div className="bg-[#1A293D] p-5 rounded-[18px]">
                <img
                  src={card?.icon}
                  className="w-[41px] h-[41px]"
                  alt={`${card.label} icon`}
                />
              </div>
              <div>
                <h3 className="text-[18px] font-[700]">
                  {card?.sing} {card?.number}
                </h3>

                <h3 className="text-[14px] text-[#FFFFFF80] leading-[18.9px]">
                  {card?.label}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card bg-[#001229] p-5 rounded-[24px] w-full mt-12">
        <div className="flex items-center pb-5 justify-between">
          <h4 className="text-[14px] text-white font-[700] leading-[18.9px]">
            Sales Overview
          </h4>
          <Dropdown
            label="Yearly"
            items={["Weekly", "Monthly", "Yearly"]}
            handleTimePeriod={(value) => handleSaleTimePeriodChange(value)}
            selectedValue={timerange}
          />
        </div>
        <div className="flex gap-3">
          <div className="h-[15px] w-[15px] bg-[#FB7B2C] rounded"></div>
          <span className="text-[12px]">License Fee</span>
          <div className="h-[15px] w-[15px] bg-[#199BD1] rounded"></div>
          <span className="text-[12px]">Per Employee Fee ($10 PE)</span>
        </div>
        <div className="relative w-full h-full">
          <OwnerDetailLineChart timerange={timerange} id={id} />
        </div>
      </div>

      <div className="card bg-[#001229] p-10 rounded-[16px] mt-4  ">
        <div className="flex items-center gap-4">
          {/* <img
            src={
              ownerDetail?.customer?.profilePicture ||
              "https://placehold.co/400"
            }
            className="w-[80px] h-[80px] rounded-full"
            alt=""
          /> */}
          <div className="text-[24px] font-[700]">
            {formatNameWithSpaces(ownerDetail?.customer?.name)}
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2 sm:grid-cols-1 mt-5">
          {loading ? (
            <>
              {[...Array(6)].map((_, index) => (
                <div key={index} className="mt-4">
                  <div className="h-10 bg-gray-600 rounded"></div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="mt-4">
                <AuthInput
                  text="Name"
                  type="text"
                  value={ownerDetail?.customer?.name || "Not Found"}
                  isDisabled={true}
                />
              </div>
              <div className="mt-4">
                <AuthInput
                  text="Email"
                  type="email"
                  value={ownerDetail?.customer?.email || "Not Found"}
                  isDisabled={true}
                />
              </div>
              <div className="mt-4">
                <AuthInput
                  text="Username"
                  placeholder="mikesmith"
                  type="text"
                  value={ownerDetail?.customer?.name || "Not Found"}
                  isDisabled={true}
                />
              </div>
              <div className="mt-4">
                <AuthInput
                  text="Phone Number"
                  type="text"
                  value={ownerDetail?.customer?.phoneNumber || "Not Found"}
                  isDisabled={true}
                />
              </div>
              <div className="mt-4">
                <AuthInput
                  text="Location"
                  type="text"
                  value={ownerDetail?.customer?.location || "Not Found"}
                  isDisabled={true}
                />
              </div>
              <div className="mt-4">
                <AuthInput
                  text="Onboarding Date"
                  type="text"
                  value={
                    ownerDetail?.customer?.createdAt
                      ? new Date(
                          ownerDetail?.customer?.createdAt
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                      : "Not Found"
                  }
                  isDisabled={true}
                />
              </div>
              <div className="mt-4">
                <AuthInput
                  text="Subscription"
                  type="text"
                  value={
                    ownerDetail?.customer?.subscriptionPlan?.name ||
                    "No Subscription"
                  }
                  isDisabled={true}
                />
                <div
                  className={`relative left-[366px] text-[13px] font-[500] bottom-[36px] cursor-pointer ${
                    ownerDetail?.customer?.isSubscribed === true
                      ? "text-[#199BD1]"
                      : " text-white"
                  }`}
                >
                  {ownerDetail?.customer?.isSubscribed === true
                    ? "Active"
                    : "Inactive"}
                </div>
                {ownerDetail?.customer?.isSubscribed ? (
                  <div className="text-[#FD0404] text-[13px] font-[500]">
                    Expires on:{" "}
                    {moment
                      .unix(ownerDetail?.customer?.subscriptionPlan?.expireOn)
                      .local()
                      .format("MM-DD-YYYY")}
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="grid lg:grid-cols-2 mt-3 gap-3">
        <OwnerUserTables ownerDetail={ownerDetail} loading={loading} />
        <OwnerSubscriptionTable ownerDetail={ownerDetail} loading={loading} />
      </div>
      <Link to={"/home"} className="hover:no-underline">
        <div className="flex justify-end mt-4">
          <button className="bg-[#199BD1] w-[235px]  h-[54px] rounded-[8px] text-white">
            Back
          </button>
        </div>
      </Link>
    </div>
  );
};

export default DetailOwner;
