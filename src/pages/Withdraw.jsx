import React, { useState } from 'react';
import './pageCss/Recharge.css';
import { FaCircleCheck } from 'react-icons/fa6';

const Withdraw = () => {
  const amounts = [ 5000, 10000, 20000, 50000, 100000, 150000];
  const [selectedAmount, setSelectedAmount] = useState(5000);
  const [selectedBank, setSelectedBank] = useState('');

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
  };

  const banks = [
    "Access Bank", "Citibank", "Ecobank", "Fidelity Bank", "First Bank",
    "First City Monument Bank (FCMB)", "Globus Bank", "Guaranty Trust Bank (GTB)", 
    "Heritage Bank", "Jaiz Bank", "Keystone Bank", "Parallex Bank", "Polaris Bank",
    "Providus Bank", "Stanbic IBTC Bank", "Standard Chartered Bank", "Sterling Bank",
    "SunTrust Bank", "Titan Trust Bank", "Union Bank", "United Bank for Africa (UBA)", 
    "Unity Bank", "Wema Bank", "Zenith Bank, Paycom(opay), palmpay, KUDA microfinance Bank, Moniepoint microfinance Bank"
  ];

  return (
    <div className='Withdraw'>
      <div className='paymentSection'>
        <div className='amountWrap'>
          <h3>Select an amount to withdraw</h3>
          <hr />
          <div className='amountDiv'>
            {amounts.map((amount) => (
              <button
                key={amount}
                className={selectedAmount === amount ? 'amountButtonSelected' : ''}
                onClick={() => handleSelectAmount(amount)}
              >
                <h3>₦{amount.toLocaleString()}</h3>
                {selectedAmount === amount ? <FaCircleCheck color='teal' size={24} /> : null}
              </button>
            ))}
          </div>
        </div>

        <section>
          <h3>Fill The Details</h3>
          <hr />
          <input
            type='number'
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(Number(e.target.value) || 5000)}
          />

          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          >
            <option value="">-- Choose Bank --</option>
            {banks.map((bank, index) => (
              <option key={index} value={bank}>
                {bank}
              </option>
            ))}
          </select>

          <input type="number" placeholder='Bank account number' />
          <input type="text" placeholder='Bank account name' />
        </section>

        <button className='btn'>Continue</button>
      </div>
      <div className='paymentWarnings'>
        <li>1. Minimum Withdraw amount ₦5,000.00. if payment is less than ₦5,000.00, the amount will not be reflected.</li>
        <li>2. Maximum Withdraw amount ₦500,000.00. if withdrawal is greater than ₦500,000.00, the withdrawal will not be processed.</li>
        <li>3. Withdraw can only be done inside the payment channels on YATicare platform.</li>
        <li>4. Withdrawal charges is 0% of the amount you're withdrawing.</li>

      </div>
    </div>
  );
};

export default Withdraw;
