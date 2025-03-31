import React from "react";
import { Form, Input, Button } from "antd-mobile";
import { MailOutline, LockOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../styles/LoginPage.scss";
import { handleLogin } from "../components/LoginPageHandlers";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.login);

  const onFinish = (values) => {
    handleLogin(values, dispatch, navigate);
  };

  return (
    <div className="login-container">
    {/* Login Title Section */}
    <div className="login-title">
      <h2 className="title">Welcome Back!</h2>
      <p className="subtitle">Let's login to eRental App!</p>
    </div>
  
    {/* Login Form Card */}
    <div className="login-card">
      <Form
        layout="vertical"
        onFinish={onFinish} // Handles form submission
        footer={
          // Login Button
          <Button
            block
            type="submit"
            color="primary"
            className="login-btn"
            loading={loading} // Shows loading spinner when processing
          >
            Login
          </Button>
        }
      >
        {/* Email Input Field */}
        <Form.Item
          label="Email Address"
          name="email"
          rules={[{ required: true, message: "Enter email address!" }]}
        >
          <Input placeholder="Enter email address" prefix={<MailOutline />} />
        </Form.Item>
  
        {/* Password Input Field */}
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Enter password!" }]}
        >
          <Input
            placeholder="Enter account password"
            type="password"
            prefix={<LockOutline />}
          />
        </Form.Item>
      </Form>
  
      {/* Error Message Display */}
      {error && <p className="error-message">{error}</p>}
  
      {/* Forgot Password Link */}
      <div
        className="forgot-password"
        onClick={() => navigate("/forgot-password")}
      >
        Forgot Password?
      </div>
  
      {/* Register Link */}
      <div className="register-link" onClick={() => navigate("/register")}>
        Register Instead
      </div>
    </div>
  </div>
  );
};

export default Login;
