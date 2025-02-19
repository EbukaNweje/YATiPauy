import React from "react";
import { FaUser, FaRegCommentDots } from "react-icons/fa"; 
import "./pageCss/Recharge.css";
import { CiMail } from "react-icons/ci";


const Bank = () => {
  return (
    <div className="Bank">
      <h3>Please provide the following details below to proceed</h3>
      <section>
        <div className="inputWrapper">
          <FaUser className="inputIcon" />
          <input type="text" placeholder="Enter your Bank Account Number" />
        </div>

        <div className="inputWrapper">
          <CiMail className="inputIcon" />
          <select>
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
          </select>
        </div>

        <div className="inputWrapper">
          <FaUser className="inputIcon" />
          <input type="text" placeholder="Enter your Bank Account Name" />
        </div>

        <button>Save</button>
      </section>
    </div>
  );
};

export default Bank;
