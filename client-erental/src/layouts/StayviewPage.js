import React from "react";
import { NavBar, Button } from "antd-mobile";
import { LeftOutline, MoreOutline, FilterOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import "../styles/StayviewPage.scss";
import TabBarComponent from "./Tarbar";


const StayView = () => {
  const navigate = useNavigate();

  const data = [
    { room: "B.101 - Family", guest: "Mr. Thanh", color: "blue" },
    { room: "B.102 - Couple", guest: "Ms Hoang Huong Pham", color: "green" },
    { room: "B.201 - Single", guest: "", color: "" },
    { room: "B.202 - Family", guest: "Ms Le Thi Thuy", color: "green" },
    { room: "B.301 - Couple", guest: "", color: "" },
    { room: "B.302 - Single", guest: "", color: "" },
    { room: "B.401 - Family", guest: "", color: "" },
    { room: "B.402 - Couple", guest: "", color: "" },
  ];

  return (
    <div className="stay-view">
      <NavBar
        onBack={() => navigate(-1)}
        right={<MoreOutline fontSize={24} />}
      >
        Stay view
      </NavBar>

      <div className="filter-section">
        <Button className="filter-btn" shape="rounded">
          <FilterOutline /> 25/12/2024
        </Button>
        <div className="date-columns">
          <span>Wed 26</span>
          <span>Wed 27</span>
          <span>Wed 28</span>
        </div>
      </div>

      <div className="stay-table">
        <div className="table-header">
          <div className="date-header">
          <FilterOutline /><span>Đồ văn phòng</span>
          </div>
          <span className="guest">Guest</span>
        </div>
        {data.map((item, index) => (
          <div key={index} className="table-row">
            <span className="room">{item.room}</span>
            <span className={`guest ${item.color}`}>{item.guest}</span>
          </div>
        ))}
      </div>

      <div className="summary">
        <div className="row">
          <span>Rental Availability (#)</span>
          <span>56</span>
          <span>12</span>
          <span>20</span>
        </div>
        <div className="row">
          <span>Occupancy (%)</span>
          <span>20</span>
          <span>42</span>
          <span>36</span>
        </div>
      </div>

      <TabBarComponent />
    </div>
  );
};

export default StayView;
