import React, { useState, useEffect } from "react";
import "./pageCss/Plan.css";
import { FaChevronRight, FaCheck } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Plan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [plansData, setPlansData] = useState([]);

  const location = useLocation();
  const { selectedPlanName } = location.state || {};

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "https://yaticare-backend.onrender.com/api/getallplan"
        );
        console.log("this is the plan", response.data);

        // Map backend fields into usable frontend structure
        const mappedPlans = response.data.data.map((plan) => {
          // Generate increments between min and max
          const increments = [];
          if (plan.minimumDeposit && plan.maximumDeposit) {
            const step = Math.floor(
              (plan.maximumDeposit - plan.minimumDeposit) / 4
            );
            for (
              let amt = plan.minimumDeposit;
              amt <= plan.maximumDeposit;
              amt += step
            ) {
              increments.push(amt);
            }
            if (!increments.includes(plan.maximumDeposit)) {
              increments.push(plan.maximumDeposit);
            }
          }

          return {
            ...plan,
            amounts: increments, // attach amounts array
          };
        });

        setPlansData(mappedPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    if (selectedPlanName && plansData.length > 0) {
      const matchingPlan = plansData.find(
        (plan) => plan.planName.toUpperCase() === selectedPlanName.toUpperCase()
      );
      if (matchingPlan) {
        setSelectedPlan(matchingPlan);
        setSelectedAmount(null);
        setCustomAmount("");
      }
    }
  }, [location.key, plansData, selectedPlanName]);

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
        {plansData.length === 0 ? (
          <p>Loading plans...</p>
        ) : (
          plansData?.map((plan, index) => (
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
                <h3 className="plan-title">{plan.planName}</h3>
                <p className="plan-amount">
                  ${plan.minimumDeposit.toLocaleString()} - $
                  {plan.maximumDeposit.toLocaleString()}
                </p>
                <p className="plan-amount">
                  Duration: {plan.durationDays} days
                </p>
              </div>
              <FaChevronRight className="arrowIcon" />
            </div>
          ))
        )}

        {selectedPlan && (
          <div className="modal-overlay">
            <div className="plan-modal">
              <h3 className="modal-title">{selectedPlan.planName}</h3>
              <p className="modal-amount">
                ${selectedPlan.minimumDeposit.toLocaleString()} - $
                {selectedPlan.maximumDeposit.toLocaleString()}
              </p>

              {/* Amount selection */}
              <div className="amount-options">
                {selectedPlan.amounts.map((amount, index) => (
                  <div
                    key={index}
                    className={`amount-box ${
                      selectedAmount === amount ? "selected" : ""
                    }`}
                    onClick={() => handleAmountSelection(amount)}
                  >
                    ${amount.toLocaleString()}
                    {selectedAmount === amount && (
                      <FaCheck className="check-icon" />
                    )}
                  </div>
                ))}
              </div>

              {/* Custom amount */}
              <div className="custom-amount">
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                />
              </div>

              <button className="subscribe-btn">Subscribe</button>
              <button
                className="close-btn"
                onClick={() => setSelectedPlan(null)}
              >
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
