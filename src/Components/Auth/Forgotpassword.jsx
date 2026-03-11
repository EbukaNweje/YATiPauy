import React, { useState } from "react";
import "./AuthStyle.css";
import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import axios from "axios";
import toast from "react-hot-toast";

const Forgotpassword = () => {
  const Nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://yaticare-backend.onrender.com/api/auth/forgot-password",
        {
          email: values.email,
        },
      );

      if (response.data) {
        toast.success(
          response.data.message ||
            "Password reset instructions sent to your email. Please check your inbox.",
        );

        // If backend returns userId in response, you can use it
        // Otherwise, user will click the link from their email
        if (response.data.userId) {
          localStorage.setItem("resetUserId", response.data.userId);
        }

        form.resetFields();

        // User should check their email for the reset link
        // The link will contain the user ID: /auth/resetpassword/:id
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to send reset link. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AuthBody">
      <div className="Logo">
        <img src={Logo} alt="" />
      </div>
      <div className="AuthWrapper">
        <div className="AuthHeader">
          <h3>Forgotten password?</h3>
          <p>We'll send an email to you to change it.</p>
        </div>
        <Form
          form={form}
          name="forgotPassword"
          style={{
            width: "100%",
            maxWidth: "100%",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item>
            <Button
              block
              className="custom-btn"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
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

export default Forgotpassword;
