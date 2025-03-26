import React, { useState } from "react";
import { Button, List, Popup, TabBar } from "antd-mobile";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppOutline,
  PieOutline,
  BellOutline,
  FilterOutline,
  MoreOutline,
  UserOutline,
  SetOutline,
  CloseOutline,
} from "antd-mobile-icons";
import "../styles/Tarbar.scss";
import { useSelector } from "react-redux";

const TabBarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuVisible, setMenuVisible] = useState(false);
  const user = useSelector((state) => state.login.user);
  console.log("User từ Redux Store:", user);
  const tabs = [
    { key: "/dashboard", title: "Home", icon: <AppOutline /> },
    { key: "/stay", title: "Stay view", icon: <PieOutline /> },
    { key: "/quick", title: "Quick view", icon: <FilterOutline /> },
    {
      key: "/notification",
      title: "Notification",
      icon: (
        <div className="tab-icon">
          <BellOutline />
          <span className="badge">4</span>
        </div>
      ),
    },
    { key: "menu", title: "Menu", icon: <MoreOutline /> },
  ];

  return (
    <div className="app-container">
      <div className="tabbar-container">
        <TabBar
          activeKey={location.pathname}
          onChange={(key) => key === "menu" ? setMenuVisible(true) : navigate(key)}
          className="tab-bar"
        >
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
      <Popup
        visible={menuVisible}
        onMaskClick={() => setMenuVisible(false)}
        position="right"
        className="custom-popup"
      >
        <Button onClick={() => setMenuVisible(false)} style={{ float: "right" }}>X</Button>
        <List>
        <List.Item prefix={<UserOutline />} onClick={() => navigate(`/Users/profile/${user.user.userId}`)}>
        Profile
      </List.Item>
      <List.Item prefix={<SetOutline />} onClick={() => navigate("/settings")}>
        Settings
      </List.Item>
      <List.Item prefix={<CloseOutline />} style={{ color: "red" }} onClick={() => navigate("/")}>
        Logout
      </List.Item>
        </List>
      </Popup>
    </div>
  );
};

export default TabBarComponent;
