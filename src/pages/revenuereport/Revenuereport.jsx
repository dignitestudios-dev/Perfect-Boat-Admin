import React, { useState } from "react";
import {
  Arrowicon,
  BoatIcon,
  BookIcon,
  CoinIcon,
  Toolicon,
  User_icon2,
  UserIcon,
} from "../../assets/export";
import LineChartDash from "../../components/dasboard/LineChartDash";
import MultiBarChart from "../../components/dasboard/MultiBarChart";
import { IoMdArrowDropdown } from "react-icons/io";
import OwnerTable from "../../components/dasboard/OwnerTable";
import SingleUserTable from "../../components/dasboard/SingleUserTable";
import Dropdown from "../../components/dropdown/Dropdown";
import RevenueAnalysis from "../../components/revenuereport/revenueanalysis";

const RevenueReport = () => {
  const cardData = [
    { icon: Toolicon, number: 25, label: "Active Subscription" },
    { icon: Arrowicon, number: 25, label: "Total Renewals" },
    { icon: CoinIcon, number: 25, label: "Total Revenue" },
  ];
  const [dropdownStates, setDropdownStates] = useState({});

  const toggleDropdown = (id) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

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
                  label="Weekly"
                  items={["Weekly", "Monthly", "Yearly", "Custom"]}
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
