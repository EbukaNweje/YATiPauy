import React, { useState } from "react";
import { FaUser, FaRegCommentDots } from "react-icons/fa";
import "./pageCss/Recharge.css";
import { CiMail } from "react-icons/ci";
import { useSelector } from "react-redux";
import axios from "axios";

const Bank = () => {
  const [userInput, setUserInput] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
  });
  const user = useSelector((state) => state.YATipauy.user);

  const updateInfo = async () => {
    try{
      const response = await axios.put(`https://yaticare-back-end.vercel.app/api/user/updateuser/${user.user._id}`, userInput)
      console.log(response)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className="Bank">
      <h3>Please provide the following details below to proceed</h3>
      <section>
        <div className="inputWrapper">
          <FaUser className="inputIcon" />
          <input
            type="text"
            placeholder="Enter your Bank Account Number"
            value={userInput.accountNumber}
            onChange={(e) =>
              setUserInput({ ...userInput, accountNumber: e.target.value })
            }
          />
        </div>

        <div className="inputWrapper">
          <CiMail className="inputIcon" />
          <select
            value={userInput.bankName}
            onChange={(e) =>
              setUserInput({ ...userInput, bankName: e.target.value })
            }
          >
            <option value="">-- Choose Bank --</option>
            <option value="GTBank">Guaranty Trust Bank</option>
            <option value="Access Bank">Access Bank</option>
            <option value="First Bank">First Bank of Nigeria</option>
            <option value="UBA">United Bank for Africa</option>
            <option value="Zenith Bank">Zenith Bank</option>
            <option value="Stanbic IBTC">Stanbic IBTC Bank</option>
            <option value="Fidelity Bank">Fidelity Bank</option>
            <option value="Polaris Bank">Polaris Bank</option>
            <option value="Union Bank">Union Bank</option>
            <option value="Keystone Bank">Keystone Bank</option>
            <option value="Paycom(opay)">Paycom(opay)</option>
            <option value="Palmpay">Palmpay</option>
            <option value="Moniepoint microfinance Bank">
              Moniepoint microfinance Bank
            </option>
            <option value="KUDA microfinance Bank">
              KUDA microfinance Bank
            </option>
          </select>
        </div>

        <div className="inputWrapper">
          <FaUser className="inputIcon" />
          <input
            type="text"
            placeholder="Enter your Bank Account Name"
            value={userInput.accountName}
            onChange={(e) =>
              setUserInput({ ...userInput, accountName: e.target.value })
            }
          />
        </div>
        <div className="buttTag" onClick={updateInfo}>Save</div>
      </section>
    </div>
  );
};

export default Bank;
