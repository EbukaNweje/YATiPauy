import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../pageCss/Recharge.css";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Change = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // 🔥 new state
  const user = useSelector((state) => state.YATipauy.user);

  const [userInput, setUserInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const changePassword = async () => {
    try {
      if (userInput.newPassword !== userInput.confirmNewPassword) {
        return toast.error("New passwords do not match!");
      }

      setLoading(true); // start loading 🔥

      const response = await axios.post(
        `https://yaticare-back-end.vercel.app/api/auth/change-password/${user.user._id}`,
        userInput
      );

      toast.success(response?.data?.message);

      setUserInput({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // stop loading 🔥
    }
  };

  return (
    <div className="Change">
      <h3>Please provide the following details below to proceed</h3>
      <section className="chanPass">
        {/* Current password */}
        <div className="inputDiv">
          <FaLock className="inputIcon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter current password"
            value={userInput.oldPassword}
            onChange={(e) =>
              setUserInput({ ...userInput, oldPassword: e.target.value })
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

        {/* New password */}
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

        {/* Confirm new password */}
        <div className="inputDiv">
          <aside>
            <FaLock className="inputIcon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New password"
              value={userInput.confirmNewPassword}
              onChange={(e) =>
                setUserInput({
                  ...userInput,
                  confirmNewPassword: e.target.value,
                })
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

        {/* Save button with loading */}
        <button onClick={changePassword} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </section>
    </div>
  );
};

export default Change;
