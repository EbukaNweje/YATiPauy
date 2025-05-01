import React, { useState } from "react";
import "./AuthStyle.css";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import axios from "axios";
import toast from "react-hot-toast";

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const hasNumber = /\d/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;

  const Nav = useNavigate();

  const onFinish = async (values) => {

    if (values.password !== values.confirmpassword) {
      toast.error("Passwords do not match.");
      return;
    }

    else if (values.userName.length < 3) {
      toast.error("UserName must be at least 3 characters long");
      // return;
    }

    else if (values.phoneNumber.length < 11) {
      toast.error("PhoneNumber must be at least 11 digits");
      return;
    }

    else if (values.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    else if (!hasUpperCase.test(values.password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    else if (!hasLowerCase.test(values.password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }
    else if (!hasNumber.test(values.password)) {
      toast.error("Password must contain at least one number.");
      return;
    }

    else if (!specialCharacterRegex.test(values.password)) {
      toast.error("Password must contain at least one special character.");
      return;
    }
    setLoading(true);
      try {
        const response = await axios.post(
          "https://yaticare-back-end.vercel.app/api/auth/register",
          values
        );
        console.log(response.data.data);
        toast.success(response.data.message);
        // setLoading(false);
        Nav("/auth/login");
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error(error?.response?.data?.message);
      }
  };

  return (
    <div className="AuthBody">
      <div className="Logo">
        <img src={Logo} alt="" onClick={() => Nav("/")} />
      </div>
      <div className="AuthWrapper">
        <div className="AuthHeader">
          <h3>Create Account</h3>
          <p>Please enter your appropriate details to continue</p>
        </div>
        <Form
          name="SignUp"
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
            name="userName"
            rules={[
              {
                required: true,
                message: "Please input your userName!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="userName" />
          </Form.Item>
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
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your Phone Number!",
              },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirmpassword"
            rules={[
              {
                required: true,
                message: "Please input your Password again!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm password"
            />
          </Form.Item>
          <Form.Item
            name="referralCode"
            rules={[
              {
                message: "Please input your Referral Code!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Referral Code" />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            // {...tailFormItemLayout}
          >
            <Checkbox>
              I have read and agree to YATicare{" "}
              <a onClick={() => Nav("/terms")}>Terms & Conditions</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button className="custom-btn" block htmlType="submit">
              {loading ? "Loading..." : "Create account"}
            </Button>
            or{" "}
            <span
              style={{
                color: "#180169",
                cursor: "pointer",
              }}
              onClick={() => Nav("/auth/login")}
            >
              Login!
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
