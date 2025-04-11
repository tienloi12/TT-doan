import React, { useEffect } from "react";
import { NavBar, Button, Divider } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { FilterOutline } from "antd-mobile-icons";
import "../../src/styles/DashboardPage.scss";
import TabBarComponent from "./Tarbar";
import { setRentalStatus } from "../redux/actions/RentalActions";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const rentalStatus = useSelector((state) => state.rentalStatus.rentalStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("https://localhost:5001/api/rentals/status-summary")
      .then((res) => res.json())
      .then((data) => {
        const statusWithColors = data.map((item) => ({
          ...item,
          color: getColorForStatus(item.name), // gán màu
        }));
        dispatch(setRentalStatus(statusWithColors));
      })
      .catch((err) => console.error("Lỗi load trạng thái:", err));
  }, []);

  const getColorForStatus = (status) => {
    switch (status.toLowerCase()) {
      case "sẵn sàng":
        return "#1890ff";
      case "đang thuê":
        return "#1459ff";
      case "đồ bán":
        return "#f5222d";
      case "cần giặt":
        return "#faad14";
      case "đồ hỏng":
        return "#a0d911";
      case "đang sửa":
        return "#13c2c2";
      case "ưu tiên":
        return "#722ed1";
      default:
        return "#ccc";
    }
  };

  const revenueData = [
    { month: "Jan", value: 12000 },
    { month: "Feb", value: 15000 },
    { month: "Mar", value: 17000 },
    { month: "Apr", value: 14000 },
    { month: "May", value: 18000 },
    { month: "Jun", value: 21000 },
    { month: "Jul", value: 25000 },
    { month: "Aug", value: 23000 },
    // { month: "Sep", value: 26000 },
    // { month: "Oct", value: 28000 },
    // { month: "Nov", value: 30000 },
    // { month: "Dec", value: 32000 },
  ];
  const CustomLegend = ({ payload }) => (
    <div className="custom-legend">
      {Array.isArray(payload) &&
        payload.map((entry, index) => (
          <div key={`legend-${index}`} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span>
              {entry.value} - {entry.name}
            </span>
          </div>
        ))}
    </div>
  );
  return (
    <div className="dashboard-container">
      {/* Header */}
      <NavBar onBack={() => navigate("/")}>Dashboard</NavBar>
      {/* Filter */}
      <div className="filter-section">
        <FilterOutline />
        <Button color="primary" fill="outline" size="small">
          Weekly
        </Button>
        <Button color="primary" fill="solid" size="small">
          Monthly
        </Button>
        <Button color="primary" fill="none" size="small">
          Year
        </Button>
      </div>
      {/* Dashboard Info */}
      <div className="dashboard-info">
        <p>
          Current time: <span className="date">15 December, 2022</span>
        </p>
        <div className="info-boxes">
          <div className="info-box">
            <span>Begin</span> 20/50
          </div>
          <div className="info-box">
            <span>End</span> 20/50
          </div>
          <div className="info-box" onClick={() => navigate("/availability")}>
            <span>Reservation</span> 175
          </div>
          <div className="info-box" onClick={() => navigate("/inuse")}>
            <span>In-Use</span> 250
          </div>
        </div>
      </div>
      {/* Revenue Chart */}
      <div className="chart-container">
        <h3>
          Total Revenue <span className="increase">+31.9%</span>
        </h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <XAxis
                dataKey="month"
                stroke="#8884d8"
                padding={{ left: 20, right: 20 }}
              />
              <YAxis domain={[0, "auto"]} stroke="#8884d8" />
              <Tooltip formatter={(value) => `${value.toLocaleString()} VND`} />
              <Line
                type="basis"
                dataKey="value"
                stroke="#1890ff"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Rental Status Chart */}
      <div className="chart-container rental-status">
        <h3>Rental Status</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={rentalStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {(rentalStatus || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <CustomLegend payload={rentalStatus} />
        </div>
        <Divider />
      </div>
      {/* Bottom Navigation */}
      <TabBarComponent />
    </div>
  );
};

export default Dashboard;
