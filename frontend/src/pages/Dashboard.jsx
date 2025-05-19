// import StockChart from "../Component/StockChart";

// const Dashboard = () => {
//   return (
//     <div>
//       <StockChart />
//     </div>
//   );
// };

// // export default Dashboard;
// import React, { useEffect, useState } from "react";
// import { Card, Row, Col, Statistic, Spin } from "antd";
// import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
// import { Line, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/sales/summary");
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-red-500">Error: {error}</div>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div>No data available</div>
//       </div>
//     );
//   }

//   // Prepare chart data
//   const dailyChartData = {
//     labels: data.charts.daily.map((item) => item._id),
//     datasets: [
//       {
//         label: "Revenue",
//         data: data.charts.daily.map((item) => item.revenue),
//         borderColor: "rgb(75, 192, 192)",
//         backgroundColor: "rgba(75, 192, 192, 0.5)",
//         yAxisID: "y",
//       },
//       {
//         label: "Profit",
//         data: data.charts.daily.map((item) => item.profit),
//         borderColor: "rgb(54, 162, 235)",
//         backgroundColor: "rgba(54, 162, 235, 0.5)",
//         yAxisID: "y",
//       },
//       {
//         label: "Sales (Units)",
//         data: data.charts.daily.map((item) => item.sales),
//         borderColor: "rgb(255, 99, 132)",
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//         yAxisID: "y1",
//       },
//     ],
//   };

//   const monthlyChartData = {
//     labels: data.charts.monthly.map((item) => item._id),
//     datasets: [
//       {
//         label: "Revenue",
//         data: data.charts.monthly.map((item) => item.revenue),
//         backgroundColor: "rgba(75, 192, 192, 0.5)",
//         borderColor: "rgb(75, 192, 192)",
//         borderWidth: 1,
//       },
//       {
//         label: "Profit",
//         data: data.charts.monthly.map((item) => item.profit),
//         backgroundColor: "rgba(54, 162, 235, 0.5)",
//         borderColor: "rgb(54, 162, 235)",
//         borderWidth: 1,
//       },
//       {
//         label: "Sales (Units)",
//         data: data.charts.monthly.map((item) => item.sales),
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//         borderColor: "rgb(255, 99, 132)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Sales Performance",
//       },
//     },
//     scales: {
//       y: {
//         type: "linear",
//         display: true,
//         position: "left",
//         title: {
//           display: true,
//           text: "Amount ($)",
//         },
//       },
//       y1: {
//         type: "linear",
//         display: true,
//         position: "right",
//         grid: {
//           drawOnChartArea: false,
//         },
//         title: {
//           display: true,
//           text: "Units",
//         },
//       },
//     },
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Sales Dashboard</h1>

//       {/* Summary Cards */}
//       <Row gutter={16} className="mb-6">
//         {/* Daily Summary */}
//         <Col span={8}>
//           <Card title="Today's Summary" bordered={false}>
//             <Statistic
//               title="Sales"
//               value={data.summary.daily.sales}
//               precision={0}
//               valueStyle={{ color: "#3f8600" }}
//               prefix={<ArrowUpOutlined />}
//             />
//             <Statistic
//               title="Revenue"
//               value={data.summary.daily.revenue}
//               precision={2}
//               prefix="$"
//             />
//             <Statistic
//               title="Profit"
//               value={data.summary.daily.profit}
//               precision={2}
//               prefix="$"
//               valueStyle={{ color: "#3f8600" }}
//             />
//           </Card>
//         </Col>

//         {/* Monthly Summary */}
//         <Col span={8}>
//           <Card title="Monthly Summary" bordered={false}>
//             <Statistic
//               title="Sales"
//               value={data.summary.monthly.sales}
//               precision={0}
//               valueStyle={{ color: "#3f8600" }}
//               prefix={<ArrowUpOutlined />}
//             />
//             <Statistic
//               title="Revenue"
//               value={data.summary.monthly.revenue}
//               precision={2}
//               prefix="$"
//             />
//             <Statistic
//               title="Profit"
//               value={data.summary.monthly.profit}
//               precision={2}
//               prefix="$"
//               valueStyle={{ color: "#3f8600" }}
//             />
//           </Card>
//         </Col>

