import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { IoMdArrowDropleft } from 'react-icons/io';
import "./LoginStyle.css"


const Login = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };

  return (
    <div className='MainBody'>
        <div className='Wrapper'>
            <div className='navBack'>
                <IoMdArrowDropleft size={40}/>
            </div>
            
            <div className='AuthHader'>
                <h3>Let’s login.</h3>
                <p>Let’s us know what your mobile and your password</p>
            </div>

    <Form
      name="login"
      initialValues={{
        remember: true,
      }}
      style={{
        maxWidth: 360,
      }}
      onFinish={onFinish}
      className='MyForm'
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
          // className='MyFormWrapper'
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" className='divInput' />
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
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="">Forgot password</a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>
        or <a href="">Register now!</a>
      </Form.Item>
    </Form>

        </div>
    </div>

  )
}

export default Login