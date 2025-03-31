import React, { useEffect } from "react";
import {
  Card,
  List,
  Button,
  Avatar,
  Space,
  NavBar,
  DotLoading,
  ErrorBlock,
} from "antd-mobile";
import {
  UserOutline,
  MailOutline,
  CalendarOutline,
  PhonebookOutline,
  MoreOutline,
} from "antd-mobile-icons";
import "../styles/ProfilePage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/actions/ProfileActions";
import TabBarComponent from "./Tarbar";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { username } = useParams(); 
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.profile);
  console.log("User state profile:", user);
  useEffect(() => {
    dispatch(fetchProfile(username));
  }, [dispatch, username]);

  if (loading) return <DotLoading size="large" />;
  if (error) return <ErrorBlock message={error} type="error" />;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data available.</p>;

  return (
    <div className="profile-container">
    {/* Navigation Bar with Back Button and More Options */}
    <NavBar onBack={() => navigate(-1)} right={<MoreOutline fontSize={24} />}>
      Profile
    </NavBar>
  
    {/* Profile Card */}
    <Card className="profile-card">
      <div className="profile-header">
        {/* User Avatar */}
        <Avatar className="profile-avatar" src="" />
  
        {/* Username Display */}
        <h2 className="profile-username">{user.username}</h2>
  
        {/* User Role Display */}
        <p className="profile-role">{user.role}</p>
      </div>
  
      {/* User Information List */}
      <List
        header={<h3 className="profile-info-header">User Information</h3>}
        className="profile-list"
      >
        {/* Username */}
        <List.Item
          prefix={<UserOutline className="icon" />}
          extra={<strong>{user.username}</strong>}
        >
          Username
        </List.Item>
  
        {/* Email */}
        <List.Item
          prefix={<MailOutline className="icon" />}
          extra={<strong>{user.email}</strong>}
        >
          Email
        </List.Item>
  
        {/* Phone Number */}
        <List.Item
          prefix={<PhonebookOutline className="icon" />}
          extra={<strong>{user.phone}</strong>}
        >
          Phone
        </List.Item>
  
        {/* Account Creation Date */}
        <List.Item
          prefix={<CalendarOutline className="icon" />}
          extra={<strong>{user.createdAt}</strong>}
        >
          Created At
        </List.Item>
      </List>
    </Card>
  
    {/* Profile Actions - Update Profile Button */}
    <div className="profile-actions">
      <Space direction="vertical" block>
        <Button 
          color="primary" 
          block 
          className="update-button" 
          onClick={() => navigate(`/Users/update-profile/${user.userId}`)}
        >
          Update Profile
        </Button>
      </Space>
    </div>
    <TabBarComponent />
  </div>
  );
};

export default ProfilePage;