//         {/* All Time Summary */}
//         <Col span={8}>
//           <Card title="All Time Summary" bordered={false}>
//             <Statistic
//               title="Sales"
//               value={data.summary.total.sales}
//               precision={0}
//               valueStyle={{ color: "#3f8600" }}
//               prefix={<ArrowUpOutlined />}
//             />
//             <Statistic
//               title="Revenue"
//               value={data.summary.total.revenue}
//               precision={2}
//               prefix="$"
//             />
//             <Statistic
//               title="Profit"
//               value={data.summary.total.profit}
//               precision={2}
//               prefix="$"
//               valueStyle={{ color: "#3f8600" }}
//             />
//           </Card>
//         </Col>
//       </Row>

//       {/* Charts Section */}
//       <div className="space-y-6">
//         {/* Daily Sales Chart */}
//         <Card title="Last 30 Days Performance" bordered={false}>
//           <div className="h-80">
//             <Line data={dailyChartData} options={chartOptions} />
//           </div>
//         </Card>

//         {/* Monthly Sales Chart */}
//         <Card title="Monthly Performance (Last 12 Months)" bordered={false}>
//           <div className="h-80">
//             <Bar data={monthlyChartData} options={chartOptions} />
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Col, Row, Spin, message, DatePicker } from "antd";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import dayjs from "dayjs";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
// const { MonthPicker } = DatePicker;

// const Dashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [summary, setSummary] = useState({});
//   const [charts, setCharts] = useState({ daily: [], monthly: [] });
//   const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
//   const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/sales/summary`);
//         setSummary(res.data.summary);
//         setCharts(res.data.charts);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//         message.error("Failed to fetch dashboard data");
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   // Filtered chart data
//   const filteredDailyData = charts.daily.filter((item) => item._id === selectedDate);
//   const filteredMonthlyData = charts.monthly.filter((item) => item._id === selectedMonth);

//   const prepareBarChartData = (data) => ({
//     labels: data.map((item) => item._id),
//     datasets: [
//       {
//         label: "Sales",
//         data: data.map((item) => item.sales),
//         backgroundColor: "rgba(255, 159, 64, 0.7)", // Orange
//       },
//       {
//         label: "Revenue",
//         data: data.map((item) => item.revenue),
//         backgroundColor: "rgba(59, 130, 246, 0.7)", // Blue
//       },
//       {
//         label: "Profit",
//         data: data.map((item) => item.profit),
//         backgroundColor: "rgba(34, 197, 94, 0.7)", // Green
//       },
//     ],
//   });

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

//       {/* Summary Cards */}
//       <Row gutter={[16, 16]}>
//         {["daily", "monthly", "total"].map((key) => (
//           <Col xs={24} sm={12} lg={8} key={key}>
//             <Card
//               title={`${key.charAt(0).toUpperCase() + key.slice(1)} Summary`}
//               bordered={false}
//               className="rounded-2xl shadow"
//             >
//               <p>
//                 <strong>Sales:</strong> {summary[key]?.sales || 0}
//               </p>
//               <p>
//                 <strong>Revenue:</strong> ₹{summary[key]?.revenue || 0}
//               </p>
//               <p>
//                 <strong>Profit:</strong> ₹{summary[key]?.profit || 0}
//               </p>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Charts */}
//       <div className="mt-10">
//         <Row gutter={[16, 16]}>
//           {/* Daily Chart */}
//           <Col xs={24} lg={12}>
//             <Card
//               title={
//                 <div className="flex justify-between items-center">
//                   <span>Daily Sales Chart</span>
//                   <DatePicker
//                     defaultValue={dayjs()}
//                     format="YYYY-MM-DD"
//                     onChange={(date) => setSelectedDate(date.format("YYYY-MM-DD"))}
//                   />
//                 </div>
//               }
//               className="rounded-2xl shadow"
//             >
//               {filteredDailyData.length > 0 ? (
//                 <Bar data={prepareBarChartData(filteredDailyData)} />
//               ) : (
//                 <p className="text-center text-gray-500">No data available for selected date.</p>
//               )}
//             </Card>
//           </Col>

