import React, { useState } from "react";
import "./pageCss/Recharge.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const Withdraw = () => {
  const [selectedAmount, setSelectedAmount] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [walletType, setWalletType] = useState("default");

  // Mock default wallet - Replace with actual API data
  const defaultWallet = "1234567890";

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
    setShowPin(true);
  };

  return (
    <div className="Withdraw">
      <div className="paymentSection">
        <section>
          <h3>Fill The Details</h3>
          <hr />
          <input
            type="number"
            placeholder="Enter amount ($) to withdraw"
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(Number(e.target.value))}
            min="2"
          />

          <div className="wallet-selection">
            <label>
              <input
                type="radio"
                name="walletType"
                value="default"
                checked={walletType === "default"}
                onChange={(e) => setWalletType(e.target.value)}
              />
              Default Wallet ({defaultWallet})
            </label>
            {/* <label>
              <input
                type="radio"
                name="walletType"
                value="other"
                checked={walletType === "other"}
                onChange={(e) => setWalletType(e.target.value)}
              />
              Other Wallet
            </label> */}
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
      <div className="paymentWarnings">
        <li>
          Minimum withdrawal amount is $2.00. If payment is less than $2.00, the
          amount will not be processed.
        </li>
        <li>Maximum withdrawal amount is unlimited.</li>
        <li>
          Withdrawals can only be processed through approved payment channels on
          the platform.
        </li>
        <div className="gst-notice">
          <h4>GST Notice</h4>
          <p>
            The Goods and Services Tax (GST) was introduced by the Howard
            Government of Australia and commenced on 1 July 2000, replacing the
            Federal Service Sales Tax System and designed to phase out a number
            of various State and Territory Government taxes, duties and levies.
          </p>
          <p>
            All participants of YATiCare are mandated to pay a 10% surcharge of
            all withdrawals, in line with the extant tax laws of Australia.
          </p>
        </div>
      </div>
      {showPin ? (
        <div
          style={{
            backdropFilter: "blur(2px)",
          }}
          className="h-screen w-full absolute flex justify-center px-4"
        >
          <div className="w-120 h-70 bg-white flex flex-col gap-5 shadow-md items-center justify-center">
            <h2 className="text-2xl font-bold text-center mb-6">
              Enter Transaction PIN
            </h2>

            <div className="w-90 h-15 flex items-center justify-center border border-gray-400 rounded-sm">
              <input
                type={showPin ? "text" : "password"}
                maxLength={4}
                className="w-75 h-full px-4 py-3 text-center text-2xl tracking-widest focus:outline-none mb-6"
                placeholder="••••"
              />
              <span onClick={() => setShowPin(!showPin)}>
                {showPin ? (
                  <FaEye
                    size={20}
                    cursor={"pointer"}
                    style={{ color: "gray" }}
                  />
                ) : (
                  <FaEyeSlash
                    size={20}
                    cursor={"pointer"}
                    style={{ color: "gray" }}
                  />
                )}
              </span>
            </div>

            <button
              className="w-90 h-15 bg-green-700 cursor-pointer text-white py-3 rounded-xl hover:bg-green-800 transition"
              onClick={() => setShowPin(false)}
            >
              Continue
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Withdraw;
