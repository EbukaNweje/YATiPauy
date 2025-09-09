import React, { useState, useEffect } from "react";
import { FaWallet, FaSpinner } from "react-icons/fa6";
import "./pageCss/Bank.css";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const Bank = () => {
  const [userInput, setUserInput] = useState({
    walletName: "",
    walletAddress: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const user = useSelector((state) => state.YATipauy.user);

  // Load existing wallet details if available
  useEffect(() => {
    if (user?.user?.walletName) {
      setUserInput({
        walletName: user.user.walletName || "",
        walletAddress: user.user.walletAddress || "",
      });
    }
  }, [user]);

  const validateForm = () => {
    if (!userInput.walletName) {
      toast.error("Please enter your wallet name");
      return false;
    }
    if (!userInput.walletAddress) {
      toast.error("Please enter your wallet address");
      return false;
    }
    return true;
  };

  const updateInfo = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      const response = await axios.put(
        `https://yaticare-back-end.vercel.app/api/user/updateuser/${user.user._id}`,
        userInput
      );
      if (response.data) {
        toast.success("Wallet details updated successfully");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update wallet details"
      );
      console.error("Update error:", error);
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="Bank">
      <div className="bank-header">
        <h3>Wallet Details</h3>
        <p>Please provide your wallet information for withdrawals</p>
      </div>

      <section className="bank-form">
        <div className="inputWrapper">
          <FaWallet className="inputIcon" />
          <select
            value={userInput.walletName}
            onChange={(e) =>
              setUserInput({ ...userInput, walletName: e.target.value })
            }
            className={userInput.walletName ? "filled" : ""}
          >
            <option value="">Select Wallet Type</option>
            <option value="Bitcoin">Bitcoin (BTC)</option>
            <option value="Ethereum">Ethereum (ETH)</option>
            <option value="USDT-TRC20">USDT (TRC20)</option>
            <option value="USDT-ERC20">USDT (ERC20)</option>
            <option value="BNB">BNB (BSC)</option>
            <option value="BUSD">BUSD (BSC)</option>
          </select>
        </div>

        <div className="inputWrapper">
          <FaWallet className="inputIcon" />
          <input
            type="text"
            placeholder="Enter your wallet address"
            value={userInput.walletAddress}
            onChange={(e) =>
              setUserInput({ ...userInput, walletAddress: e.target.value })
            }
            className={userInput.walletAddress ? "filled" : ""}
          />
        </div>

        <button
          className={`save-button ${isSaving ? "loading" : ""}`}
          onClick={updateInfo}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <FaSpinner className="spinner" /> Saving...
            </>
          ) : (
            "Save Wallet Details"
          )}
        </button>

        <div className="bank-notice">
          <p>
            Please ensure your wallet address is correct. Double-check the
            address to avoid loss of funds. Make sure you're using the correct
            network type for your selected wallet.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Bank;
