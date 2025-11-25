// Deposit.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import "./pageCss/Deposit.css";
import { FiCopy, FiCheck, FiRefreshCw } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import "animate.css";
import { useNavigate } from "react-router-dom";
import { depositedAmount } from "./Global/Slice";
import axios from "axios";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

/* ------------------ Countdown component ------------------ */
const Countdown = ({ onExpire, initialTimeLeft = 1800, storageKey }) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem(storageKey) || "{}");
    if (stored?.timeLeft) setTimeLeft(stored.timeLeft);
    else setTimeLeft(initialTimeLeft);
  }, [initialTimeLeft, storageKey]);

  useEffect(() => {
    if (timeLeft <= 0) return onExpire();

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          sessionStorage.removeItem(storageKey);
          onExpire();
          return 0;
        }
        sessionStorage.setItem(
          storageKey,
          JSON.stringify({ timeLeft: prev - 1 })
        );
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onExpire, storageKey]);

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return <p className="timer">Expires in {fmt(timeLeft)}</p>;
};

Countdown.propTypes = {
  onExpire: PropTypes.func.isRequired,
  initialTimeLeft: PropTypes.number,
  storageKey: PropTypes.string.isRequired,
};

/* ------------------ Success popup ------------------ */
const RenderPopSuccessful = React.memo(({ onClose }) => (
  <div className="Deposit_Pop">
    <div className="Pop_display animate__animated animate__backInDown">
      <span>Proof submitted, payment under review!</span>
      <button className="Pop_display_btn" onClick={onClose}>
        Ok
      </button>
    </div>
  </div>
));
RenderPopSuccessful.displayName = "RenderPopSuccessful";
RenderPopSuccessful.propTypes = { onClose: PropTypes.func.isRequired };

