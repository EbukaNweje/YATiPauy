import React from 'react'
import "./AuthStyle.css"
import { MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.png"


const Forgotpassword = () => {
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
            <h3>Forgotten password?</h3>
            <p>We'll send an email to you to change it.</p>
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
      <Form.Item>
        <Button block color="green" variant="solid" htmlType="submit"
            onClick={()=>Nav("/auth/resetpassword")}
        >
         Submit
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

export default Forgotpassword