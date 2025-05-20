import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./pageCss/Recharge.css";
import { useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
import toast from "react-hot-toast";
import axios from "axios";

const ChangePin = () => {
  const [showPin, setShowPin] = useState(false);
  const [showNewPin, setNewShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.YATipauy.user);
  const [userInput, setUserInput] = useState({
    oldPin: "",
    newPin: "",
  });

  const API_URL = `https://yaticare-back-end.vercel.app/api/auth/change-pin${user.user._id}`;
  const changePin = async () => {
    if (!userInput.oldPin || !userInput.newPin) {
      toast.error("Please fill in all fields");
      return;
    } else if (userInput.oldPin === userInput.newPin) {
      toast.error("New pin must be different from old pin");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(API_URL, userInput);
      console.log(response);
      setLoading(false);
      toast.success("Pin changed Successfully");
      setUserInput({
        oldPin: "",
        newPin: "",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error changing pin");
    }
  };
  return (
    <div className="w-150 h-100 bg-white flex flex-col gap-5 shadow-md items-center justify-center">
      <h2 className="text-2xl font-bold text-center mb-6">
        Enter Transaction PIN
      </h2>

      <div className="w-120 h-15 flex items-center justify-center border border-gray-400 rounded-sm">
        <input
          type={showPin ? "text" : "password"}
          maxLength={4}
          className="w-100 h-full px-4 py-3 text-center text-lg tracking-widest focus:outline-none mb-6"
          placeholder="Enter current PIN"
          value={userInput.oldPin}
          onChange={(e) =>
            setUserInput({ ...userInput, oldPin: e.target.value })
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
      <div className="w-120 h-15 flex items-center justify-center border border-gray-400 rounded-sm">
        <input
          type={showNewPin ? "text" : "password"}
          maxLength={4}
          className="w-100 h-full px-4 py-3 text-center text-lg tracking-widest focus:outline-none mb-6"
          placeholder="Enter new PIN"
          value={userInput.newPin}
          onChange={(e) =>
            setUserInput({ ...userInput, newPin: e.target.value })
          }
        />
        <span onClick={() => setNewShowPin(!showNewPin)}>
          {showNewPin ? (
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
        className="buttTag"
        disabled={loading}
        style={{ cursor: loading ? "not-allowed" : "pointer" }}
        onClick={changePin}
      >
        {loading ? <PuffLoader size={30} color="white" /> : "Continue"}
      </button>
    </div>
  );
};

export default ChangePin;
