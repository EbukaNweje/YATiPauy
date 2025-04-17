import React from "react";
import "./howItWorks.css";
import heroImg from "../assets/WEPROVIDE.png"; // Ensure correct image path

const HowItWorks = () => {
  return (
    <div className="HowItWorksWrapper">
      <div className="leftSide">
        <h1>How It Works</h1>
        <p className="intro-text">
          Join <span className="brand">YATiCare</span> by creating an account and making a deposit.
          <br />
          <strong>Limit:</strong> N5,000 - N1,000,000
        </p>

        <div className="info-box">
          <h3>📈 Return Policy</h3>
          <p>
            Earn <strong>20%</strong> of your deposit daily or a total of <strong>140%</strong> weekly.
          </p>
          <p>Initial deposit must be recycled every 7 days.</p>
        </div>

        <div className="info-box">
          <h3>🎁 Bonuses</h3>
          <p>💰 <strong>Referral Bonus:</strong> 15% from direct downlines.</p>
          <p>🔄 <strong>Recycled Packages:</strong> 1.5% commission.</p>
        </div>

        <div className="info-box">
          <h3>💵 Withdrawals</h3>
          <p>Minimum withdrawal: <strong>N2,000</strong>.</p>
        </div>
      </div>

      <div className="rightSide">
        <img src={heroImg} alt="How It Works" className="howItWorksImg" />
      </div>
    </div>
  );
};

export default HowItWorks;
