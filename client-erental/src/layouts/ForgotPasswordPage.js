import React, { useState } from "react";
import { Form, Input, Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { handleCheckEmail, handleResetPassword } from "../components/ForgotPasswordPageHandlers";
import "../styles/ForgotPasswordPage.scss";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState(""); // Lưu token từ API
  const [loading, setLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="forgot-password-container">
      <h2>Reset Your Password</h2>

      <Form layout="vertical">
        {!isEmailVerified ? (
          <>
            {/* Form kiểm tra email */}
            <Form.Item label="Email Address">
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(val) => setEmail(val)}
              />
            </Form.Item>
            <Button block type="submit" color="primary" loading={loading} 
              onClick={() => handleCheckEmail(email, setLoading, setIsEmailVerified, setToken)}>
              Verify Email
            </Button>
          </>
        ) : (
          <>
            {/* Form nhập mật khẩu mới */}
            <Form.Item label="New Password">
              <Input
                placeholder="Enter new password"
                type="password"
                value={password}
                onChange={(val) => setPassword(val)}
              />
            </Form.Item>
            <Form.Item label="Confirm Password">
              <Input
                placeholder="Confirm new password"
                type="password"
                value={confirmPassword}
                onChange={(val) => setConfirmPassword(val)}
              />
            </Form.Item>
            <Button block type="submit" color="primary" loading={loading} 
              onClick={() => handleResetPassword(token, password, confirmPassword, setLoading, navigate)}>
              Reset Password
            </Button>
          </>
        )}
      </Form>

      {!isEmailVerified && (
        <div className="back-to-login" onClick={() => navigate("/")}>
          Back to Login
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
