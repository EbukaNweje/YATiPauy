import { useState, useEffect } from "react";
import "./pageCss/Recharge.css";
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
      } catch (error) {
        console.error("Error fetching user data:", error);
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
      console.error("Withdraw error:", error.response?.data || error.message);
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
              <input
                type="radio"
                name="walletType"
                value="default"
                checked={walletType === "default"}
                onChange={(e) => setWalletType(e.target.value)}
              />
              Default Wallet ({userData || "Not Set"})
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

      {/* PIN Popup */}
      {showPinPopup && (
        <div
          style={{
            backdropFilter: "blur(2px)",
          }}
          className="h-screen w-full absolute flex justify-center  px-4"
        >
          <div className="w-[90%] sm:w-[400px] md:w-[500px] h-70 bg-white flex flex-col gap-5 shadow-md items-center justify-center p-6 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
              Enter Transaction PIN
            </h2>

            <div className="w-[70%] flex items-center justify-between border border-gray-400 rounded-sm px-3">
              <input
                type={showPin ? "text" : "password"}
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full py-3 text-center text-xl sm:text-2xl tracking-widest focus:outline-none"
                placeholder="••••"
              />
              <span onClick={() => setShowPin(!showPin)}>
                {showPin ? (
                  <FaEye size={20} className="text-gray-500 cursor-pointer" />
                ) : (
                  <FaEyeSlash
                    size={20}
                    className="text-gray-500 cursor-pointer"
                  />
                )}
              </span>
            </div>

            <button
              disabled={loading}
              className="w-[70%] h-[50px] bg-green-700 cursor-pointer text-white py-3 rounded-xl hover:bg-green-800 transition"
              onClick={confirmWithdraw}
            >
              {loading ? "Processing..." : "Withdraw"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdraw;
