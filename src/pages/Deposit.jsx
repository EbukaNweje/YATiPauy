import React, { useState, useEffect } from "react";
import "./pageCss/Deposit.css";
import { FiCopy, FiCheck } from "react-icons/fi";
import { useSelector } from "react-redux";
import "animate.css";
import { useNavigate } from "react-router-dom";
import { depositedAmount } from "./Global/Slice";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

// ⏳ Countdown Component
// initialTimeLeft (seconds) is used so timer can persist across reloads
const Countdown = ({ onExpire, initialTimeLeft = 1800 }) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  // reset timer when initialTimeLeft changes (e.g., on page load / re-init)
  useEffect(() => {
    setTimeLeft(initialTimeLeft);
  }, [initialTimeLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(interval); // stop timer
          onExpire(); // notify parent
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onExpire, initialTimeLeft]);

  const fmt = (s) => {
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return <p className="timer">Expires in {fmt(timeLeft)}</p>;
};

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

const Deposit = () => {
  const amount = useSelector((state) => state.YATipauy.depositAmount);
  const userData = useSelector((state) => state.YATipauy.user);
  const [proofPaymentPop, setProofPaymentPop] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(userData);

  // useEffect(() => {
  //   fetch(
  //     "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=ngn"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const rate = data.tether.ngn;
  //       setUsdtRate(rate);
  //       setUsdtAmount(amount / rate);
  //     })
  //     .catch((err) => console.error(err));
  // }, [amount]);

  const companyWallets = [
    "WALLET-ADDR-123-ABC",
    "WALLET-ADDR-456-DEF",
    "WALLET-ADDR-789-GHI",
  ];
  const companyBanks = [
    {
      bankName: "Zenith Bank",
      accountName: "John Doe Ltd",
      accountNumber: "1234567890",
    },
    {
      bankName: "Access Bank",
      accountName: "John Doe Ltd",
      accountNumber: "9876543210",
    },
    {
      bankName: "GTB",
      accountName: "John Doe Ltd",
      accountNumber: "1122334455",
    },
  ];

  const [paymentMethod, setPaymentMethod] = useState("USDT");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [proofFile, setProofFile] = useState(null);
  const [initialTimeLeft, setInitialTimeLeft] = useState(1800);

  // storage key for per-user, per-method timer persistence
  const timerStorageKey = () =>
    `deposit_timer_${userData?.user?._id || "anon"}_${paymentMethod}`;

  // Switch address/bank when timer expires and persist timer state
  const handleExpire = () => {
    const list = paymentMethod === "USDT" ? companyWallets : companyBanks;
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % list.length;
      try {
        const key = timerStorageKey();
        const payload = { startedAt: Date.now(), initialIndex: newIndex };
        localStorage.setItem(key, JSON.stringify(payload));
      } catch {
        // ignore storage errors
      }
      // reset countdown for next window
      setInitialTimeLeft(1800);
      return newIndex;
    });
  };

  // initialize timer and currentIndex from localStorage (or create new)
  useEffect(() => {
    const init = () => {
      const key = timerStorageKey();
      const now = Date.now();
      const intervalMs = 1800 * 1000;
      try {
        const raw = localStorage.getItem(key);
        if (!raw) {
          const payload = { startedAt: now, initialIndex: currentIndex };
          localStorage.setItem(key, JSON.stringify(payload));
          setInitialTimeLeft(1800);
          return;
        }
        const saved = JSON.parse(raw);
        const startedAt = saved.startedAt || now;
        const initialIndex =
          typeof saved.initialIndex === "number" ? saved.initialIndex : 0;
        const elapsed = now - startedAt;
        const intervalsPassed = Math.floor(elapsed / intervalMs);
        const list = paymentMethod === "USDT" ? companyWallets : companyBanks;
        const newIndex = (initialIndex + intervalsPassed) % list.length;
        setCurrentIndex(newIndex);
        const nextExpireAt = startedAt + (intervalsPassed + 1) * intervalMs;
        const secsLeft = Math.max(0, Math.round((nextExpireAt - now) / 1000));
        setInitialTimeLeft(secsLeft > 0 ? secsLeft : 0);
      } catch {
        setInitialTimeLeft(1800);
      }
    };
    // run init when paymentMethod or user changes
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, userData]);

  const copyAddress = async () => {
    let text =
      paymentMethod === "USDT"
        ? companyWallets[currentIndex]
        : companyBanks[currentIndex].accountNumber;

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
    } catch (error) {
      console.error("Copy to clipboard failed:", error);
    }
  };

  const handleProofUpload = (e) => {
    if (e.target.files.length > 0) {
      setProofFile(e.target.files[0].name);
    }
  };
  // const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // console.log(userTimeZone);
  const date = new Date().toLocaleString();
  // console.log(date);

  const handlePayment = async () => {
    const url = "https://yaticare-back-end.vercel.app/api/deposit/deposit";

    const data = {
      userId: userData.user._id,
      amount: amount,
      PaymentType: paymentMethod,
      depositDate: date,
    };
    setLoading(true);
    try {
      const res = await axios.post(url, data);
      toast.success(res.data.message);
      setLoading(false);
      // navigate("/dashboard");
      setProofPaymentPop(true);
      // signal other parts of the app (Header) to refresh user data
      dispatch(depositedAmount(amount));
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const handleClosePayment = () => {
    setProofPaymentPop(false);
    navigate("/dashboard");
  };

  return (
    <div className="Deposit">
      <div className="depositSection">
        <h3>Deposit Amount</h3>
        <div className="Amount_Show">
          <p className="amount">≈ {amount} USDT</p>
          {/* <p className="amount">${amount?.toLocaleString()}</p> */}
        </div>
        <hr />

        {/* Payment Method Switch */}
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

        {/* Address/Bank Section */}
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
              <p className="address">{companyWallets[currentIndex]}</p>
            ) : (
              <div className="bankDetails">
                <p>
                  <strong>Bank:</strong> {companyBanks[currentIndex].bankName}
                </p>
                <p>
                  <strong>Account Name:</strong>{" "}
                  {companyBanks[currentIndex].accountName}
                </p>
                <p>
                  <strong>Account Number:</strong>{" "}
                  {companyBanks[currentIndex].accountNumber}
                </p>
              </div>
            )}

            <button type="button" className="copyBtn" onClick={copyAddress}>
              {copied ? <FiCheck /> : <FiCopy />}
            </button>
          </div>

          {/* ⏳ Only this updates every second */}
          <Countdown
            onExpire={handleExpire}
            initialTimeLeft={initialTimeLeft}
          />
          {copied && <p className="copyMsg">Copied!</p>}
        </div>

        {/* Proof of Payment */}
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
          <label htmlFor="ChooseFile">Choose File</label>
          {proofFile && <p className="fileName">📄 {proofFile}</p>}
        </div>

        {/* I Have Paid Button */}
        <button
          type="button"
          className="paidBtn"
          disabled={!proofFile || proofPaymentPop}
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
        {/* <li>2. Maximum Recharge amount $5,000.</li> */}
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
