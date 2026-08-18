import React, { useState, useEffect } from "react";
import "./AuthStyle.css";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Logo from "../../assets/logo.png";
import axios from "axios";
import { useAlert } from '../../Components/AlertModal';

const Resetpassword = () => {
  const alert = useAlert();
  const Nav = useNavigate();
  const { id } = useParams(); // Get user ID from URL params
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get user ID from URL params or query string
    const userIdFromParams = id || searchParams.get("id");

    if (!userIdFromParams) {
      alert.error("Invalid reset link. Please request a new password reset.");
      setTimeout(() => {
        Nav("/auth/forgotpassword");
      }, 2000);
    } else {
      setUserId(userIdFromParams);
    }
  }, [id, searchParams, Nav]);

  const onFinish = async (values) => {
    if (!userId) {
      alert.error("Invalid reset link. Please try again.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `https://yaticare-backend.onrender.com/api/auth/reset-password/${userId}`,
        {
          password: values.newPassword,
        },
      );

      if (response.data) {
        alert.success(response.data.message || "Password reset successful!");
        form.resetFields();

        // Navigate to login after successful reset
        setTimeout(() => {
          Nav("/auth/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Reset password error:", error);
      alert.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to reset password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AuthBody">
      <div className="Logo">
        <img src={Logo} alt="" onClick={() => Nav("/")} />
      </div>
      <div className="AuthWrapper">
        <div className="AuthHeader">
          <h3>Reset password</h3>
          <p>Enter your new password below</p>
        </div>
        <Form
          name="reset-password"
          className="auth-form"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
                message: "Password must contain both letters and numbers",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="New Password"
              disabled={loading || !userId}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              disabled={loading || !userId}
            />
          </Form.Item>

          <Form.Item>
            <Button
              block
              className="custom-btn"
              htmlType="submit"
              loading={loading}
              disabled={loading || !userId}
            >
              {loading ? "Resetting..." : "Reset password"}
            </Button>
            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              or{" "}
              <span
                style={{
                  color: "#4CAF50",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => Nav("/auth/login")}
              >
                Login!
              </span>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Resetpassword;
