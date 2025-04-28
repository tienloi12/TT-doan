import React, { useEffect, useState } from "react";
import { NavBar, Card, Button } from "antd-mobile";
import { MoreOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import "../../src/styles/InUsePage.scss";
import TabBarComponent from "./Tarbar";

const InUsePage = () => {
  const navigate = useNavigate();

  const [rentals, setRentals] = useState([]);

   useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await fetch("https://localhost:5001/api/rentals"); // Đảm bảo đúng URL backend của bạn
        if (!response.ok) {
          throw new Error("Lỗi khi gọi API");
        }
        const data = await response.json();
        console.log("Danh sách rentals:", data);

        // Lấy danh sách rentals từ trường $values
        setRentals(data.$values || []); // Đảm bảo không có dữ liệu null hoặc undefined
      } catch (error) {
        console.error("Lỗi khi tải danh sách rentals:", error);
      }
    };

    fetchRentals();
  }, []);


  if (!rentals || rentals.length === 0) {
    return <div>No rentals in use.</div>;
  }
  return (
    <div className="in-use-page">
      {/* Header */}
      <NavBar onBack={() => navigate(-1)} right={<MoreOutline fontSize={24} />}>
        In-Use
      </NavBar>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <Button color="primary" size="small">Begin</Button>
        <Button color="default" size="small">Reservation</Button>
        <Button color="danger" size="small">End</Button>
      </div>

      {/* Booking List */}
      <div className="booking-list">
        {rentals.map((rental, index) => (
          <Card key={index} className="booking-card" onClick={() => navigate("/information")}>
            <div className="booking-content">
              <div className="booking-date">
                <div className="date-text">{new Date(rental.startDate).toLocaleDateString()}</div>
                <div className="date-text">{new Date(rental.endDate).toLocaleDateString()}</div>
              </div>
              <div className="booking-info">
                <div className="booking-name"><strong>{rental.customer.username || "Unknown"}</strong></div>
                {/* <div className="booking-details">#{rental.order?.description || "No description"}</div> */}
                <div className="booking-details">
                  {Math.ceil(
                    (new Date(rental.endDate) - new Date(rental.startDate)) / (1000 * 60 * 60 * 24)
                  )} Days
                </div>
              </div>
              <div className="booking-price">
                {rental.totalPrice?.toLocaleString()} VND
              </div>
            </div>
          </Card>
        ))}
      </div>

      <TabBarComponent />
    </div>
  );
};

export default InUsePage;
