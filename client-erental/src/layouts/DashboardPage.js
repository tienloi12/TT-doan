import React, { useEffect, useState } from "react";
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
  const [revenueData, setRevenueData] = useState([]);
  const fixSpecialCharacters = (str) => {
    return str.replace("Ð", "Đ");
  };
  const getColorForStatus = (status) => {
    const fixedStatus = fixSpecialCharacters(status);
    switch (fixedStatus.toLowerCase()) {
      case "đồ sẵn sàng":
        return "#1890ff";
      case "đồ bẩn":
        return "#f5222d";
      case "đồ cần giặt":
        return "#faad14";
      case "đồ hỏng":
        return "#a0d911";
      case "đồ đang sửa":
        return "#13c2c2";
      case "đồ ưu tiên":
        return "#722ed1";
      default:
        return "#ccc";
    }
  };
  useEffect(() => {
    fetch("https://localhost:5001/api/products/status-summary")
      .then((res) => res.json())
      .then((data) => {
        // Kiểm tra dữ liệu trả về
        console.log("Dữ liệu trả về từ API:", data);
  
        // Kiểm tra cấu trúc mảng $values
        if (data && Array.isArray(data.$values)) {
          const statusWithColors = data.$values.map((item) => {
            console.log("Trạng thái:", item.name);
            return {
              ...item,
              color: getColorForStatus(item.name),
            };
          });
          console.log("Trạng thái có màu:", statusWithColors);
          dispatch(setRentalStatus(statusWithColors));
        } else {
          console.error("Dữ liệu trạng thái không hợp lệ:", data);
        }
      })
      .catch((err) => console.error("Lỗi load trạng thái:", err));
  }, []);
  

  useEffect(() => {
    fetch("https://localhost:5001/api/rentals/monthly-revenue?year=2025")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.$values)) {
          console.log("Dữ liệu doanh thu nhận được:", data.$values);
  
          const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ];
  
          const revenueData = data.$values.map((item) => ({
            month: monthNames[item.month - 1],
            value: item.totalRevenue
          }));
  
          setRevenueData(revenueData); // Dùng cho biểu đồ
        } else {
          console.error("Dữ liệu doanh thu không hợp lệ:", data);
        }
      })
      .catch((err) => console.error("Lỗi load doanh thu theo tháng:", err));
  }, []);

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
      <div className="chart-container" width="100%" aspect={2}>
        <h3 className="chart-title">
          Total Revenue <span className="increase">+31.9%</span>
        </h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
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
