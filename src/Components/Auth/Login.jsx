import React from 'react'
import "./AuthStyle.css"
import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import Logo from "../../assets/logo.png"
// import '../../MobileStyle/AllMobileStyle.css'

// import {isAuth} from '../../Pages/global/features'


const Login = () => {
  const dispatch = useDispatch()
  const Nav = useNavigate()
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        // dispatch(isAuth())
        Nav("/dashboard")
      };

  return (
    <div  className='AuthBody'> 
        <div className='Logo'>
          <img src={Logo} alt="" />
        </div>
        <div className='AuthWrapper'>
            <div className='AuhHeader'>
                <h3>Let’s login</h3>
                  <p>Kindly Input Your Mobile and Password</p>
            </div>
        <Form
        name="login"
        style={{
         maxWidth: 600,
         width: 400
        }}
        initialValues={{
            remember: true,
        }}
      onFinish={onFinish}
    >
      <Form.Item
        name="PhoneNumber"
        rules={[
          {
            required: true,
            message: 'Please input your Phone Number!',
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
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />}  placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <span style={{
          color: "#180169",
          cursor: "pointer"
        }}
        onClick={()=>Nav("/auth/Forgottenpassword")}
        >Forgot password</span>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block color="green" variant="solid" htmlType="submit">
          Log in
        </Button>
        or <span style={{
          color: "#180169",
          cursor: "pointer"
        }}
        onClick={()=>Nav("/auth/sign-up")}
        >Register now!</span>
      </Form.Item>
    </Form>
        </div>
    </div>
  )
}

export default Login