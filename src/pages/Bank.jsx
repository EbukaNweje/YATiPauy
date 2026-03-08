import React, { useState, useEffect } from "react";
import { FaWallet, FaSpinner } from "react-icons/fa6";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import "./pageCss/Bank.css";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Bank = () => {
  const [userInput, setUserInput] = useState({
    WalletName: "",
    WalletAddress: "",
  });
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const user = useSelector((state) => state.YATipauy.user);

  // Load existing wallet details if available
  useEffect(() => {
    if (user?.walletName) {
      setUserInput({
        WalletName: user.user.WalletName || "",
        WalletAddress: user.user.WalletAddress || "",
      });
    }
  }, [user]);

  const validateForm = () => {
    if (!userInput.WalletName) {
      toast.error("Please select your wallet type");
      return false;
    }
    if (!userInput.WalletAddress) {
      toast.error("Please enter your wallet address");
      return false;
    }
    if (userInput.WalletAddress.length < 20) {
      toast.error("Please enter a valid wallet address");
      return false;
    }
    return true;
  };

  const updateInfo = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      const response = await axios.put(
        `https://yaticare-backend.onrender.com/api/user/addWallet/${user.user._id}`,
        userInput,
      );
      if (response.data) {
        toast.success("Wallet details updated successfully");
        navigator("/dashboard");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update wallet details",
      );
      console.error("Update error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="Bank">
      <div className="bank-container">
        <div className="bank-header">
          <div className="header-icon">
            <FaWallet />
          </div>
          <h3>Wallet Configuration</h3>
          <p>Securely add your withdrawal wallet details</p>
        </div>

        <section className="bank-form">
          <div className="form-group">
            <label className="form-label">
              <span>Wallet Type</span>
              <span className="required">*</span>
            </label>
            <div className="inputWrapper">
              <FaWallet className="inputIcon" />
              <select
                value={userInput.WalletName}
                onChange={(e) =>
                  setUserInput({ ...userInput, WalletName: e.target.value })
                }
                className={userInput.WalletName ? "filled" : ""}
              >
                <option value="">Select Wallet Type</option>
                <option value="USDT-BEP20">USDT Tether (BEP20)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>Wallet Address</span>
              <span className="required">*</span>
            </label>
            <div className="inputWrapper">
              <FaWallet className="inputIcon" />
              <input
                type="text"
                placeholder="Enter your USDT Tether BEP20 wallet address"
                value={userInput.WalletAddress}
                onChange={(e) =>
                  setUserInput({ ...userInput, WalletAddress: e.target.value })
                }
                className={userInput.WalletAddress ? "filled" : ""}
              />
            </div>
            {userInput.WalletAddress &&
              userInput.WalletAddress.length >= 20 && (
                <div className="validation-success">
                  <FaCheckCircle /> Valid address format
                </div>
              )}
          </div>

          <button
            className={`save-button ${isSaving ? "loading" : ""}`}
            onClick={updateInfo}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <FaSpinner className="spinne" /> Processing...
              </>
            ) : (
              <>
                <FaCheckCircle /> Save Wallet Details
              </>
            )}
          </button>

          <div className="bank-notice">
            <div className="notice-header">
              <FaInfoCircle />
              <span>Important Information</span>
            </div>
            <ul className="notice-list">
              <li>Ensure your wallet address is correct before saving</li>
              <li>Double-check the network type matches (BEP20)</li>
              <li>Incorrect details may result in permanent loss of funds</li>
              <li>You can update your wallet address anytime</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Bank;
