import React from "react";
import "./AuthStyle.css";
import { MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Forgotpassword = () => {
  const Nav = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
          name="login"
          style={{
            maxWidth: 600,
            width: 400,
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
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Button
              block
              className="custom-btn"
              htmlType="submit"
              onClick={() => Nav("/auth/resetpassword")}
            >
              Submit
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
