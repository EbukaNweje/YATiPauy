import React, { useState, useEffect } from "react";
import "./pageCss/Deposit.css";
import { FiCopy, FiCheck } from "react-icons/fi";
import { useSelector } from "react-redux";
import "animate.css";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "./Global/Slice";
import axios from "axios";
import toast from "react-hot-toast";

// ⏳ Countdown Component
const Countdown = ({ paymentMethod, onExpire }) => {
  // 30 minutes = 1800 seconds
  const [timeLeft, setTimeLeft] = useState(1800);

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
  }, [onExpire]);

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

const Deposit = () => {
  const amount = useSelector((state) => state.YATipauy.depositAmout);
  const userData = useSelector((state) => state.YATipauy.user);
  const [proofPaymentPop, setProofPaymentPop] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

  // Switch address/bank when timer expires
  const handleExpire = () => {
    const list = paymentMethod === "USDT" ? companyWallets : companyBanks;
    setCurrentIndex((prev) => (prev + 1) % list.length);
  };

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
    } catch {}
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
      console.log(res);
      toast.success(res.data.message);
      setLoading(false);
      // navigate("/dashboard");
      setProofPaymentPop(true);
    } catch (error) {
      setLoading(false);
      console.log("deposit error", error);
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
          <Countdown paymentMethod={paymentMethod} onExpire={handleExpire} />
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
          disabled={!proofFile}
          onClick={handlePayment}
        >
          {loading ? " Loading..." : " I Have Paid"}
        </button>
      </div>

      <div className="paymentWarnings">
        <li>1. Minimum Recharge amount $10.</li>
        <li>2. Maximum Recharge amount $5,000.</li>
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
