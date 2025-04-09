import React, { useState } from "react";
import { NavBar, Space, List, Badge, DatePicker, Popup } from "antd-mobile";
import { FilterOutline, ClockCircleOutline } from "antd-mobile-icons";
import dayjs from "dayjs";
import "../styles/NotificationPage.scss";
import { useNavigate } from "react-router-dom";
import TabBarComponent from "./Tarbar";
import { useSelector } from "react-redux";

const NotificationPage = () => {
  const navigate = useNavigate();
  const notifications = useSelector((state) => state.notifications.notifications);
  console.log("notifications", notifications);
  const [filterDate, setFilterDate] = useState(dayjs("2025-12-25").toDate());
  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <div className="notification-page">
      {/* NavBar */}
      <NavBar onBack={() => navigate(-1)}>Notifications</NavBar>

      {/* Filter Section */}
      <Space justify="between" className="filter-bar">
        <Space align="center">
          <FilterOutline className="filter-icon" />
          <span>Filter By:</span>
        </Space>
        <div onClick={() => setShowDatePicker(true)} className="date-range">
          {dayjs(filterDate).format("DD/MM/YYYY")}
        </div>
      </Space>

      {/* Notification List */}
      <List className="notification-list">
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <List.Item
              key={index}
              prefix={
                <Badge content={notification.action} color="blue">
                  <div
                    className={`action-circle action-${notification.action.toLowerCase()}`}
                  />
                </Badge>
              }
              extra={
                <Space align="center" className="time-info">
                  <ClockCircleOutline className="time-icon" />
                  {notification.time}
                </Space>
              }
            >
              {notification.message}
            </List.Item>
          ))
        ) : (
          <div style={{ padding: 16, textAlign: "center", color: "#999" }}>
            No notifications found.
          </div>
        )}
      </List>

      {/* Date Picker Popup */}
      <Popup
        visible={showDatePicker}
        onMaskClick={() => setShowDatePicker(false)}
        position="bottom"
      >
        <DatePicker
          value={filterDate}
          onConfirm={(val) => {
            setFilterDate(val);
            setShowDatePicker(false);
          }}
          onCancel={() => setShowDatePicker(false)}
        />
      </Popup>
      <TabBarComponent />
    </div>
  );
};

export default NotificationPage;
