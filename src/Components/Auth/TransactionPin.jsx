import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import "./AuthStyle.css";

const TransactionPin = () => {
  const Nav = useNavigate();
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.YATipauy.user);
  const [userInput, setUserInput] = useState({
    pin: "",
    confirmPin: "",
  });

  const validatePin = (pin) => {
    return /^\d{4}$/.test(pin);
  };

  const handlePinChange = (e, field) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setUserInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submitPin = async () => {
    if (!userInput.pin || !userInput.confirmPin) {
      toast.error("Please enter both PIN fields");
      return;
    }

    if (!validatePin(userInput.pin)) {
      toast.error("PIN must be exactly 4 digits");
      return;
    }

    if (userInput.pin !== userInput.confirmPin) {
      toast.error("PINs do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `https://yaticare-back-end.vercel.app/api/auth/create-pin/${user.user._id}`,
        { pin: userInput.pin }
      );

      if (response.data) {
        toast.success("Transaction PIN created successfully");
        setUserInput({
          pin: "",
          confirmPin: "",
        });
        setTimeout(() => {
          Nav("/auth/add-WalletAddress");
        }, 2000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create PIN";
      toast.error(errorMessage);
      console.error("PIN creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-pin-container">
      <div className="transaction-pin-form">
        <div className="form-header">
          <FaLock className="lock-icon" />
          <h2>Create Transaction PIN</h2>
          <p>Create a 4-digit PIN for securing your transactions</p>
        </div>

        <div className="pin-inputs">
          <div className="input-group">
            <input
              type={showPin ? "text" : "password"}
              maxLength={4}
              placeholder="Enter Your PIN"
              value={userInput.pin}
              onChange={(e) => handlePinChange(e, "pin")}
            />
            <button
              className="toggle-visibility"
              onClick={() => setShowPin(!showPin)}
              type="button"
            >
              {showPin ? (
                <FaEye className="eye-icon" />
              ) : (
                <FaEyeSlash className="eye-icon" />
              )}
            </button>
          </div>

          <div className="input-group">
            <input
              type={showConfirmPin ? "text" : "password"}
              maxLength={4}
              placeholder="Confirm Your PIN"
              value={userInput.confirmPin}
              onChange={(e) => handlePinChange(e, "confirmPin")}
            />
            <button
              className="toggle-visibility"
              onClick={() => setShowConfirmPin(!showConfirmPin)}
              type="button"
            >
              {showConfirmPin ? (
                <FaEye className="eye-icon" />
              ) : (
                <FaEyeSlash className="eye-icon" />
              )}
            </button>
          </div>
        </div>

        <button
          className="submit-button"
          onClick={submitPin}
          disabled={loading}
        >
          {loading ? <PuffLoader color="white" size={24} /> : "Create PIN"}
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

export default TransactionPin;
