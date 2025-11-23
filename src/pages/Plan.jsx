import { useState, useEffect } from "react";
import "./pageCss/Plan.css";
import { FaChevronRight, FaCheck } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { depositedAmount } from "./Global/Slice";
import toast from "react-hot-toast";

const Plan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [plansData, setPlansData] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const { selectedPlanName } = location.state || {};
  const user = useSelector((state) => state.YATipauy.user);
  const dispatch = useDispatch();
  const date = new Date().toLocaleString();

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://yaticare-backend.onrender.com/api/getallplan"
        );

        const mappedPlans = response.data.data.map((plan) => {
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
            amounts: increments,
          };
        });

        setPlansData(mappedPlans);
      } catch (error) {
        toast.error("Failed to load plans");
        // console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
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

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  const handleSubscribeClick = () => {
    if (!selectedPlan || !selectedAmount) {
      toast.error("Please select a plan and amount.");
      return;
    }

    const amountNum = Number(selectedAmount);
    if (
      amountNum < selectedPlan.minimumDeposit ||
      amountNum > selectedPlan.maximumDeposit
    ) {
      toast.error(
        `Amount must be between $${selectedPlan.minimumDeposit} and $${selectedPlan.maximumDeposit}`
      );
      return;
    }

    if (!user?.user?._id) {
      toast.error("User not logged in.");
      return;
    }

    setShowConfirmation(true);
  };

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const amountNum = Number(selectedAmount);
      const response = await axios.post(
        "https://yaticare-backend.onrender.com/api/userSubcription",
        {
          userId: user.user._id,
          plan: selectedPlan._id,
          amount: amountNum,
          durationInDays: selectedPlan.durationDays,
          subscriptionDate: date,
        }
      );

      if (response.data.message.includes("created")) {
        toast.success("Subscription created successfully!");
        setSelectedPlan(null);
        setSelectedAmount(null);
        setCustomAmount("");
        setShowConfirmation(false);
        dispatch(depositedAmount(Date.now()));
      } else {
        toast.error(response.data.data.message || "Subscription failed");
        console.log(response.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.error("Subscription error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Plan">
      <div className="plan-container">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading plans...</p>
          </div>
        ) : plansData.length === 0 ? (
          <div className="no-plans">
            <p>No plans available</p>
          </div>
        ) : (
          plansData.map((plan, index) => (
            <div
              key={index}
              className={`plan-box ${
                selectedPlan?._id === plan._id ? "active" : ""
              }`}
              onClick={() => {
                setSelectedPlan(plan);
                setSelectedAmount(null);
                setCustomAmount("");
              }}
            >
              <div className="planBoxInfo">
                <h3 className="plan-title">{plan.planName}</h3>
                <p className="plan-amount">
                  <span className="amount-range">
                    ${plan.minimumDeposit.toLocaleString()} - $
                    {plan.maximumDeposit.toLocaleString()}
                  </span>
                </p>
                <p className="plan-duration">
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
              <div className="modal-header">
                <h3 className="modal-title">{selectedPlan.planName}</h3>
                <p className="modal-amount">
                  ${selectedPlan.minimumDeposit.toLocaleString()} - $
                  {selectedPlan.maximumDeposit.toLocaleString()}
                </p>
              </div>

              <div className="amount-options">
                {selectedPlan.amounts.map((amount, index) => (
                  <div
                    key={index}
                    className={`amount-box ${
                      Number(selectedAmount) === amount ? "selected" : ""
                    }`}
                    onClick={() => handleAmountSelection(amount)}
                  >
                    ${amount.toLocaleString()}
                    {Number(selectedAmount) === amount && (
                      <FaCheck className="check-icon" />
                    )}
                  </div>
                ))}
              </div>

              <div className="custom-amount">
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  min={selectedPlan.minimumDeposit}
                  max={selectedPlan.maximumDeposit}
                />
              </div>

              <div className="button-group">
                <button
                  className="subscribe-btn"
                  onClick={handleSubscribeClick}
                  disabled={loading || !selectedAmount}
                >
                  {loading ? (
                    <span>
                      Processing... <div className="loading-spinner"></div>
                    </span>
                  ) : (
                    "Continue"
                  )}
                </button>
                <button
                  className="close-btn"
                  onClick={() => setSelectedPlan(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showConfirmation && (
          <div className="modal-overlay">
            <div className="confirmation-modal">
              <h3 className="modal-title">Confirm Subscription</h3>
              <div className="confirmation-content">
                <p>Please review your subscription details:</p>
                <div className="confirmation-details">
                  <div className="detail-row">
                    <span>Plan:</span>
                    <span>{selectedPlan.planName}</span>
                  </div>
                  <div className="detail-row">
                    <span>Amount:</span>
                    <span>${Number(selectedAmount).toLocaleString()}</span>
                  </div>
                  <div className="detail-row">
                    <span>Duration:</span>
                    <span>{selectedPlan.durationDays} days</span>
                  </div>
                </div>
              </div>
              <div className="button-group">
                <button
                  className="subscribe-btn"
                  onClick={handleSubscribe}
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      Processing... <div className="loading-spinner"></div>
                    </span>
                  ) : (
                    "Confirm Subscription"
                  )}
                </button>
                <button className="close-btn" onClick={handleConfirmationClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;
