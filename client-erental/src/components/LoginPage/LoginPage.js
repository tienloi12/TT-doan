import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, notification  } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/LoginActions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user, error } = useSelector((state) => state.login);
  const onFinish = (values) => {
    dispatch(login(values.email, values.password));
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");  
    }
  }, [user, navigate]);


  useEffect(() => {
    if (error) {
      notification.error({
        message: "Login Error",
        description: error,
      });
    }
  }, [error]);

  return (
    <div className={"login-container"}>
      <div className="login-title">
        <h2 className="title">Welcome Back!</h2>
        <p className={"subtitle"}>Let's login to eRental App!</p>
      </div>
      <Card className={"login-card"}>
        <Form layout="vertical" onFinish={onFinish}> 
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Enter email address!" }]}
          >
            <Input
              className={"input-field"}
              prefix={<MailOutlined />}
              placeholder="Enter email address"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Enter password!" }]}
          >
            <Input.Password
              className={"input-field"}
              prefix={<LockOutlined />}
              placeholder="Enter account password"
            />
          </Form.Item>

          <div className={"forgot-password"}>Forgot Password?</div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className={"login-btn"}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className={"register-link"}>Register Instead</div>
      </Card>
    </div>
  );
};

export default Login;
