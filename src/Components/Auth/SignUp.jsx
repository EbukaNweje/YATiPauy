import React, { useState } from "react";
import "./AuthStyle.css";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
// import { countries } from "../Data.jsx";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../pages/Global/Slice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SignUp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [phone, setPhone] = useState("");
  const [isReferralReadOnly, setIsReferralReadOnly] = useState(false);

  const Nav = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    let params;
    if (window.location.search) {
      params = new URLSearchParams(window.location.search);
    } else if (window.location.hash) {
      const hashQuery = window.location.hash.split("?")[1];
      params = new URLSearchParams(hashQuery);
    }
    const code = params?.get("referralCode");
    if (code) {
      setReferralCode(code);
      setIsReferralReadOnly(true);
    } else {
      setIsReferralReadOnly(false);
    }
  }, []);

  React.useEffect(() => {
    form.setFieldsValue({ referralCode });
  }, [referralCode, form]);

  const onFinish = async (values) => {
    if (values.password !== values.confirmpassword) {
      toast.error("Passwords do not match.");
      return;
    } else if (values.userName.length < 3) {
      toast.error("UserName must be at least 3 characters long");
      return;
    } else if (!phone || phone.length < 11) {
      toast.error("PhoneNumber must be valid and at least 11 digits");
      return;
    } else if (values.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
    ) {
      toast.error("Email must be valid");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "https://yaticare-backend.onrender.com/api/auth/register",
        { ...values, phoneNumber: phone }
      );
      toast.success(response.data.message);
      dispatch(loginSuccess(response.data.data));
      Nav("/auth/Pin");
    } catch (error) {
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
          form={form}
          name="Signup"
          className="auth-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "Please input your userName!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="userName" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your Phone Number!" },
            ]}
          >
            <div className="custom-phone-wrapper">
              <PhoneInput
                country={"us"}
                value={phone}
                onChange={setPhone}
                inputClass="custom-phone-input"
                buttonClass="custom-phone-button"
                containerClass="custom-phone-container"
                dropdownClass="custom-phone-dropdown"
              />
            </div>
          </Form.Item>

          {/* <Form.Item
            name="country"
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select
              placeholder="Select your country"
              options={countries.map((country) => ({
                label: country,
                value: country,
              }))}
              style={{
                width: "100%",
                backgroundColor: "transparent",
                color: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                height: "45px",
              }}
              dropdownStyle={{
                backgroundColor: "#0b331d",
                color: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
              }}
              popupClassName="custom-select-dropdown"
              className="custom-select"
            />
          </Form.Item> */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirmpassword"
            rules={[
              { required: true, message: "Please input your Password again!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm password"
            />
          </Form.Item>
          <Form.Item name="referralCode" initialValue={referralCode}>
            <Input
              prefix={<UserOutlined />}
              placeholder="Referral Code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              readOnly={isReferralReadOnly}
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
          >
            <Checkbox>
              I have read and agree to YATicare
              <a onClick={() => Nav("/terms")}>
                {" "}
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
              style={{ color: "#4caf50", cursor: "pointer" }}
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
