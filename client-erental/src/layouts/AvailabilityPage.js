import React from "react";
import { NavBar, Button } from "antd-mobile";
import {FilterOutline,  MoreOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import TabBarComponent from "./Tarbar";
import "../../src/styles/AvailabilityPage.scss"
const RentalAvailability = () => {
    const navigate = useNavigate()
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <NavBar
        onBack={() => navigate(-1)}
        right={<MoreOutline style={{ fontSize: 24 }} />}
      >
        Rental Availability (#)
      </NavBar>
      
     <div className="filter-section">
            <Button className="filter-btn" shape="rounded">
              <FilterOutline /> 25/12/2024
            </Button>
            <div className="date-columns">
              <div className="date" onClick={() => navigate("/inuse")}>Wed 26</div>
              <div className="date">Wed 27</div>
              <div className="date">Wed 28</div>
            </div>
          </div>
    
      {/* Main Content */}
      <div style={{ flexGrow: 1, background: "#fff" }}></div>
      
      <TabBarComponent />
    </div>
  );
};

export default RentalAvailability;
