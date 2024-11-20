import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
      labels: {
        usePointStyle: true,
        generateLabels: (chart) => {
          const originalLabels =
            Chart.defaults.plugins.legend.labels.generateLabels(chart);
          return originalLabels.map((label) => ({
            ...label,
            borderRadius: 8,
          }));
        },
      },
    },
  },
  scales: {
    x: {
      stacked: false,
      grid: {
        display: false,
      },
    },
    y: {
      stacked: false,
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

const daysArray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MultiBarChart = () => {
  const data = {
    labels: daysArray,
    datasets: [
      {
        label: "",
        data: [38, 35, 32, 40, 25, 30, 50],
        backgroundColor: "#199BD1",
        borderRadius: { topLeft: 10, topRight: 10 },
        borderSkipped: "bottom",
      },
      {
        label: "",
        data: [50, 55, 60, 20, 18, 25, 20],
        backgroundColor: "#FD8D49",
        borderRadius: { topLeft: 10, topRight: 10 },
        borderSkipped: "bottom",
      },
    ],
  };

  return (
    <div className="mt-11" style={{ height: "450px" }}>
      <Bar data={data} options={options} style={{ height: "325px" }} />
    </div>
  );
};

export default MultiBarChart;
