import { useState } from "react";
import "./AuthStyle.css";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "../../assets/logo.png";
import { loginSuccess } from "../../pages/Global/Slice";
import axios from "axios";
import { useAlert } from '../../Components/AlertModal';
// import { isAuth } from '../../Pages/global/features'; // Uncomment when needed

const Login = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const Nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const email = values.email;
    const password = values.password;
    const data = { password: password, email: email };
    try {
      // Make an API request to your backend to create a new users
      const response = await axios.post(
        "https://yaticare-backend.onrender.com/api/auth/login",
        data,
      );
      alert.success("Login Successfull");
      dispatch(loginSuccess(response.data.data));
      localStorage.setItem(
        "refLink",
        JSON.stringify(response.data.data.referralLink),
      );
      if (response?.data?.data?.user?.pin === "") {
        Nav("/auth/Pin");
      } else {
        Nav("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      alert.error(error?.response?.data?.message || error?.response?.data);
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
