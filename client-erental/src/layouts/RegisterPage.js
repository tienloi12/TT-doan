import React from "react";
import { Form, Input, Button } from "antd-mobile";
import {
  MailOutline,
  LockOutline,
  UserOutline,
  PhonebookOutline,
} from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../styles/RegisterPage.scss";
import { handleRegister } from "../components/RegisterPageHandlers";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.register);

  const onFinish = (values) => {
    handleRegister(values, dispatch, navigate);
  };

  return (
    <div className="register-container">
      {/* Registration Title Section */}
      <div className="register-title">
        <h2 className="title">Create an Account</h2>
        <p className="subtitle">Join eRental App today!</p>
      </div>

      {/* Registration Form Card */}
      <div className="register-card">
        <Form
          layout="vertical"
          onFinish={onFinish} // Function to handle form submission
          footer={
            <Button
              block
              type="submit"
              color="primary"
              className="register-btn"
              loading={loading} // Shows loading spinner when registering
            >
              Register
            </Button>
          }
        >
          {/* Full Name Field */}
          <Form.Item
            label="Full Name"
            name="username"
            rules={[{ required: true, message: "Enter your full name!" }]}
          >
            <Input
              placeholder="Enter your full name"
              prefix={<UserOutline />}
            />
          </Form.Item>

          {/* Email Field */}
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Enter email address!" }]}
          >
            <Input placeholder="Enter email address" prefix={<MailOutline />} />
          </Form.Item>

          {/* Phone Number Field */}
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Enter phone number!" }]}
          >
            <Input
              placeholder="Enter phone number"
              prefix={<PhonebookOutline />}
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Password"
            name="passwordhash"
            rules={[{ required: true, message: "Enter password!" }]}
          >
            <Input
              placeholder="Enter account password"
              type="password"
              prefix={<LockOutline />}
            />
          </Form.Item>
        </Form>

        {/* Display error message if registration fails */}
        {error && <p className="error-message">{error}</p>}

        {/* Link to Login Page */}
        <div className="login-link" onClick={() => navigate("/")}>
          Already have an account?
        </div>
      </div>
    </div>
  );
};

export default Register;
