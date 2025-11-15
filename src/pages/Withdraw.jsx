import { useState, useEffect } from "react";
import "./pageCss/Recharge.css";
import "./pageCss/Withdraw.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { depositedAmount } from "./Global/Slice";
import { useDispatch } from "react-redux";

const Withdraw = () => {
  const user = useSelector((state) => state.YATipauy.user);
  const [selectedAmount, setSelectedAmount] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showPinPopup, setShowPinPopup] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [walletType, setWalletType] = useState("default");
  const [userData, setUserData] = useState(null);
  const [pin, setPin] = useState(""); // <-- capture PIN
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://yaticare-back-end.vercel.app/api/user/userdata/${user.user._id}`
        );
        const data = response?.data?.data;
        setUserData(data?.WalletInfo?.WalletAddress);
      } catch {
        // Error handling logic can be added here if needed
      }
    };
    fetchUserData();
  }, [user.user._id]);

  const handleWithdraw = () => {
    if (!selectedAmount) {
      toast.error("Please fill in amount before proceeding.");
      return;
    }
    if (walletType === "other" && !bankDetails) {
      toast.error("Please enter bank details before proceeding.");
      return;
    }
    if (selectedAmount < 2) {
      toast.error("Minimum withdrawal amount is $2.00");
      return;
    }
    setShowConfirmationPopup(true);
  };

  const closeConfirmationPopup = () => {
    setShowConfirmationPopup(false);
  };

  const confirmWithdrawPopup = () => {
    setShowConfirmationPopup(false);
    setShowPinPopup(true);
  };

  const confirmWithdraw = async () => {
    if (!pin || pin.length !== 4) {
      toast.error("Please enter your 4-digit PIN.");
      return;
    }
    // console.log({ userId: user.user._id });

    try {
      const url =
        "https://yaticare-back-end.vercel.app/api/withdrawal/createWithdrawal";

      setLoading(true);
      const date = new Date().toLocaleString();

      const res = await axios.post(url, {
        amount: selectedAmount,
        method: walletType === "default" ? "USDT" : "BANK",
        walletAddress: walletType === "default" ? userData : bankDetails,
        pin,
        accountName: user.user.userName,
        userId: user.user._id,
        withdrawalDate: date,
      });
      console.log(res);
      toast.success(res.data.message);
      setShowPinPopup(false);
      setSelectedAmount("");
      setPin("");
      navigate("/dashboard");
      dispatch(depositedAmount(Date.now()));
    } catch (error) {
      // console.error("Withdraw error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Withdrawal failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Withdraw">
      <div className="paymentSection">
        <section>
          <h3>Fill The Details</h3>
          <hr />
          <input
            type="text"
            placeholder="Enter amount ($) to withdraw"
            value={selectedAmount}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[0-9]*$/.test(value)) {
                setSelectedAmount(value);
              }
            }}
            min="2"
          />

          <div className="wallet-selection">
            <label>
              {/* <input
                type="radio"
                name="walletType"
                value="default"
                checked={walletType === "default"}
                onChange={(e) => setWalletType(e.target.value)}
              /> */}
              <b>Default Wallet</b> ({userData || "Not Set"})
            </label>
          </div>

          {walletType === "other" && (
            <input
              type="text"
              placeholder="Enter wallet address"
              value={bankDetails}
              onChange={(e) => setBankDetails(e.target.value)}
            />
          )}
        </section>

        <button className="btn" onClick={handleWithdraw}>
          Continue
        </button>
      </div>
      {/* Confirmation Popup */}
      {showConfirmationPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <div className="popup-header">
              <h2>Confirm Withdrawal</h2>
              <p>Please review your withdrawal details</p>
            </div>

            <div className="amount-display">
              <div className="amount-row">
                <span className="amount-label">Withdrawal Amount:</span>
                <span className="amount-value">${selectedAmount}</span>
              </div>
              <div className="amount-row">
                <span className="amount-label">Processing Fee (15%):</span>
                <span className="amount-value">
                  ${(selectedAmount * 0.15).toFixed(2)}
                </span>
              </div>
              <div className="amount-row total-amount">
                <span className="amount-label">Total Amount:</span>
                <span className="amount-value">
                  ${(selectedAmount - selectedAmount * 0.15).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="popup-buttons">
              <button
                className="popup-btn confirm-btn"
                onClick={confirmWithdrawPopup}
              >
                Confirm Withdrawal
              </button>
              <button
                className="popup-btn close-btn"
                onClick={closeConfirmationPopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}{" "}
      {/* PIN Popup */}
      {showPinPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <span
              className="close-popup"
              onClick={() => setShowPinPopup(false)}
            >
              x
            </span>
            <div className="popup-header">
              <h2>Enter Transaction PIN</h2>
              <p>Please enter your 4-digit security PIN</p>
            </div>

            <div className="pin-input-container">
              <div style={{ position: "relative" }}>
                <input
                  type={showPin ? "text" : "password"}
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="pin-input"
                  placeholder="••••"
                />
                <span
                  className="pin-toggle"
                  onClick={() => setShowPin(!showPin)}
                >
                  {showPin ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                </span>
              </div>
            </div>

            <div className="popup-buttons">
              <button
                disabled={loading}
                className="popup-btn confirm-btn"
                onClick={confirmWithdraw}
              >
                {loading ? (
                  <span>
                    Processing... <span className="loading-dots"></span>
                  </span>
                ) : (
                  "Complete Withdrawal"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="paymentWarnings">
        <li>
          To ensure transparency and regulatory compliance, a total withdrawal
          charge of 15% will be applied. This consists of a 10% Goods and
          Services Tax (GST) mandated by Australian law, and a 5% Community
          Empowerment Fee dedicated to a pool that rewards members for marketing
          and promotional activities, fostering collective growth thereby
          creating earning opportunities for you. By proceeding, you acknowledge
          and agree to this structure.
        </li>
        {/* <li>3. Use only the official company details shown above.</li>
        <li>4. Each recharge requires creating a new deposit order.</li>
        <li>5. Actual payment must match the order amount exactly.</li>
        <li>6. If not reflected after 24 hours, contact support.</li>
        <li>7. Do not share your deposit address or payment receipt.</li>
        <li>8. Official staff will never ask for your password.</li> */}
      </div>
    </div>
  );
};

export default Withdraw;
