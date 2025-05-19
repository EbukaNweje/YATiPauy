import React, { useState, useEffect } from "react";
import "./pageCss/Plan.css";
import { FaChevronRight, FaCheck } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const plans = [
  {
    name: "YATI STARTER",
    minAmount: 5000,
    maxAmount: 9000,
    amounts: [5000, 6000, 7000, 8000, 9000],
    benefits: ["Local transport", "Basic daily feeding"],
  },
  {
    name: "YATI HOPE EXPLORER",
    minAmount: 10000,
    maxAmount: 49000,
    amounts: [10000, 20000, 30000, 40000, 49000],
    benefits: ["Short local trips", "Budget-friendly rental accommodation"],
  },
  {
    name: "YATI BRIGHTER HORIZON",
    minAmount: 50000,
    maxAmount: 99000,
    amounts: [50000, 60000, 70000, 80000, 90000, 99000],
    benefits: [
      "Expanded interstate travel",
      "Partial support for asset acquisition",
      "Better vacation experiences",
      "School fees support",
    ],
  },
  {
    name: "YATI EMPOWER PASS",
    minAmount: 100000,
    maxAmount: 399000,
    amounts: [100000, 150000, 200000, 300000, 399000],
    benefits: [
      "Premium local and international travel support",
      "Quality vacation packages",
      "Fixed asset financing",
    ],
  },
  {
    name: "YATI ELITE STARS",
    minAmount: 400000,
    maxAmount: 799000,
    amounts: [400000, 500000, 600000, 700000, 799000],
    benefits: ["Top-tier travel experience", "Car projects", "Quality healthcare"],
  },
  {
    name: "YATI DIAMOND",
    minAmount: 800000,
    maxAmount: 1000000,
    amounts: [800000, 850000, 900000, 950000, 1000000],
    benefits: ["Exclusive premium benefits", "VIP support"],
  },
];

const Plan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  const location = useLocation();
  const { selectedPlanName } = location.state || {};
  console.log(selectedPlanName)
  
  useEffect(() => {
    if (selectedPlanName) {
      const matchingPlan = plans.find(
        (plan) => plan.name.toLowerCase() === selectedPlanName.toLowerCase()
      );
      if (matchingPlan) {
        setSelectedPlan(matchingPlan);
        setSelectedAmount(null);
        setCustomAmount("");
      }
    }
  }, [location.key]); 

  const handleAmountSelection = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(amount);
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(value);
  };

  return (
    <div className="Plan">
      <div className="plan-container">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="plan-box"
            onClick={() => {
              setSelectedPlan(plan);
              setSelectedAmount(null);
              setCustomAmount("");
            }}
          >
            <div className="planBoxInfo">
              <h3 className="plan-title">{plan.name}</h3>
              <p className="plan-amount">
                ₦{plan.minAmount.toLocaleString()} - ₦{plan.maxAmount.toLocaleString()}
              </p>
            </div>
            <FaChevronRight className="arrowIcon" />
          </div>
        ))}

        {selectedPlan && (
          <div className="modal-overlay">
            <div className="plan-modal">
              <h3 className="modal-title">{selectedPlan.name}</h3>
              <p className="modal-amount">
                ₦{selectedPlan.minAmount.toLocaleString()} - ₦{selectedPlan.maxAmount.toLocaleString()}
              </p>

              <div className="amount-options">
                {selectedPlan.amounts.map((amount, index) => (
                  <div
                    key={index}
                    className={`amount-box ${selectedAmount === amount ? "selected" : ""}`}
                    onClick={() => handleAmountSelection(amount)}
                  >
                    ₦{amount.toLocaleString()}
                    {selectedAmount === amount && <FaCheck className="check-icon" />}
                  </div>
                ))}
              </div>

              <div className="custom-amount">
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                />
              </div>

              <button className="subscribe-btn">Subscribe</button>
              <button className="close-btn" onClick={() => setSelectedPlan(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;
