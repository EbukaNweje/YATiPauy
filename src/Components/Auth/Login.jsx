import React, { useState } from "react";
import "./AuthStyle.css";
import { LockOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "../../assets/logo.png";
import { loginSuccess } from "../../pages/Global/Slice";
import axios from "axios";
import toast from "react-hot-toast";
// import { isAuth } from '../../Pages/global/features'; // Uncomment when needed

const Login = () => {
  const dispatch = useDispatch();
  const Nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    // console.log('Received values of form: ', values)
    try {
      // Make an API request to your backend to create a new user
      const response = await axios.post(
        "https://yaticare-backend.onrender.com/api/auth/login",
        values
      );
      console.log(response);
      toast.success("Login Successfull");
      dispatch(loginSuccess(response.data.data));
      localStorage.setItem(
        "refLink",
        JSON.stringify(response.data.data.referralLink)
      );
      // setLoading(false);
      Nav("/dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || "Network Error");
    }
  };

  return (
    <div className="AuthBody">
      <div className="Logo">
        <img src={Logo} alt="Logo" onClick={() => Nav("/")} />
      </div>

      <div className="AuthWrapper">
        <div className="AuthHeader">
          <h3>Let’s login</h3>
          <p>Kindly Input Your Email and Password</p>
        </div>

        <Form
          name="login"
          className="auth-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your Email Address!" },
            ]}
            className="FromInput"
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
            className="FromInput"
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <span
                style={{ color: "#4caf50", cursor: "pointer" }}
                onClick={() => Nav("/auth/Forgottenpassword")}
              >
                Forgot password
              </span>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button className="custom-btn" block htmlType="submit">
              {loading ? "Loading..." : "Login"}
            </Button>
            <span style={{ color: "#eee" }}>or </span>
            <span
              style={{ color: "#4caf50", cursor: "pointer" }}
              onClick={() => Nav("/auth/sign-up")}
            >
              Register now!
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
