import React, { useState } from 'react';
import './pageCss/Recharge.css';
import { FaCircleCheck } from "react-icons/fa6";


const Recharge = () => {
  const amounts = [ 5000, 10000, 20000, 50000, 100000, 150000];
  const [selectedAmount, setSelectedAmount] = useState(5000);

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
  };

  return (
    <div className='Recharge'>
      <div className='paymentSection'>
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
                <h3>₦{amount.toLocaleString()}</h3>
               { selectedAmount === amount ?  <FaCircleCheck color='teal' size={24}/> : null}
              </button>
            ))}
          </div>
        </div> */}

        <section>
          <h3>Amount To Deposit</h3>
          <hr />
          <input
            type='number'
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(Number(e.target.value) || 5000)}
          />
        </section>
        <button className='btn'>Continue</button>
      </div>

      <div className='paymentWarnings'>
        <li>1. Minimum Recharge amount ₦5,000.00. If payment is less than ₦5,000.00, the amount will not be reflected.</li>
        <li>2. Maximum Recharge amount ₦1,000,000.00. If payment is greater than ₦1,000,000.00, the amount will not be processed.</li>
        <li>3. Recharge can only be done inside the payment channels on YATicare platform.</li>
        <li>4. Each recharge requires creating a new recharge order and paying to the designated beneficiary account on the order. Do not save beneficiary accounts to pay.</li>
        <li>5. The actual payment amount needs to be the same as the recharge order amount, otherwise the recharge will fail and the amount will not be reflected.</li>
        <li>6. If the amount is not reflected after 10 minutes, send the payment voucher to YATicare customer service for help. Do not disclose your payment receipt to prevent others from stealing it.</li>
        <li>7. Do not transfer money to strangers. Official staff will not proactively ask you for your account number and password.</li>
        <li>8. Do not send the shipping certificate to others to avoid it being stolen by others.</li>
      </div>
    </div>
  );
};

export default Recharge;
