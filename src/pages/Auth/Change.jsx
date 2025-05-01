import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../pageCss/Recharge.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Change = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.YATipauy.user);
  const [userInput, setUserInput] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const changePassword = async () => {
    try{
      const response = await axios.post(`https://yaticare-back-end.vercel.app/api/user/change-password/${user.user._id}`, userInput)
      console.log(response)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className="Change">
      <h3>Please provide the following details below to proceed</h3>
      <section className="chanPass">
        <div className="inputDiv">
          <FaLock className="inputIcon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter current password"
            value={userInput.currentPassword}
            onChange={(e) =>
              setUserInput({ ...userInput, currentPassword: e.target.value })
            }
          />
          <span
            className="toggleIcon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash size={25} cursor={"pointer"} />
            ) : (
              <FaEye size={25} cursor={"pointer"} />
            )}
          </span>
        </div>

        <div className="inputDiv">
          <aside>
            <FaLock className="inputIcon" />
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter New password"
              value={userInput.newPassword}
              onChange={(e) =>
                setUserInput({ ...userInput, newPassword: e.target.value })
              }
            />
          </aside>
          <span
            className="toggleIcon"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <FaEyeSlash size={25} cursor={"pointer"} />
            ) : (
              <FaEye size={25} cursor={"pointer"} />
            )}
          </span>
        </div>

        <div className="inputDiv">
          <aside>
            <FaLock className="inputIcon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New password"
              value={userInput.confirmNewPassword}
              onChange={(e) =>
                setUserInput({ ...userInput, confirmNewPassword: e.target.value })
              }
            />
          </aside>
          <span
            className="toggleIcon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <FaEyeSlash size={25} cursor={"pointer"} />
            ) : (
              <FaEye size={25} cursor={"pointer"} />
            )}
          </span>
        </div>

        <button onClick={changePassword}>Save</button>
      </section>
    </div>
  );
};

export default Change;
