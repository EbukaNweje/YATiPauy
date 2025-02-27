import React from 'react'
import "./AuthStyle.css"
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import {useNavigate} from 'react-router-dom'
import Logo from "../../assets/logo.png"

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
  const Nav = useNavigate()
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };

  return (
    <div  className='AuthBody'> 
        <div className='Logo'>
          <img src={Logo} alt="" />
        </div>
        <div className='AuthWrapper'>
        <div className='AuhHeader'>
                <h3>Create Account</h3>
                <p>Please enter your appropriate details to continue</p>
            </div>
        <Form
        name="SignUp"
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
        name="fullName"
        rules={[
          {
            required: true,
            message: 'Please input your FullName!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="FullName" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
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
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password agin!',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />}  placeholder="Confirm password" />
      </Form.Item>


      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        // {...tailFormItemLayout}
      >
        <Checkbox>
          I have read and agree to YATicare <a onClick={()=>Nav('/terms')}>Terms & Conditions</a>
        </Checkbox>
      </Form.Item>


      <Form.Item>
        <Button block color="green" variant="solid" htmlType="submit">
          Create account
        </Button>
        or <span style={{
          color: "#180169",
          cursor: "pointer"
        }}
        onClick={()=>Nav("/")}
        >Login!</span>
      </Form.Item>
    </Form>
        </div>
    </div>
  )
}

export default SignUp