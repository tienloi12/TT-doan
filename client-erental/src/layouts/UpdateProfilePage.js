import React, { useEffect } from "react";
import { Form, Input, Button, NavBar } from "antd-mobile";
import {
  MailOutline,
  LockOutline,
  UserOutline,
  PhonebookOutline,
} from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../styles/UpdateProfile.scss";
import {
  fetchProfile,
  updateProfile,
} from "../components/UpdateProfileHandlers";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.profile);
  console.log("User data:", user);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!user) {
      dispatch(fetchProfile());
    } else {
      form.setFieldsValue({
        userId: user.userId,
        username: user.username,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, dispatch, form]);

  const onFinish = (values) => {
    dispatch(updateProfile({ ...values, userId: user.userId }, navigate));
  };

  return (
    <div className="profile-container">
      <NavBar onBack={() => navigate(-1)}>
        Update Profile
      </NavBar>
      <div className="profile-title">
        <h2 className="title">Update Your Profile</h2>
        <p className="subtitle">Keep your information up-to-date!</p>
      </div>
      <div className="profile-card">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          footer={
            <Button
              block
              type="submit"
              color="primary"
              className="profile-btn"
              loading={loading}
            >
              Update Profile
            </Button>
          }
        >
          <Form.Item label="Full Name" name="username">
            <Input
              placeholder="Enter your full name"
              prefix={<UserOutline />}
            />
          </Form.Item>
          <Form.Item label="Email Address" name="email">
            <Input placeholder="Enter email address" prefix={<MailOutline />} />
          </Form.Item>
          <Form.Item label="Phone Number" name="phone">
            <Input
              placeholder="Enter phone number"
              prefix={<PhonebookOutline />}
            />
          </Form.Item>
          <Form.Item label="New Password" name="password">
            <Input
              placeholder="Enter new password"
              type="password"
              prefix={<LockOutline />}
            />
          </Form.Item>
        </Form>
        {error && <p className="error-message">{error}</p>}
        <div className="back-link" onClick={() => navigate(-1)}>
          Back to Profile
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
