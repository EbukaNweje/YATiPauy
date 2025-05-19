import React, { useState } from 'react';
import './pageCss/Recharge.css';
import { FaCircleCheck } from 'react-icons/fa6';

const Withdraw = () => {
  const [selectedAmount, setSelectedAmount] = useState(5000);


  return (
    <div className='Withdraw'>
      <div className='paymentSection'>

        <section>
          <h3>Fill The Details</h3>
          <hr />
          <input
            type='number'
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(Number(e.target.value) || 5000)}
          />
          <input type="text" placeholder='Bank account details' />
        </section>

        <button className='btn'>Continue</button>
      </div>
      <div className='paymentWarnings'>
        <li> Minimum Withdraw amount ₦2,000.00. if payment is less than ₦2,000.00, the amount will not be reflected.</li>
        <li> Maximum Withdraw amount unlimited.</li>
        <li> Withdraw can only be done inside the payment channels on YATicare platform.</li>
        <li> Withdrawal charges is 10% of the amount you're withdrawing.</li>
      </div>
    </div>
  );
};

export default Withdraw;
