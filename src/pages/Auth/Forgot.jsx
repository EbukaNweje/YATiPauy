import React, { useState } from "react";
import "./LoginStyle.css";
import "../../MobileStyle/AllMobileStyle.css";
import { IoMdArrowDropleft } from "react-icons/io";
import { FaRegUser, FaRegEyeSlash, FaRegEye, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const Nav = useNavigate();

  return (
    <div className="MainBody">
      <div className="Wrapper">
        <div className="navBack">
          <IoMdArrowDropleft size={40} />
        </div>

        <div className="AuthHader">
          <h3>Forgotten password?</h3>
          <p>We'll send an email to you to change it.</p>
        </div>

        <form
          className="MyForm"
          onSubmit={(e) => {
            e.preventDefault();
            setShowModal(true); 
          }}
        >
          <div className="MyFormWrapper">
            <div className="divInputWrapper">
              <div className="divInput">
                <FaRegUser className="IconFont" />
                <input
                  type="text"
                  className="Input"
                  placeholder="Enter your mobile or email"
                />
              </div>
            </div>
            <button type="submit" className="Btn">
              Confirm
            </button>

            <div className="Not">
              <p>
                Not a member?{" "}
                <small>
                  Create a new account?{" "}
                  <span onClick={() => Nav("/Sign-up")}>Sign Up</span>
                </small>
              </p>
            </div>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3>Reset Password</h3>
            <p>Enter a new password below</p>

            <div className="inputWrapper">
              <FaLock className="IconFont" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
              />
              {showPassword ? (
                <FaRegEyeSlash
                  className="toggleIcon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaRegEye
                  className="toggleIcon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>

            <div className="inputWrapper">
              <FaLock className="IconFont" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
              />
              {showConfirmPassword ? (
                <FaRegEyeSlash
                  className="toggleIcon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <FaRegEye
                  className="toggleIcon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </div>

            <button className="Btn" onClick={() => setShowModal(false)}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forgot;
