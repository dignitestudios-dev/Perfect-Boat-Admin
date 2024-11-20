import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement, // Import PointElement
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip); // Register PointElement

const options = {
  responsive: true,
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
    },
    y: {
      grid: {
        display: true,
      },
      ticks: {
        display: true,
      },
      border: {
        display: false,
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

const LineChartDash = () => {
  const data = {
    labels: monthsArray,
    datasets: [
      {
        label: "Owners",
        data: [38, 35, 56,45,6,7,8,9,10,100],
        borderColor: "#FD8D49",
      },
      {
        label: "Single Users",
        data: [3, 25, 46,35,65,75,85,95,90,10],
        borderColor: "#199BD1",
      },
    ],
  };

  return (
    <>
      <Line data={data} options={options} maintainAspectRatio={false}  />
    </>
  );
};

export default LineChartDash;
