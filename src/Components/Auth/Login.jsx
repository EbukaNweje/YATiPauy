import React from 'react';
import "./AuthStyle.css";
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Logo from "../../assets/logo.png";
// import { isAuth } from '../../Pages/global/features'; // Uncomment when needed

const Login = () => {
  const dispatch = useDispatch();
  const Nav = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // dispatch(isAuth()); // Uncomment if using Redux for auth
    Nav("/dashboard");
  };

  return (
    <div className='AuthBody'>
      <div className='Logo'>
        <img src={Logo} alt="Logo" onClick={() => Nav("/")} />
      </div>

      <div className='AuthWrapper'>
        <div className='AuthHeader'>
          <h3>Let’s login</h3>
          <p>Kindly Input Your Email and Password</p>
        </div>

        <Form
          name="login"
          style={{ maxWidth: 600, width: 400 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email Address!' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <span
                style={{ color: "#180169", cursor: "pointer" }}
                onClick={() => Nav("/auth/Forgottenpassword")}
              >
                Forgot password
              </span>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button className="custom-btn" block htmlType="submit">
              Log in
            </Button>
            or{" "}
            <span
              style={{ color: "#180169", cursor: "pointer" }}
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
