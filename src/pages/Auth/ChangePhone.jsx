import React, { useState } from "react";
import "../pageCss/Recharge.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoCallSharp } from "react-icons/io5";
import toast from "react-hot-toast";

const ChangePhone = () => {
  const user = useSelector((state) => state.YATipauy.user);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    phoneNumber: "",
  });

  const validatePhoneNumber = (phoneNumber) => {
    return /^\+?[1-9]\d{1,14}$/.test(phoneNumber);
  };

  const changeNo = async () => {
    // if (!validatePhoneNumber(userInput.newPhoneNumber)) {
    //   toast.error("Please enter a valid phone number");
    //   return;
    // }

    console.log("userInput", user.user._id);

    try {
      setLoading(true);
      const response = await axios.put(
        `https://yaticare-back-end.vercel.app/api/user/changePhonenumber/${user.user._id}`,
        userInput
      );
      // console.log(response);
      toast.success(
        response.data.message || "Phone number updated successfully"
      );
      setUserInput({ phoneNumber: "" });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update phone number"
      );
    } finally {
      setLoading(false);
    }
  };

  const PhoneInput = ({ label, value, onChange }) => (
    <div className="input-group flex items-center border border-gray-300 rounded-lg px-4 py-2">
      <IoCallSharp className="text-gray-500 text-xl mr-2" />
      <input
        type="tel"
        placeholder={label}
        value={value}
        onChange={onChange}
        className="w-full text-lg focus:outline-none placeholder-gray-500"
      />
    </div>
  );

  return (
    <div className="transaction-pin-container flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="transaction-pin-form w-full max-w-md bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6">
        <div className="form-header text-center">
          <IoCallSharp className="lock-icon text-green-500 text-4xl mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">
            Change Phone Number
          </h2>
          <p className="text-gray-600">
            Update your phone number for account security
          </p>
        </div>

        <div className="pin-inputs flex flex-col gap-4">
          <div className="input-group flex items-center border border-gray-300 rounded-lg px-4 py-2">
            <IoCallSharp className="text-gray-500 text-xl mr-2" />
            <input
              type="tel"
              placeholder="Enter New Phone number"
              value={userInput.phoneNumber}
              onChange={(e) =>
                setUserInput({ ...userInput, phoneNumber: e.target.value })
              }
              className="w-full text-lg focus:outline-none placeholder-gray-500"
            />
          </div>
        </div>

        <button
          className={`submit-button w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={changeNo}
          disabled={loading}
        >
          {loading ? "Saving..." : "Update Phone Number"}
        </button>

        <div className="pin-notice text-center text-gray-600">
          <p>
            Your phone number is essential for account recovery and security.
            Ensure it is up-to-date.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePhone;
