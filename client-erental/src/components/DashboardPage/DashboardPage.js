import React from "react";
import { NavBar, Button} from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { MoreOutline, FilterOutline } from "antd-mobile-icons";
import "./DashboardPage.scss"
import TabBarComponent from "../Tarbar/Tarbar";
const Dashboard = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  const right = <MoreOutline fontSize={24} />;
  // Dữ liệu biểu đồ đường (Doanh thu)
  const revenueData = [
    { month: "May", value: 10000 },
    { month: "Jun", value: 15000 },
    { month: "Jul", value: 38000 },
    { month: "Aug", value: 25000 },
    { month: "Sep", value: 27000 },
    { month: "Oct", value: 32000 },
    { month: "Nov", value: 29000 },
    { month: "Dec", value: 35000 },
  ];

  // Dữ liệu biểu đồ tròn (Trạng thái thuê)
  const rentalStatus = [
    { name: "Đồ sẵn sàng", value: 654, color: "#1890ff" },
    { name: "Đồ bán", value: 564, color: "#f5222d" },
    { name: "Đồ cần giặt", value: 406, color: "#faad14" },
    { name: "Đồ hỏng", value: 271, color: "#a0d911" },
    { name: "Đồ đang sửa", value: 203, color: "#13c2c2" },
    { name: "Đồ ưu tiên", value: 158, color: "#722ed1" },
  ];

  return (
    <div className="dashboard-container">
      {/* Thanh điều hướng */}
      <NavBar
        onBack={() => navigate(-1)}
        right={<MoreOutline fontSize={24} />}
      >
        Dashboard
      </NavBar>

      {/* Bộ lọc */}
      <div className="filter-section">
        <FilterOutline  />
        <Button color="primary" fill="outline" size="small">Weekly</Button>
        <Button color="primary" fill="solid" size="small">Monthly</Button>
        <Button color="primary" fill="none" size="small">Year</Button>
      </div>

      {/* Thông tin tổng quan */}
      <div className="dashboard-info">
        <p>Current time: <span className="date">15 December, 2022</span></p>
        <div className="info-boxes">
          <div className="info-box"><span>Begin</span> 20/50</div>
          <div className="info-box"><span>End</span> 20/50</div>
          <div className="info-box"><span>Reservation</span> 175</div>
          <div className="info-box"><span>In-Use</span> 250</div>
        </div>
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="chart-section">
        <h3>Total Revenue <span className="increase">+13.9%</span></h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={revenueData}>
            <Line type="monotone" dataKey="value" stroke="#1890ff" strokeWidth={2} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ trạng thái thuê */}
      <div className="chart-section">
        <h3>Rental Status</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={rentalStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
              {rentalStatus.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <TabBarComponent />
    </div>
  );
};

export default Dashboard;
