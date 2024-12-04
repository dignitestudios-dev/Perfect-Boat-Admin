import React, { useEffect, useState } from "react";
import { Arrowicon, CoinIcon, Toolicon } from "../../assets/export";
import Dropdown from "../../components/dropdown/Dropdown";
import RevenueAnalysis from "../../components/revenuereport/revenueanalysis";
import axios from "../../axios";

const RevenueReport = () => {
  const [activeTimePeriods, setActiveTimePeriods] = useState([
    "Weekly",
    "Weekly",
    "Weekly",
  ]);
  const [activeSubscription, setActiveSubscription] = useState({});
  const [renewalsData, setRenewalsData] = useState({});
  const [revenueData, setRevenueData] = useState({});
  const [loading, setLoading] = useState(false);
  const cardData = [
    {
      icon: Toolicon,
      label: "Active Subscription",
      getData: (timePeriod) =>
        timePeriod === "Weekly"
          ? activeSubscription?.weekly
          : timePeriod === "Monthly"
          ? activeSubscription?.monthly
          : timePeriod === "Yearly"
          ? activeSubscription?.yearly
          : activeSubscription?.custom,
    },
    {
      icon: Arrowicon,
      label: "Total Renewals",
      getData: (timePeriod) =>
        timePeriod === "Weekly"
          ? renewalsData?.weekly
          : timePeriod === "Monthly"
          ? renewalsData?.monthly
          : timePeriod === "Yearly"
          ? renewalsData?.yearly
          : renewalsData?.custom,
    },
    {
      icon: CoinIcon,
      label: "Total Revenue",
      getData: (timePeriod) =>
        timePeriod === "Weekly"
          ? revenueData?.weekly
          : timePeriod === "Monthly"
          ? revenueData?.monthly
          : timePeriod === "Yearly"
          ? revenueData?.yearly
          : revenueData?.custom,
    },
  ];

  const handleTimePeriodChange = (value, index) => {
    const updatedPeriods = [...activeTimePeriods];
    updatedPeriods[index] = value;
    setActiveTimePeriods(updatedPeriods);
  };

  const getActiveSubscription = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/admin/revenue/subscription/active`);
      setActiveSubscription(data?.data);
    } catch (error) {
      console.error("Error fetching Active Subscription data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRenewalsData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/admin/revenue/subscription/renewals`);
      setRenewalsData(data?.data);
    } catch (error) {
      console.error("Error fetching Renewals data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRevenueData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/admin/revenue/subscription/revenue`);
      setRevenueData(data?.data);
    } catch (error) {
      console.error("Error fetching Revenue data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActiveSubscription();
    getRenewalsData();
    getRevenueData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {cardData?.map((card, index) => (
          <div
            key={index}
            className="card bg-[#001229] p-4 rounded-[24px] w-[294px] shadow-lg"
          >
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <div className="bg-[#1A293D] w-[64px] h-[64px] rounded-[18px] flex items-center justify-center">
                  <img
                    src={card.icon}
                    className="w-[24px] h-[24px]"
                    alt={`${card.label} icon`}
                  />
                </div>
                <div>
                  {loading ? (
                    <div className="text-gray-400 text-[18px] animate-pulse">
                      0...
                    </div>
                  ) : (
                    <h3 className="text-[18px] font-bold text-white">
                      {card?.getData(activeTimePeriods[index])}
                    </h3>
                  )}
                  <p className="text-[13px] text-nowrap leading-[18.9px] text-[#FFFFFF80]">
                    {card?.label}
                  </p>
                </div>
              </div>
              <div>
                <Dropdown
                  label={activeTimePeriods[index]}
                  items={["Weekly", "Monthly", "Yearly", "Custom"]}
                  handleTimePeriod={(value) =>
                    handleTimePeriodChange(value, index)
                  }
                  selectedValue={activeTimePeriods[index]}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className=" mt-5">
        <RevenueAnalysis />
      </div>
    </>
  );
};

export default RevenueReport;
