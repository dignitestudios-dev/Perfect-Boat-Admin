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

const OwnerDetailLineChart = ({ timerange, id }) => {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Licensed Fee",
        data: [],
        borderColor: "#FD8D49",
        tension: 0.3,
      },
      {
        label: "Per Employee Fee ($10 PE)",
        data: [],
        borderColor: "#199BD1",
        tension: 0.3,
      },
    ],
  });

  const getOwnerTableData = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`/admin/customer/${id}`);
      console.log(
        data?.data?.graph?.monthly[0]?.subscription?.count,
        "GraphDatasubscription"
      );
      console.log(data?.data?.graph?.monthly[0]?.user?.count, "GraphDatauser");
      let graphData = [];
      let labels = [];
      console.log("graphData", graphData);
      if (timerange === "Yearly") {
        graphData = data?.data?.graph?.yearly || [];
        labels = graphData.map((item) => item?.month || "Unknown Month");
      } else if (timerange === "Monthly") {
        graphData = data?.data?.graph?.monthly || [];
        labels = graphData.map((item) => item?.day || "Unknown day");
      } else if (timerange === "Weekly") {
        graphData = data?.data?.graph?.weekly || [];
        labels = graphData.map((item) => item?.dayOfWeek || "Unknown Day");
      }

      const subscription = graphData?.map(
        (item) => item?.subscription?.count || 0
      );
      const user = graphData.map((item) => item?.user?.count || 0);
      setChartData((prevState) => ({
        ...prevState,
        labels: labels,
        datasets: [
          { ...prevState.datasets[0], data: subscription },
          { ...prevState.datasets[1], data: user },
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
    <div className="mt-12 w-full h-[425px] overflow-hidden">
      {loading ? (
        <Skeleton />
      ) : (
        <Line data={chartData} options={options} style={{ height: "425px" }} />
      )}
    </div>
  );
};

export default OwnerDetailLineChart;
