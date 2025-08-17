import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";

const TransactionPin = () => {
  const Nav = useNavigate();
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.YATipauy.user);
  const [userInput, setUserInput] = useState({
    pin: "",
    confirmPin: "",
  });

  console.log("myuse", user);
  const API_URL = `https://yaticare-back-end.vercel.app/api/auth/create-pin${user.user.id}`;
  const submitPin = async () => {
    if (!userInput.pin || !userInput.confirmPin) {
      toast.error("Please fill in all fields");
      return;
    } else if (userInput.pin !== userInput.confirmPin) {
      toast.error("pin must be the same");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(API_URL, userInput);
      console.log(response);
      setLoading(false);
      toast.success("Pin created Successfully");
      setUserInput({
        pin: "",
        confirmPin: "",
      });
      setTimeout(() => {
        Nav("/auth/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-120 h-100 bg-white flex flex-col gap-5 rounded-sm shadow-md items-center justify-center">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Transaction PIN
        </h2>

        <div className="w-90 h-12 flex items-center justify-center border border-gray-400 rounded-sm">
          <input
            type={showPin ? "text" : "password"}
            maxLength={4}
            className="w-75 h-full px-4 py-3 text-center text-lg tracking-widest focus:outline-none mb-6"
            placeholder="Enter Your PIN"
            onChange={(e) =>
              setUserInput({ ...userInput, pin: e.target.value })
            }
          />
          <span onClick={() => setShowPin(!showPin)}>
            {showPin ? (
              <FaEye size={20} cursor={"pointer"} style={{ color: "gray" }} />
            ) : (
              <FaEyeSlash
                size={20}
                cursor={"pointer"}
                style={{ color: "gray" }}
              />
            )}
          </span>
        </div>
        <div className="w-90 h-12 flex items-center justify-center border border-gray-400 rounded-sm">
          <input
            type={showConfirmPin ? "text" : "password"}
            maxLength={4}
            className="w-75 h-full px-4 py-3 text-center text-lg tracking-widest focus:outline-none mb-6"
            placeholder="Confirm Your PIN"
            onChange={(e) =>
              setUserInput({ ...userInput, confirmPin: e.target.value })
            }
          />
          <span onClick={() => setShowConfirmPin(!showConfirmPin)}>
            {showConfirmPin ? (
              <FaEye size={20} cursor={"pointer"} style={{ color: "gray" }} />
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
          onClick={submitPin}
          disabled={loading}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
          className="w-90 h-13 bg-green-700 cursor-pointer flex items-center justify-center text-white py-3 rounded-xl hover:bg-green-800 transition"
        >
          {loading ? <PuffLoader color="white" /> : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default TransactionPin;
