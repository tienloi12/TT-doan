import React from "react";
import { NavBar, Button, List, Divider } from "antd-mobile";
import { MoreOutline, FilterOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import "../styles/StayviewPage.scss";
import TabBarComponent from "./Tarbar";

const StayView = () => {
  const navigate = useNavigate();

  const data = [
    {
      room: "B.101 - Family",
      guest: "Mr. Thanh",
      color: "blue",
      rental: 56,
      occupancy: 20,
    },
    {
      room: "B.102 - Couple",
      guest: "Ms Hoang Huong Pham",
      color: "green",
      rental: 12,
      occupancy: 42,
    },
    { room: "B.201 - Single", guest: "", color: "", rental: 20, occupancy: 36 },
    {
      room: "B.202 - Family",
      guest: "Ms Le Thi Thuy",
      color: "green",
      rental: 14,
      occupancy: 30,
    },
    { room: "B.301 - Couple", guest: "", color: "", rental: 18, occupancy: 25 },
    { room: "B.302 - Single", guest: "", color: "", rental: 22, occupancy: 28 },
    { room: "B.401 - Family", guest: "", color: "", rental: 19, occupancy: 32 },
    { room: "B.402 - Couple", guest: "", color: "", rental: 24, occupancy: 35 },
  ];

  return (
    <div className="stay-view">
    {/* Navigation Bar with back button and more options */}
    <NavBar
      onBack={() => navigate("/dashboard")}
      right={<MoreOutline fontSize={24} />}
    >
      Stay View
    </NavBar>
  
    {/* Filter Section with date selection */}
    <div className="filter-section">
      <Button className="filter-btn" shape="rounded">
        <FilterOutline /> 25/12/2024
      </Button>
      <div className="date-columns">
        <div className="date">Wed 26</div>
        <div className="date">Wed 27</div>
        <div className="date">Wed 28</div>
      </div>
    </div>
  
    {/* Stay Information Table */}
    <div className="stay-table">
      <div>
        {/* Office Equipment Header */}
        <List renderHeader={() => "Office Equipment"}>
          {/* Office Equipment Summary */}
          <List.Item className="custom-list-item">
            <div className="custom-flex">
              <div className="title">
                <FilterOutline />
                <span>Office Equipment</span>
              </div>
              <div>0</div>
              <div>0</div>
              <div>0</div>
            </div>
          </List.Item>
  
          {/* Dynamic Data Rows */}
          {data.map((item, index) => (
            <List.Item key={index} className="custom-list-item">
              <div className="custom-flex">
                <div>{item.room}</div>
                <div>{item.guest}</div>
                <div></div>
                <div></div>
              </div>
            </List.Item>
          ))}
  
          {/* Rental Availability Section */}
          <List.Item className="custom-list-item">
            <div className="custom-flex">
              <div className="title" onClick={() => navigate("/availability")}>
                Rental Availability (#)
              </div>
              <div>56</div>
              <div>56</div>
              <div>56</div>
            </div>
          </List.Item>
  
          {/* Occupancy Percentage Section */}
          <List.Item className="custom-list-item">
            <div className="custom-flex">
              <div className="title">Occupancy (%)</div>
              <div>20</div>
              <div>56</div>
              <div>56</div>
            </div>
          </List.Item>
        </List>
      </div>
    </div>
  
    {/* Divider Line */}
    <Divider />
  
    {/* Bottom Navigation */}
    <TabBarComponent />
  </div>
  );
};

export default StayView;
