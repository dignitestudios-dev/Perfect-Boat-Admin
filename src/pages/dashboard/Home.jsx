import React, { useEffect, useState } from "react";
import { BoatIcon, BookIcon, User_icon2, UserIcon } from "../../assets/export";
import LineChartDash from "../../components/dasboard/LineChartDash";
import MultiBarChart from "../../components/dasboard/MultiBarChart";
import { IoMdArrowDropdown } from "react-icons/io";
import OwnerTable from "../../components/dasboard/OwnerTable";
import SingleUserTable from "../../components/dasboard/SingleUserTable";
import Dropdown from "../../components/dropdown/Dropdown";
import axios from "../../axios";

const Home = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false);

  const cardDataTemplate = [
    { icon: UserIcon, key: "owner", label: "Managers" },
    { icon: User_icon2, key: "user", label: "Single Users" },
    { icon: BoatIcon, key: "boat", label: "Boats" },
    { icon: BookIcon, key: "task", label: "Tasks" },
  ];

  const [dropdownStates, setDropdownStates] = useState({});

  const toggleDropdown = (id) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/admin/dashboard");
      const dashboardStats = data?.data;

      const updatedCardData = cardDataTemplate.map((template) => ({
        ...template,
        number: dashboardStats[template.key] || 0,
      }));

      setCardData(updatedCardData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {loading ? (
          [1, 2, 3, 4]?.map(() => (
            <div className="card h-[100px] bg-[#001229] p-2 rounded-[24px] w-[214px]">
              {" "}
            </div>
          ))
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {cardData?.map((card, index) => (
              <div
                key={index}
                className="card bg-[#001229] p-2 rounded-[24px] w-[214px]"
              >
                
                <div className="flex gap-3 items-center">
                  <div className="bg-[#1A293D] p-5 rounded-[18px]">
                    <img
                      src={card.icon}
                      className="w-[41px] h-[41px]"
                      alt={`${card.label} icon`}
                    />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-[700]">{card.number}</h3>
                    <h3 className="text-[14px] text-[#FFFFFF80] leading-[18.9px]">
                      {card.label}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-4 gap-3">
        <div className="card bg-[#001229] p-5 rounded-[24px] lg:col-span-2 w-full h-auto">
          <div className="flex items-center pb-5 justify-between">
            <h4 className="text-[14px] text-white font-[700] leading-[18.9px]">
              Sales Overview
            </h4>
            <Dropdown
              label="Yearly"
              items={["Weekly", "Monthly", "Yearly", "Custom"]}
            />
          </div>
          <div className="flex gap-3">
            <div className="h-[15px] w-[15px] bg-[#FB7B2C] rounded"></div>
            <span className="text-[12px]">Owners</span>
            <div className="h-[15px] w-[15px] bg-[#199BD1] rounded"></div>
            <span className="text-[12px]">Single Users</span>
          </div>
          <LineChartDash />
        </div>
        <div className="card bg-[#001229] p-5 rounded-[24px] col-span-2 w-full h-auto">
          <div className="flex items-center pb-5 justify-between">
            <h4 className="text-[14px] text-white font-[700] leading-[18.9px]">
              Customer Overview
            </h4>
            <div className="relative bg-[#042742] w-[70px] h-[27px] rounded-[20px] flex items-center justify-center">
              <button
                onClick={() => toggleDropdown("dropdown2")}
                className="flex items-center gap-1 text-[#199BD1] text-[11px] font-[500]"
              >
                Weekly <IoMdArrowDropdown />
              </button>

              {dropdownStates["dropdown2"] && (
                <div className="absolute left-0 top-5 mt-2 w-[70px] rounded-md shadow-lg p-2 z-10 bg-[#1A293D]">
                  <p className="text-white text-[11px] mt-2">Weekly</p>
                  <p className="text-white text-[11px] mt-2">Monthly</p>
                  <p className="text-white text-[11px] mt-2">Yearly</p>
                  <p className="text-white text-[11px] mt-2">Custom</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="h-[15px] w-[15px] bg-[#FB7B2C] rounded"></div>
            <span className="text-[12px]">Owners</span>
            <div className="h-[15px] w-[15px] bg-[#199BD1] rounded"></div>
            <span className="text-[12px]">Single Users</span>
          </div>
          <MultiBarChart />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mt-4 gap-3">
        <div>
          <OwnerTable />
        </div>
        <div>
          <SingleUserTable />
        </div>
      </div>
    </>
  );
};

export default Home;
