import React, { useState } from "react";
import { NavBar, Space, List, Badge, DatePicker, Popup } from "antd-mobile";
import {
  LeftOutline,
  MoreOutline,
  FilterOutline,
  ClockCircleOutline,
} from "antd-mobile-icons";
import dayjs from "dayjs";
import "../../src/styles/NotificationPage.scss";

const NotificationPage = () => {
  const [filterDate, setFilterDate] = useState(dayjs("2025-12-25").toDate());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const notifications = [
    {
      action: "New",
      message: "Mr Thanh has a new reservation.",
      id: "123345555",
      time: "10:08 PM",
      date: "27 Oct 2025",
    },
    {
      action: "Edit",
      message: "Booking updated successfully.",
      id: "173345555",
      time: "11:15 AM",
      date: "28 Oct 2025",
    },
    {
      action: "Del",
      message: "A booking has been canceled.",
      id: "192345678",
      time: "03:30 PM",
      date: "29 Oct 2025",
    },
  ];

  return (
    <div className="notification-page">
      {/* NavBar */}
      <NavBar
        back={<LeftOutline />}
        right={<MoreOutline />}
        onBack={() => console.log("Back")}
      >
        Notifications
      </NavBar>

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
        {notifications.map((notification, index) => (
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
            <List.Item.Brief>Id: {notification.id}</List.Item.Brief>
          </List.Item>
        ))}
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
    </div>
  );
};

export default NotificationPage;
