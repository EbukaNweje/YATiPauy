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
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../pages/Global/Slice";
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
  const [referralCode, setReferralCode] = useState("");
  // Get referralCode from URL param on mount
  React.useEffect(() => {
    let params;
    if (window.location.search) {
      params = new URLSearchParams(window.location.search);
    } else if (window.location.hash) {
      const hashQuery = window.location.hash.split("?")[1];
      params = new URLSearchParams(hashQuery);
    }
    const code = params?.get("referralCode");
    if (code) setReferralCode(code);
  }, []);
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const hasNumber = /\d/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;

  const Nav = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    if (values.password !== values.confirmpassword) {
      toast.error("Passwords do not match.");
      return;
    } else if (values.userName.length < 3) {
      toast.error("UserName must be at least 3 characters long");
      // return;
    } else if (values.phoneNumber.length < 11) {
      toast.error("PhoneNumber must be at least 11 digits");
      return;
    } else if (values.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
      // } else if (!hasUpperCase.test(values.password)) {
      //   toast.error("Password must contain at least one uppercase letter.");
      //   return;
      // } else if (!hasLowerCase.test(values.password)) {
      //   toast.error("Password must contain at least one lowercase letter.");
      //   return;
      // } else if (!hasNumber.test(values.password)) {
      //   toast.error("Password must contain at least one number.");
      //   return;
      // } else if (!specialCharacterRegex.test(values.password)) {
      //   toast.error("Password must contain at least one special character.");
      //   return;
    } else if (!regex.test(values.email)) {
      toast.error("Email must be valid");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://yaticare-backend.onrender.com/api/auth/register",
        values
      );
      console.log(response.data.data);
      toast.success(response.data.message);
      // setLoading(false);
      dispatch(loginSuccess(response.data.data));
      Nav("/auth/Pin");
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
          name="Signup"
          className="auth-form"
          initialValues={{ remember: true }}
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
            initialValue={referralCode}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Referral Code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />
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
              <a onClick={() => Nav("/terms")}>
                Terms & Conditions/Privacy Policy
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button className="custom-btn" block htmlType="submit">
              {loading ? "Loading..." : "Create account"}
            </Button>
            <span style={{ color: "#eee" }}>or </span>
            <span
              style={{
                color: "#4caf50",
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
