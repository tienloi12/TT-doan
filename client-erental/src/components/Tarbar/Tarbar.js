import React from "react";
import { TabBar } from "antd-mobile";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppOutline,
  PieOutline,
  BellOutline,
  FilterOutline,
  MoreOutline,
} from "antd-mobile-icons";
import "./Tarbar.scss";

const TabBarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { key: "/dashboard", title: "Home", icon: <AppOutline /> },
    { key: "/stay", title: "Stay view", icon: <PieOutline /> },
    { key: "/quick", title: "Quick view", icon: <FilterOutline /> },
    {
      key: "/notifications",
      title: "Notification",
      icon: (
        <div className="tab-icon">
          <BellOutline />
          <span className="badge">4</span> {/* Hiển thị số thông báo */}
        </div>
      ),
    },
    { key: "/menu", title: "Menu", icon: <MoreOutline /> },
  ];

  return (
    <div className="tabbar-container">
      <TabBar
        activeKey={location.pathname} // Xác định tab đang active
        onChange={(key) => navigate(key)} // Điều hướng khi chọn tab
        className="tab-bar"
      >
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
};

export default TabBarComponent;