//           {/* Monthly Chart */}
//           <Col xs={24} lg={12}>
//             <Card
//               title={
//                 <div className="flex justify-between items-center">
//                   <span>Monthly Sales Chart</span>
//                   <MonthPicker
//                     defaultValue={dayjs()}
//                     format="YYYY-MM"
//                     onChange={(date) => setSelectedMonth(date.format("YYYY-MM"))}
//                   />
//                 </div>
//               }
//               className="rounded-2xl shadow"
//             >
//               {filteredMonthlyData.length > 0 ? (
//                 <Bar data={prepareBarChartData(filteredMonthlyData)} />
//               ) : (
//                 <p className="text-center text-gray-500">No data available for selected month.</p>
//               )}
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row, Spin, message, DatePicker } from "antd";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const { MonthPicker } = DatePicker;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});
  const [charts, setCharts] = useState({ daily: [], monthly: [] });
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/sales/summary`);
        setSummary(res.data.summary);
        setCharts(res.data.charts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        message.error("Failed to fetch dashboard data");
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const filteredDailyData = charts.daily.filter((item) => item._id === selectedDate);
  const filteredMonthlyData = charts.monthly.filter((item) => item._id === selectedMonth);

  const prepareBarChartData = (data) => ({
    labels: data.map((item) => item._id),
    datasets: [
      {
        label: "Sales",
        data: data.map((item) => item.sales),
        backgroundColor: "rgba(255, 159, 64, 0.7)", // Orange
        yAxisID: "y1",
      },
      {
        label: "Revenue",
        data: data.map((item) => item.revenue),
        backgroundColor: "rgba(59, 130, 246, 0.7)", // Blue
        yAxisID: "y",
      },
      {
        label: "Profit",
        data: data.map((item) => item.profit),
        backgroundColor: "rgba(34, 197, 94, 0.7)", // Green
        yAxisID: "y",
      },
    ],
  });

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "₹ (Revenue & Profit)",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Units Sold",
        },
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <Row gutter={[16, 16]}>
        {["daily", "monthly", "total"].map((key) => (
          <Col xs={24} sm={12} lg={8} key={key}>
            <Card
              title={`${key.charAt(0).toUpperCase() + key.slice(1)} Summary`}
              bordered={false}
              className="rounded-2xl shadow"
            >
              <p>
                <strong>Sales:</strong> {summary[key]?.sales || 0}
              </p>
              <p>
                <strong>Revenue:</strong> ₹{summary[key]?.revenue || 0}
              </p>
              <p>
                <strong>Profit:</strong> ₹{summary[key]?.profit || 0}
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts */}
      <div className="mt-10">
        <Row gutter={[16, 16]}>
          {/* Daily Chart */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <div className="flex justify-between items-center">
                  <span>Daily Sales Chart</span>
                  <DatePicker
                    defaultValue={dayjs()}
                    format="YYYY-MM-DD"
                    onChange={(date) => setSelectedDate(date.format("YYYY-MM-DD"))}
                  />
                </div>
              }
              className="rounded-2xl shadow"
            >
              {filteredDailyData.length > 0 ? (
                <Bar data={prepareBarChartData(filteredDailyData)} options={barChartOptions} />
              ) : (
                <p className="text-center text-gray-500">No data available for selected date.</p>
              )}
            </Card>
          </Col>

          {/* Monthly Chart */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <div className="flex justify-between items-center">
                  <span>Monthly Sales Chart</span>
                  <MonthPicker
                    defaultValue={dayjs()}
                    format="YYYY-MM"
                    onChange={(date) => setSelectedMonth(date.format("YYYY-MM"))}
                  />
                </div>
              }
              className="rounded-2xl shadow"
            >
              {filteredMonthlyData.length > 0 ? (
                <Bar data={prepareBarChartData(filteredMonthlyData)} options={barChartOptions} />
              ) : (
                <p className="text-center text-gray-500">No data available for selected month.</p>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
