// Deposit.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import "./pageCss/Deposit.css";
import { FiCopy, FiCheck } from "react-icons/fi";
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

  // init from persisted start time
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const { startedAt } = JSON.parse(stored);
        const elapsed = Math.floor((Date.now() - startedAt) / 1000);
        const remaining = initialTimeLeft - elapsed;
        setTimeLeft(remaining > 0 ? remaining : 0);
        return;
      }
    } catch (e) {
      // ignore parse errors
    }
    // first time
    localStorage.setItem(storageKey, JSON.stringify({ startedAt: Date.now() }));
    setTimeLeft(initialTimeLeft);
  }, [initialTimeLeft, storageKey]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          localStorage.removeItem(storageKey);
          onExpire();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [timeLeft, onExpire, storageKey]);

  useEffect(() => {
    setTimeLeft(initialTimeLeft);
  }, [initialTimeLeft]);

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

  const [wallets, setWallets] = useState([]); // API wallet objects [{walletName, walletAddress, ...}]
  const [paymentMethod, setPaymentMethod] = useState("USDT");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [proofFile, setProofFile] = useState(null);
  const [proofFileShow, setProofFileShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [proofPaymentPop, setProofPaymentPop] = useState(false);
  const [initialTimeLeft, setInitialTimeLeft] = useState(1800); // 30 minutes default

  const currentIndexRef = useRef(currentIndex);

  // timer storage key per user+method
  const timerStorageKey = useCallback(
    () => `deposit_timer_${userData?.user?._id || "anon"}_${paymentMethod}`,
    [userData, paymentMethod]
  );

  // fetch wallets from backend
  const handleGetWalletAddress = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://omega-exchange-back-end-one.vercel.app/api/getallWalletAddress"
      );
      // expect res.data to be an array of {walletName, walletAddress, ...}
      const data = Array.isArray(res.data) ? res.data : res.data?.wallets || [];
      setWallets(data);
      // if there is persisted index, keep it; otherwise reset safe index
      const stored = localStorage.getItem(timerStorageKey());
      console.log("stored", stored);
      if (!stored && data.length > 0) {
        const newIndex = 0;
        const payload = { startedAt: Date.now(), initialIndex: newIndex };
        localStorage.setItem(timerStorageKey(), JSON.stringify(payload));
        setCurrentIndex(newIndex);
        currentIndexRef.current = newIndex;
      } else if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const idx =
            typeof parsed.initialIndex === "number" ? parsed.initialIndex : 0;
          setCurrentIndex(idx % Math.max(1, data.length));
          currentIndexRef.current = idx % Math.max(1, data.length);
        } catch {
          setCurrentIndex(0);
          currentIndexRef.current = 0;
        }
      }
    } catch (err) {
      console.error("Failed to fetch wallets:", err);
      setWallets([]);
    }
  }, [timerStorageKey]);

  useEffect(() => {
    handleGetWalletAddress();
  }, [handleGetWalletAddress]);

  // handle expiry -> rotate index and reset timer
  const handleExpire = useCallback(() => {
    if (paymentMethod === "USDT" && wallets.length === 0) return;
    const len = paymentMethod === "USDT" ? wallets.length : 1; // bank handling fallback
    if (len === 0) return;
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % len;
      currentIndexRef.current = newIndex;
      // persist new timer start and index
      localStorage.setItem(
        timerStorageKey(),
        JSON.stringify({ startedAt: Date.now(), initialIndex: newIndex })
      );
      setInitialTimeLeft(1800);
      return newIndex;
    });
  }, [wallets, paymentMethod, timerStorageKey]);

  // copy address (wallet or bank)
  const copyAddress = async () => {
    let text = "";
    if (paymentMethod === "USDT") {
      text =
        wallets.length > 0 ? wallets[currentIndex]?.walletAddress || "" : "";
    } else {
      // fallback bank details
      text = "bank-account-placeholder";
    }
    if (!text) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error("copy failed", err);
    }
  };

  const handleProofUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setProofFile(e.target.files[0]);
      setProofFileShow(e.target.files[0].name);
    }
  };

  const handlePayment = async () => {
    if (!proofFile) return toast.error("Please upload proof of payment");
    if (!userData?.user?._id) return toast.error("User not found");

    const url = "https://yaticare-backend.onrender.com/api/deposit/deposit";
    const date = new Date().toLocaleString();

    const formData = new FormData();
    formData.append("userId", userData.user._id);
    formData.append("amount", amount);
    formData.append("PaymentType", paymentMethod);
    formData.append("depositDate", date);

    const depositWallet =
      paymentMethod === "USDT"
        ? wallets.length > 0
          ? wallets[currentIndex]?.walletAddress || ""
          : ""
        : ""; // add bank if used

    formData.append("depositWallet", depositWallet);
    formData.append("proofFile", proofFile);

    setLoading(true);
    try {
      // Let axios set multipart/form-data and boundary
      const res = await axios.post(url, formData);
      toast.success(res.data.message || "Deposit submitted");
      setProofPaymentPop(true);
      dispatch(depositedAmount(amount));
    } catch (err) {
      console.error("upload error:", err);
      const msg = err?.response?.data?.message || "Upload failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleClosePayment = () => {
    setProofPaymentPop(false);
    navigate("/dashboard");
  };

  // render current wallet display values
  const currentWalletObj = wallets.length > 0 ? wallets[currentIndex] : null;
  const currentWalletAddress = currentWalletObj?.walletAddress || "";
  const currentWalletName = currentWalletObj?.walletName || "";

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
          {/* Uncomment to enable bank method */}
          {/* <label>
            <input
              type="radio"
              name="method"
              value="BANK"
              checked={paymentMethod === "BANK"}
              onChange={() => {
                setPaymentMethod("BANK");
                setCurrentIndex(0);
              }}
            />
            Pay with Bank
          </label> */}
        </div>

        <div className="addressBox">
          <p>
            <strong>
              {paymentMethod === "USDT"
                ? "Company Wallet Address:"
                : "Company Bank Account:"}
            </strong>
          </p>

          <div className="addressRow">
            {paymentMethod === "USDT" ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p className="address" style={{ wordBreak: "break-all" }}>
                  {currentWalletAddress ||
                    (wallets.length === 0
                      ? "Loading wallets..."
                      : "No wallet address available")}
                </p>
                <p style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>
                  {currentWalletName || ""}
                </p>
              </div>
            ) : (
              <div className="bankDetails">
                {/* Add bank details UI if you enable BANK */}
                <p>No bank selected</p>
              </div>
            )}

            <button type="button" className="copyBtn" onClick={copyAddress}>
              {copied ? <FiCheck /> : <FiCopy />}
            </button>
          </div>

          <Countdown
            onExpire={handleExpire}
            initialTimeLeft={initialTimeLeft}
            storageKey={timerStorageKey()}
          />
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
