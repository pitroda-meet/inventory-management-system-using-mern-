import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";

// ✅ Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StockChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/product/stocklevel`)
      .then((response) => {
        if (!response.data || !Array.isArray(response.data.stocks)) {
          throw new Error("Invalid data format");
        }

        const products = response.data.stocks;

        setChartData({
          labels: products.map((p) => p.name),
          datasets: [
            {
              label: "Stock Levels",
              data: products.map((p) => p.stock),
              backgroundColor: "rgba(75,192,192,0.6)",
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching stock data:", error);
      });
  }, []);

  return <Bar data={chartData} options={{ responsive: true }} />;
};

export default StockChart;
