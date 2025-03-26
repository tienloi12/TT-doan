import React from "react";
import { NavBar, Card, Button } from "antd-mobile";
import {  MoreOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import "../../src/styles/InUsePage.scss"
import TabBarComponent from "./Tarbar";

const bookings = [
  {
    start: "Oct 25",
    end: "Oct 30",
    name: "Mr Join Tanh Son",
    rental: "B.101 - Family",
    nights: "5 Nights",
    guests: "1 Adult / 1 Children",
    price: "500.000 VND",
  },
  {
    start: "Oct 15",
    end: "Oct 17",
    name: "Mr Join Tanh Son",
    rental: "B.102 - Couple",
    nights: "2 Nights",
    guests: "",
    price: "1.500.000 VND",
  },
  {
    start: "Oct 25",
    end: "Oct 30",
    name: "Mr Join Tanh Son",
    rental: "B.201 - Single",
    nights: "5 Nights",
    guests: "",
    price: "2.500.000 VND",
  },
];

const InUsePage = () => {
  const navigate = useNavigate();
  return (
    <div className="in-use-page">
      {/* Header */}
      <NavBar onBack={() => navigate(-1)} right={<MoreOutline fontSize={24}  />}>
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
        {bookings.map((booking, index) => (
          <Card key={index} className="booking-card" onClick={() => navigate("/information")}>
            <div className="booking-content">
              <div className="booking-date">
                <div className="date-text">{booking.start}</div>
                <div className="date-text">{booking.end}</div>
              </div>
              <div className="booking-info">
                <div className="booking-name"><strong>{booking.name}</strong></div>
                <div className="booking-details">#{booking.rental}</div>
                <div className="booking-details">{booking.nights}</div>
                {booking.guests && <div className="booking-details">{booking.guests}</div>}
              </div>
              <div className="booking-price">{booking.price}</div>
            </div>
          </Card>
        ))}
      </div>
      <TabBarComponent />
    </div>
  );
};

export default InUsePage;
