import React, { useState } from "react";
import "./pageCss/Plan.css";

const plans = [
  {
    name: "YATI STARTER",
    minAmount: "₦5,000",
    maxAmount: "₦9,000",
    benefits: [
      "Local transport",
      "Basic daily feeding",
    ],
  },
  {
    name: "YATI HOPE EXPLORER",
    minAmount: "₦10,000",
    maxAmount: "₦49,000",
    benefits: [
      "Short local trips",
      "Budget-friendly rental accommodation",
    ],
  },
  {
    name: "YATI BRIGHTER HORIZON",
    minAmount: "₦50,000",
    maxAmount: "₦99,000",
    benefits: [
      "Expanded interstate travel",
      "Partial support for asset acquisition",
      "Better vacation experiences",
      "School fees support",
    ],
  },
  {
    name: "YATI EMPOWER PASS",
    minAmount: "₦100,000",
    maxAmount: "₦399,000",
    benefits: [
      "Premium local and international travel support",
      "Quality vacation packages",
      "Fixed asset financing",
    ],
  },
  {
    name: "YATI ELITE STARS",
    minAmount: "₦400,000",
    maxAmount: "₦799,000",
    benefits: [
      "Top-tier travel experience",
      "Car projects",
      "Quality healthcare",
    ],
  },
  {
    name: "YATI DIAMOND",
    minAmount: "₦800,000",
    maxAmount: "₦1,000,000",
    benefits: [
      "Exclusive premium benefits",
      "VIP support",
    ],
  },
];

const Plan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="plan-container">
      {plans.map((plan, index) => (
        <div 
          key={index} 
          className="plan-box" 
          onClick={() => setSelectedPlan(plan)}
        >
          <h3 className="plan-title">{plan.name}</h3>
          <p className="plan-amount">{plan.minAmount} - {plan.maxAmount}</p>
        </div>
      ))}

      {selectedPlan && (
        <div className="modal-overlay">
          <div className="plan-modal">
            <h3 className="modal-title">{selectedPlan.name}</h3>
            <p className="modal-amount">
              {selectedPlan.minAmount} - {selectedPlan.maxAmount}
            </p>
            <ul className="benefits-list">
              {selectedPlan.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <button className="subscribe-btn">Subscribe</button>
            <button className="close-btn" onClick={() => setSelectedPlan(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plan;
