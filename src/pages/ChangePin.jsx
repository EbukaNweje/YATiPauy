import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import "./pageCss/Recharge.css";
import { useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
import toast from "react-hot-toast";
import axios from "axios";

const ChangePin = () => {
  const [showPin, setShowPin] = useState(false);
  const [showNewPin, setNewShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.YATipauy?.user);
  const [userInput, setUserInput] = useState({
    oldPin: "",
    newPin: "",
  });

  const API_URL = `https://yaticare-back-end.vercel.app/api/auth/change-pin/${user?.user?._id}`;

  const validatePin = (pin) => /^[0-9]{4}$/.test(pin);

  const changePin = async () => {
    if (!userInput.oldPin || !userInput.newPin) {
      toast.error("Please fill in all fields");
      return;
    } else if (userInput.oldPin === userInput.newPin) {
      toast.error("New PIN must be different from the old PIN");
      return;
    } else if (
      !validatePin(userInput.oldPin) ||
      !validatePin(userInput.newPin)
    ) {
      toast.error("PIN must be a 4-digit number");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(API_URL, userInput);
      toast.success(response.data?.message || "PIN changed successfully");
      setUserInput({ oldPin: "", newPin: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error changing PIN");
    } finally {
      setLoading(false);
    }
  };

  const PinInput = ({ label, value, onChange, show, toggleShow }) => (
    <div className="input-group">
      <input
        type={show ? "text" : "password"}
        maxLength={4}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
      <button className="toggle-visibility" onClick={toggleShow} type="button">
        {show ? (
          <FaEye className="eye-icon" />
        ) : (
          <FaEyeSlash className="eye-icon" />
        )}
      </button>
    </div>
  );

  return (
    <div className="transaction-pin-container">
      <div className="transaction-pin-form">
        <div className="form-header">
          <FaLock className="lock-icon" />
          <h2>Change Transaction PIN</h2>
          <p>Update your 4-digit PIN for securing your transactions</p>
        </div>

        <div className="pin-inputs">
          <PinInput
            label="Enter current PIN"
            value={userInput.oldPin}
            onChange={(e) =>
              setUserInput({ ...userInput, oldPin: e.target.value })
            }
            show={showPin}
            toggleShow={() => setShowPin(!showPin)}
          />

          <PinInput
            label="Enter new PIN"
            value={userInput.newPin}
            onChange={(e) =>
              setUserInput({ ...userInput, newPin: e.target.value })
            }
            show={showNewPin}
            toggleShow={() => setNewShowPin(!showNewPin)}
          />
        </div>

        <button
          className="submit-button"
          onClick={changePin}
          disabled={loading}
        >
          {loading ? <PuffLoader color="white" size={24} /> : "Update PIN"}
        </button>

        <div className="pin-notice">
          <p>
            Your transaction PIN adds an extra layer of security to your
            withdrawals. Never share your PIN with anyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePin;
