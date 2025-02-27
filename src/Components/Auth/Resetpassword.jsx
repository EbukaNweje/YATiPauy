import React from 'react'
import "./AuthStyle.css"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.png"

const Resetpassword = () => {
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
                <h3>Reset password</h3>
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
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="New Password" />
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
        <Input.Password prefix={<LockOutlined />}  placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block color="green" variant="solid" htmlType="submit">
        Reset password
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

export default Resetpassword