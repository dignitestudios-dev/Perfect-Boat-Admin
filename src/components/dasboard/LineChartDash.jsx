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
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "../../axios";
import Skeleton from "../global/Skeleton";
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip);

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

      ticks: {
        display: true,
        color:"#FFFFFF"
      },
      border: {
        color: "#FFFFFF3D",
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: true,
        color:"#FFFFFF"
      },
      border: {
        color: "#FFFFFF3D",
      },
    },
  },
};

const LineChartDash = ({ timerange }) => {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Owners",
        data: [],
        borderColor: "#FD8D49",
        tension: 0.3,
      },
      {
        label: "Single Users",
        data: [],
        borderColor: "#199BD1",
        tension: 0.3,
      },
    ],
  });

  const getOwnerTableData = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/admin/dashboard/graph/sales");

      let graphData = [];
      let labels = [];
      console.log("graphData", graphData);
      if (timerange === "Yearly") {
        graphData = data?.data?.yearly || [];
        labels = graphData.map((item) => item?.month || "Unknown Month");
      } else if (timerange === "Monthly") {
        graphData = data?.data?.monthly || [];
        labels = graphData.map((item) => item?.day || "Unknown day");
      } else if (timerange === "Weekly") {
        graphData = data?.data?.weekly || [];
        labels = graphData.map((item) => item?.dayOfWeek || "Unknown Day");
      }

      const ownerData = graphData.map((item) => item?.owner?.count || 0);
      const singleUserData = graphData.map((item) => item?.user?.count || 0);
      setChartData((prevState) => ({
        ...prevState,
        labels: labels,
        datasets: [
          { ...prevState.datasets[0], data: ownerData },
          { ...prevState.datasets[1], data: singleUserData },
        ],
      }));
    } catch (error) {
      console.error("Error fetching owner data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOwnerTableData();
  }, [timerange]);

  return (
    <div className="mt-12  w-full">
      {loading ? <Skeleton /> : <Line data={chartData} options={options} />}
    </div>
  );
};

export default LineChartDash;
