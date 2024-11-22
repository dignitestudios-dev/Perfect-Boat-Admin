import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "../../axios";
import Skeleton from "../global/Skeleton";
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

const MultiBarChart = ({ customertimerange }) => {
  const [loading, setLoading] = useState(false);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Owners",
        data: [],
        backgroundColor: "#199BD1",
        borderRadius: { topLeft: 10, topRight: 10 },
        borderSkipped: "bottom",
      },
      {
        label: "Single Users",
        data: [],
        backgroundColor: "#FD8D49",
        borderRadius: { topLeft: 10, topRight: 10 },
        borderSkipped: "bottom",
      },
    ],
  });
  const getGraphData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/admin/dashboard/graph/customer");

      let graphData = [];
      let labels = [];

      console.log("Full API Response: ", data);

      if (customertimerange === "Yearly") {
        graphData = data?.data?.yearly || [];
        labels = graphData?.map((item) => item?.month || "Unknown Month");
      } else if (customertimerange === "Monthly") {
        graphData = data?.data?.monthly || [];
        labels = graphData?.map((item) => item?.day || "Unknown day");
      } else if (customertimerange === "Weekly") {
        graphData = data?.data?.weekly || [];
        labels = graphData?.map((item) => item?.dayOfWeek || "Unknown Day");
      }

      console.log("Graph Data: ", graphData);

      const ownerData = graphData.map((item) => item?.owner?.count || 0);
      const singleUserData = graphData.map(
        (item) => item?.singleUser?.count || 0
      );

      console.log("Owner Data: ", ownerData);
      console.log("Single User Data: ", singleUserData);

      setChartData((prevState) => ({
        ...prevState,
        labels: labels,
        datasets: [
          { ...prevState.datasets[0], data: ownerData },
          { ...prevState.datasets[1], data: singleUserData },
        ],
      }));
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGraphData();
  }, [customertimerange]);

  return (
    <div className="mt-12">
      {loading ? (
        <div>
          <Skeleton />
        </div>
      ) : (
        <Bar data={chartData} options={options} style={{ width: "100%" }} />
      )}
    </div>
  );
};

export default MultiBarChart;
