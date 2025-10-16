import React, { useState } from "react";
import "./pageCss/Recharge.css";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { depositedAmount } from "./Global/Slice";
import toast from "react-hot-toast";

const Recharge = () => {
  // const amounts = [5000, 10000, 20000, 50000, 100000, 150000];
  const [selectedAmount, setSelectedAmount] = useState("");
  const dispatch = useDispatch();

  const handleSelectAmount = () => {
    if (!selectedAmount) {
      return toast.error("Amount is required");
    }
    if (Number(selectedAmount) < 2) {
      return toast.error("Minimum Recharge is $2");
    }
    // if (Number(selectedAmount) > 5000) {
    //   return toast.error("Maximum Recharge is $5,000");
    // }
    dispatch(depositedAmount(selectedAmount));
    navigate("/dashboard/deposit");
  };

  const navigate = useNavigate();

  return (
    <div className="Recharge">
      <div className="paymentSection">
        {/* <div className='amountWrap'>
          <h3>Select an amount to recharge</h3>
          <hr />
          <div className='amountDiv'>
            {amounts.map((amount) => (
              <button
                key={amount}
                className={selectedAmount === amount ? 'amountButtonSelected' : ''}
                onClick={() => handleSelectAmount(amount)}
              >
                <h3>${amount.toLocaleString()}</h3>
               { selectedAmount === amount ?  <FaCircleCheck color='teal' size={24}/> : null}
              </button>
            ))}
          </div>
        </div> */}

        <section>
          <h3>Amount To Deposit</h3>
          <hr />
          <input
            type="text"
            value={selectedAmount}
            placeholder="Amount in $"
            onChange={(e) => {
              const value = e.target.value;
              // Only allow numbers or empty string
              if (value === "" || /^[0-9]*$/.test(value)) {
                setSelectedAmount(value);
              }
            }}
          />
        </section>
        <button className="btn" onClick={handleSelectAmount}>
          Continue
        </button>
      </div>

      <div className="paymentWarnings">
        <li>
          1. Minimum Recharge amount $2. If payment is less than $2, the amount
          will not be reflected.
        </li>
        <li>
          2. Maximum Recharge amount $5,000. If payment is greater than $5,000,
          the amount will not be processed.
        </li>
        <li>
          3. Recharge can only be done inside the payment channels on YATicare
          platform.
        </li>
        <li>
          4. Each recharge requires creating a new recharge order and paying to
          the designated beneficiary account on the order. Do not save
          beneficiary accounts to pay.
        </li>
        <li>
          5. The actual payment amount needs to be the same as the recharge
          order amount, otherwise the recharge will fail and the amount will not
          be reflected.
        </li>
        <li>
          6. If the amount is not reflected after 24 Hours, send the payment
          voucher to YATicare customer service for help. Do not disclose your
          payment receipt to prevent others from stealing it.
        </li>
        <li>
          7. Do not transfer money to strangers. Official staff will not
          proactively ask you for your account number and password.
        </li>
        <li>
          8. Do not send the shipping certificate to others to avoid it being
          stolen by others.
        </li>
      </div>
    </div>
  );
};

export default Recharge;
