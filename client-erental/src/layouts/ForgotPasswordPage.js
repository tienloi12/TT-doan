import React, { useState } from "react";
import { Form, Input, Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import {
  handleCheckEmail,
  handleResetPassword,
} from "../components/ForgotPasswordPageHandlers";
import "../styles/ForgotPasswordPage.scss";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="forgot-password-container">
      {/* Page Title */}
      <h2>Reset Your Password</h2>

      {/* Form for email verification or password reset */}
      <Form layout="vertical">
        {/* If the email is not verified, show the email input field */}
        {!isEmailVerified ? (
          <>
            {/* Input field for entering the email */}
            <Form.Item label="Email Address">
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(val) => setEmail(val)}
              />
            </Form.Item>

            {/* Button to verify email */}
            <Button
              block
              type="submit"
              color="primary"
              loading={loading}
              onClick={() =>
                handleCheckEmail(
                  email,
                  setLoading,
                  setIsEmailVerified,
                  setToken
                )
              }
            >
              Verify Email
            </Button>
          </>
        ) : (
          /* If the email is verified, show the password reset fields */
          <>
            {/* Input field for entering a new password */}
            <Form.Item label="New Password">
              <Input
                placeholder="Enter new password"
                type="password"
                value={password}
                onChange={(val) => setPassword(val)}
              />
            </Form.Item>

            {/* Input field to confirm the new password */}
            <Form.Item label="Confirm Password">
              <Input
                placeholder="Confirm new password"
                type="password"
                value={confirmPassword}
                onChange={(val) => setConfirmPassword(val)}
              />
            </Form.Item>

            {/* Button to reset the password */}
            <Button
              block
              type="submit"
              color="primary"
              loading={loading}
              onClick={() =>
                handleResetPassword(
                  token,
                  password,
                  confirmPassword,
                  setLoading,
                  navigate
                )
              }
            >
              Reset Password
            </Button>
          </>
        )}
      </Form>

      {/* Back to login option if the email is not verified */}
      {!isEmailVerified && (
        <div className="back-to-login" onClick={() => navigate("/")}>
          Back to Login
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