/* ------------------ Main Deposit component ------------------ */
const Deposit = () => {
  const amount = useSelector((state) => state.YATipauy.depositAmount);
  const userData = useSelector((state) => state.YATipauy.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [wallets, setWallets] = useState([]);
  const [walletLoading, setWalletLoading] = useState(false);
  const [walletError, setWalletError] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("USDT");
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);

  const [copied, setCopied] = useState(false);
  const [proofFile, setProofFile] = useState(null);
  const [proofFileShow, setProofFileShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [proofPaymentPop, setProofPaymentPop] = useState(false);

  const userId = userData?.user?._id || "anon";

  const walletIndexKey = `user_${userId}_walletIndex`;
  const timerKey = `user_${userId}_walletTimer`;

  /* ------------------ Fetch wallets ------------------ */
  const handleGetWalletAddress = useCallback(async () => {
    setWalletLoading(true);
    setWalletError(null);
    try {
      const res = await axios.get(
        "https://yaticare-backend.onrender.com/api/admin/getallWalletAddress"
      );
      const raw = res.data;
      const data = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
        ? raw.data
        : Array.isArray(raw?.wallets)
        ? raw.wallets
        : [];
      setWallets(data || []);
    } catch (err) {
      console.error("Failed to fetch wallets:", err);
      setWalletError("Unable to load wallet addresses.");
      setWallets([]);
    } finally {
      setWalletLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetWalletAddress();
  }, [handleGetWalletAddress]);

  /* ------------------ Wallet rotation & timer reset ------------------ */
  useEffect(() => {
    if (!wallets.length) return;

    let prevIndex = parseInt(localStorage.getItem(walletIndexKey), 10);
    if (isNaN(prevIndex)) prevIndex = -1;

    const newIndex = (prevIndex + 1) % wallets.length;
    setCurrentIndex(newIndex);
    currentIndexRef.current = newIndex;

    localStorage.setItem(walletIndexKey, newIndex);

    // Reset timer
    sessionStorage.setItem(
      timerKey,
      JSON.stringify({ timeLeft: 1800, currentIndex: newIndex })
    );
  }, [wallets, walletIndexKey, timerKey]);

  /* ------------------ Handle expiry ------------------ */
  const handleExpire = useCallback(() => {
    if (!wallets.length) return;

    const newIndex = (currentIndexRef.current + 1) % wallets.length;
    setCurrentIndex(newIndex);
    currentIndexRef.current = newIndex;

    // Update timer
    sessionStorage.setItem(
      timerKey,
      JSON.stringify({ timeLeft: 1800, currentIndex: newIndex })
    );

    // Save for next visit
    localStorage.setItem(walletIndexKey, newIndex);
  }, [wallets, timerKey, walletIndexKey]);

  /* ------------------ Copy address ------------------ */
  const copyAddress = async () => {
    const currentWalletAddress =
      wallets.length > 0 ? wallets[currentIndex]?.walletAddress || "" : "";
    if (!currentWalletAddress) return toast.error("No address available");

    try {
      await navigator.clipboard.writeText(currentWalletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      toast.error("Copy failed");
    }
  };

  /* ------------------ Proof upload ------------------ */
  const handleProofUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setProofFile(e.target.files[0]);
      setProofFileShow(e.target.files[0].name);
    }
  };

  /* ------------------ Payment submission ------------------ */
  const handlePayment = async () => {
    if (!proofFile) return toast.error("Please upload proof of payment");
    if (!userData?.user?._id) return toast.error("User not found");

    const depositWallet =
      wallets.length > 0 ? wallets[currentIndex]?.walletAddress || "" : "";

    if (!depositWallet) return toast.error("No deposit wallet available");

    const formData = new FormData();
    formData.append("userId", userData.user._id);
    formData.append("amount", amount);
    formData.append("PaymentType", paymentMethod);
    formData.append("depositDate", new Date().toLocaleString());
    formData.append("depositWallet", depositWallet);
    formData.append("proofFile", proofFile);

    setLoading(true);
    try {
      const res = await axios.post(
        "https://yaticare-backend.onrender.com/api/deposit/deposit",
        formData
      );
      toast.success(res.data.message || "Deposit submitted");
      setProofPaymentPop(true);
      dispatch(depositedAmount(amount));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClosePayment = () => {
    setProofPaymentPop(false);
    navigate("/dashboard");
  };

  const currentWalletObj = wallets.length > 0 ? wallets[currentIndex] : {};
  const currentWalletAddress = currentWalletObj.walletAddress || "";
  const currentWalletName = currentWalletObj.walletName || "";
  const currentCoin = currentWalletObj.coin || "";

  /* ------------------ Render ------------------ */
  return (
    <div className="Deposit">
      <div className="depositSection">
        <h3>Deposit Amount</h3>

        <div className="Amount_Show">
          <p className="amount">≈ {amount} USDT</p>
        </div>
        <hr />

        <div className="methodSwitch">
          <label>
            <input
              type="radio"
              name="method"
              value="USDT"
              checked={paymentMethod === "USDT"}
              onChange={() => {
                setPaymentMethod("USDT");
                setCurrentIndex(0);
              }}
            />
            Pay with Wallet
          </label>
        </div>

        <div className="addressBox">
          <p>
            <strong>
              {paymentMethod === "USDT"
                ? `Company Wallet Address: ${currentWalletName} `
                : "Company Bank Account:"}
            </strong>
          </p>

          <div className="addressRow">
            {paymentMethod === "USDT" ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p className="address" style={{ wordBreak: "break-all" }}>
                  {walletLoading
                    ? "Loading wallets..."
                    : walletError
                    ? walletError
                    : currentWalletAddress || "No wallet address available"}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    marginTop: 4,
                    color: "#555",
                  }}
                >
                  {currentCoin || " "}
                </p>
              </div>
            ) : (
              <div className="bankDetails">
                <p>No bank selected</p>
              </div>
            )}

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                type="button"
                className="copyBtn"
                onClick={copyAddress}
                disabled={walletLoading || !currentWalletAddress}
              >
                {copied ? <FiCheck /> : <FiCopy />}
              </button>

              <button
                type="button"
                className="copyBtn"
                onClick={handleGetWalletAddress}
                title="Refresh wallets"
                disabled={walletLoading}
              >
                <FiRefreshCw />
              </button>
            </div>
          </div>

          <Countdown onExpire={handleExpire} storageKey={timerKey} />
          {copied && <p className="copyMsg">Copied!</p>}
        </div>

        <div className="proofUpload">
          <p>
            <strong>Upload Proof of Payment:</strong>
          </p>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleProofUpload}
            id="ChooseFile"
            hidden
          />
          <label htmlFor="ChooseFile" className="chooseFileLabel">
            Choose File
          </label>
          {proofFileShow && <p className="fileName">📄 {proofFileShow}</p>}
        </div>

        <button
          type="button"
          className="paidBtn"
          disabled={
            !proofFileShow ||
            proofPaymentPop ||
            loading ||
            walletLoading ||
            !currentWalletAddress
          }
          onClick={handlePayment}
        >
          {loading
            ? " Loading..."
            : proofPaymentPop
            ? " Paid"
            : " Make Payment"}
        </button>
      </div>

      <div className="paymentWarnings">
        <li>1. Minimum Recharge amount $10.</li>
        <li>3. Use only the official company details shown above.</li>
        <li>4. Each recharge requires creating a new deposit order.</li>
        <li>5. Actual payment must match the order amount exactly.</li>
        <li>6. If not reflected after 24 hours, contact support.</li>
        <li>7. Do not share your deposit address or payment receipt.</li>
        <li>8. Official staff will never ask for your password.</li>
      </div>

      {proofPaymentPop && <RenderPopSuccessful onClose={handleClosePayment} />}
    </div>
  );
};

export default Deposit;
