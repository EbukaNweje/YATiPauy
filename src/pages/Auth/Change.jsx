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
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.YATipauy.user);

  const [userInput, setUserInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const changePassword = async () => {
    // if (!validatePassword(userInput.newPassword)) {
    //   toast.error("Password must be at least 8 characters long");
    //   return;
    // }

    if (userInput.newPassword !== userInput.confirmNewPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `https://yaticare-backend.onrender.com/api/auth/change-password/${user.user._id}`,
        userInput
      );
      toast.success(response?.data?.message || "Password updated successfully");
      setUserInput({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // const PasswordInput = ({ label, value, onChange, show, toggleShow }) => (
  //   <div className="input-group flex items-center border border-gray-300 rounded-lg px-4 py-2">
  //     <FaLock className="text-gray-500 text-xl mr-2" />
  //     <input
  //       type={show ? "text" : "password"}
  //       placeholder={label}
  //       value={value}
  //       onChange={onChange}
  //       className="w-full text-lg focus:outline-none placeholder-gray-500"
  //     />
  //     <button
  //       className="ml-2 cursor-pointer"
  //       onClick={toggleShow}
  //       type="button"
  //     >
  //       {show ? (
  //         <FaEyeSlash className="text-gray-500 text-xl" />
  //       ) : (
  //         <FaEye className="text-gray-500 text-xl" />
  //       )}
  //     </button>
  //   </div>
  // );

  return (
    <div className="transaction-pin-container flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="transaction-pin-form w-full max-w-md bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6">
        <div className="form-header text-center">
          <FaLock className="lock-icon text-green-500 text-4xl mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
          <p className="text-gray-600">
            Update your password for account security
          </p>
        </div>

        {/* <div className="pin-inputs flex flex-col gap-4"> */}
        <div className="pin-inputs flex flex-col gap-4">
          <div className="input-group flex items-center border border-gray-300 rounded-lg px-4 py-2">
            <FaLock className="text-gray-500 text-xl mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter current password"
              value={userInput.oldPassword}
              onChange={(e) =>
                setUserInput({ ...userInput, oldPassword: e.target.value })
              }
              className="w-full text-lg focus:outline-none placeholder-gray-500"
            />
            <button
              className="ml-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500 text-xl" />
              ) : (
                <FaEye className="text-gray-500 text-xl" />
              )}
            </button>
          </div>
          <div className="input-group flex items-center border border-gray-300 rounded-lg px-4 py-2">
            <FaLock className="text-gray-500 text-xl mr-2" />
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={userInput.newPassword}
              onChange={(e) =>
                setUserInput({ ...userInput, newPassword: e.target.value })
              }
              className="w-full text-lg focus:outline-none placeholder-gray-500"
            />
            <button
              className="ml-2 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
              type="button"
            >
              {showNewPassword ? (
                <FaEyeSlash className="text-gray-500 text-xl" />
              ) : (
                <FaEye className="text-gray-500 text-xl" />
              )}
            </button>
          </div>
          <div className="input-group flex items-center border border-gray-300 rounded-lg px-4 py-2">
            <FaLock className="text-gray-500 text-xl mr-2" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={userInput.confirmNewPassword}
              onChange={(e) =>
                setUserInput({
                  ...userInput,
                  confirmNewPassword: e.target.value,
                })
              }
              className="w-full text-lg focus:outline-none placeholder-gray-500"
            />
            <button
              className="ml-2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              type="button"
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="text-gray-500 text-xl" />
              ) : (
                <FaEye className="text-gray-500 text-xl" />
              )}
            </button>
          </div>
        </div>

        <button
          className={`submit-button w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={changePassword}
          disabled={loading}
        >
          {loading ? "Saving..." : "Update Password"}
        </button>

        <div className="pin-notice text-center text-gray-600">
          <p>
            Your password is essential for account security. Ensure it is strong
            and never share it with anyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Change;
