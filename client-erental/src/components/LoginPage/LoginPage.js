import React from "react";
import { Form, Input, Button } from "antd-mobile";
import { MailOutline, LockOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../LoginPage/LoginPageHandlers";
import "./LoginPage.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.login);

  const onFinish = (values) => {
    handleLogin(values, dispatch, navigate);
  };

  return (
    <div className="login-container">
      <div className="login-title">
        <h2 className="title">Welcome Back!</h2>
        <p className="subtitle">Let's login to eRental App!</p>
      </div>
      <div className="login-card">
        <Form
          layout="vertical"
          onFinish={onFinish}
          footer={
            <Button block type="submit" color="primary" className="login-btn" loading={loading}>
              Login
            </Button>
          }
        >
          <Form.Item label="Email Address" name="email" rules={[{ required: true, message: "Enter email address!" }]}> 
            <Input placeholder="Enter email address" prefix={<MailOutline />} />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Enter password!" }]}> 
            <Input placeholder="Enter account password" type="password" prefix={<LockOutline />} />
          </Form.Item>
        </Form>
        {error && <p className="error-message">{error}</p>}
        <div className="forgot-password">Forgot Password?</div>
        <div className="register-link">Register Instead</div>
      </div>
    </div>
  );
};

export default Login;
