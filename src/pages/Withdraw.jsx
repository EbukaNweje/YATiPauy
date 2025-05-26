import React, { useState } from "react";
import "./pageCss/Recharge.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const Withdraw = () => {
  const [selectedAmount, setSelectedAmount] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [showPin, setShowPin] = useState(false);

  const handleWithdraw = () => {
    if (!selectedAmount && !bankDetails) {
      toast.error("Please fill in all fields before proceeding.");
      return;
    }
    else if (!selectedAmount) {
      toast.error("Please fill in amount before proceeding.");
      return;
    }
    else if (!bankDetails) {
      toast.error("Please enter bank details before proceeding.");
      return;
    }
    else if (selectedAmount < 2000) {
      toast.error("Minimum withdraw amount is ₦2,000.00");
      return;
    }else {
    setShowPin(true);
  }
  }

  return (
    <div className="Withdraw">
      <div className="paymentSection">
        <section>
          <h3>Fill The Details</h3>
          <hr />
          <input
            type="number"
            placeholder="Enter amount to withdraw"
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(Number(e.target.value) || 5000)}
          />
          <input
            type="text"
            placeholder="Bank account details"
            value={bankDetails}
            onChange={(e) => setBankDetails(e.target.value)}
          />
        </section>

        <button className="btn" onClick={handleWithdraw}>
          Continue
        </button>
      </div>
      <div className="paymentWarnings">
        <li>
          {" "}
          Minimum Withdraw amount ₦2,000.00. if payment is less than ₦2,000.00,
          the amount will not be reflected.
        </li>
        <li> Maximum Withdraw amount unlimited.</li>
        <li>
          {" "}
          Withdraw can only be done inside the payment channels on YATicare
          platform.
        </li>
        <li> Withdrawal charges is 10% of the amount you're withdrawing.</li>
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
