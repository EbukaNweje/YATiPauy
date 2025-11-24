import React, { useState } from "react";
import "./AuthStyle.css";
import { LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import axios from "axios";
import toast from "react-hot-toast";

const Resetpassword = () => {
  const Nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // Get reset token from URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (!token) {
        toast.error("Reset token is missing!");
        Nav("/auth/forgotpassword");
        return;
      }

      // Make API request to reset password
      const response = await axios.post(
        "https://yaticare-back-end.vercel.app/api/auth/reset-password",
        {
          token,
          newPassword: values.newPassword,
        }
      );

      toast.success("Password reset successful!");
      Nav("/auth/login");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to reset password");
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
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
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
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button
              block
              className="custom-btn"
              htmlType="submit"
              loading={loading}
              disabled={loading}
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
