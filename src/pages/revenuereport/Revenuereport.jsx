import React, { useEffect, useState } from "react";
import { Arrowicon, CoinIcon, Toolicon } from "../../assets/export";
import Dropdown from "../../components/dropdown/Dropdown";
import RevenueAnalysis from "../../components/revenuereport/revenueanalysis";
import axios from "../../axios";
const RevenueReport = () => {
  const [activeTimePeriod, setActiveTimePeriod] = useState("Weekly");
  const [activeSubscription, setActiveSubscription] = useState(0);
  console.log(activeSubscription, "Aaa");
  const cardData = [
    {
      icon: Toolicon,
      number: activeSubscription?.monthly,
      label: "Active Subscription",
    },
    { icon: Arrowicon, number: 25, label: "Total Renewals" },
    { icon: CoinIcon, number: 25, label: "Total Revenue" },
  ];

  const [loading, setLoading] = useState(false);

  const handleTimePeriod = (value) => {
    console.log("Selected Time Period:", value);
    setActiveTimePeriod(value);
    // getactiveSubscription(value);
  };

  const getactiveSubscription = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/admin/revenue/subscription/active`);
      setActiveSubscription(data?.data);
      // console.log("Active Subscription Data:", activeSubscription);
    } catch (error) {
      console.error("Error fetching Active Subscription data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getactiveSubscription();
  }, []);
  return (
    <>
      <div className="flex flex-wrap gap-3">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="card bg-[#001229] p-4 rounded-[24px] w-[294px] shadow-lg"
          >
            <div className="flex justify-between ">
              <div className="flex gap-3  items-center">
                <div className="bg-[#1A293D]  w-[64px] h-[64px] rounded-[18px] flex items-center justify-center">
                  <img
                    src={card.icon}
                    className="w-[24px] h-[24px]"
                    alt={`${card.label} icon`}
                  />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-white">
                    {card.number}
                  </h3>
                  <p className="text-[13px] text-nowrap leading-[18.9px] text-[#FFFFFF80]">
                    {card.label}
                  </p>
                </div>
              </div>
              <div>
                <Dropdown
                  label={activeTimePeriod}
                  items={["Weekly", "Monthly", "Yearly", "Custom"]}
                  handleTimePeriod={handleTimePeriod}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <RevenueAnalysis />
      </div>
    </>
  );
};

export default RevenueReport;
