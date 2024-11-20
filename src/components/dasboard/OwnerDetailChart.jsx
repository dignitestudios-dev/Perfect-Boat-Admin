import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import Dropdown from "../dropdown/Dropdown";

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return context.dataset.label + ": " + context.raw;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: true,
        color: "#FFFFFF3D",
      },
    },
    y: {
      grid: {
        display: true,
      },
      ticks: {
        display: true,
      },
      border: {
        display: true,
        color: "#FFFFFF3D",
      },
    },
  },
};

const monthsArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const OwnerDetailLineChart = () => {
  const data = {
    labels: monthsArray,
    datasets: [
      {
        label: "Owners",
        data: [32, 25, 56, 45, 6, 7, 8, 9, 10, 100],
        borderColor: "#199BD1",
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[14px] font-bold">Sales Overview</h1>
        <Dropdown
          label="Yearly"
          items={["Weekly", "Monthly", "Yearly", "Custom"]}
        />
      </div>
      <div className="flex gap-3 mb-4">
        <div className="h-[15px] w-[15px] bg-[#FB7B2C] rounded"></div>
        <span className="text-[12px]">Licensed Fee</span>
        <div className="h-[15px] w-[15px] bg-[#199BD1] rounded"></div>
        <span className="text-[12px]">Per Employee Fee ($10 PE)</span>
      </div>

      <div className="h-[100px] md:h-[400px] lg:h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default OwnerDetailLineChart;
