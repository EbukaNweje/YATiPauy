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

  // FIXED AMOUNTS FOR ALL PLANS
  const FIXED_AMOUNTS = {
    "YATI STARTER": [10, 20, 50, 70, 80, 99],
    "YATI HOPE EXPLORER": [100, 150, 200, 250, 280, 299],
    "YATI BRIGHTER HORIZON": [300, 350, 400, 450, 500, 599],
    "YATI EMPOWER PASS": [600, 650, 700, 800, 900, 999],
    "YATI ELITE STARS": [1000, 1200, 1500, 2000, 2500, 2999],
    "YATI DIAMOND": [3000, 3500, 4000, 4500, 5000],
  };

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://yaticare-backend.onrender.com/api/getallplan",
        );

        const mappedPlans = response.data.data.map((plan) => {
          return {
            ...plan,
            amounts: FIXED_AMOUNTS[plan.planName] || [], // APPLY FIXED AMOUNTS
          };
        });

        setPlansData(mappedPlans);
      } catch {
        toast.error("Failed to load plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    if (selectedPlanName && plansData.length > 0) {
      const matchingPlan = plansData.find(
        (plan) =>
          plan.planName.toUpperCase() === selectedPlanName.toUpperCase(),
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

  const handleSubscribeClick = () => {
    if (!selectedPlan || !selectedAmount) {
      toast.error("Please select a plan and amount.");
      return;
    }

    // const amountNum = Number(selectedAmount);

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
          planName: selectedPlan.planName,
          amount: amountNum,
          durationInDays: selectedPlan.durationDays,
          subscriptionDate: date,
        },
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
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
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
                  {/* Duration: {plan.durationDays} days */}
                  Duration: 6 days
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
                />
              </div>

              <div className="button-group">
                <button
                  className="subscribe-btn"
                  onClick={handleSubscribeClick}
                  disabled={loading || !selectedAmount}
                >
                  {loading ? "Processing..." : "Continue"}
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
                    {/* <span>{selectedPlan.durationDays} days</span> */}
                    <span>6 Days</span>
                  </div>
                </div>
              </div>

              <div className="button-group">
                <button
                  className="subscribe-btn"
                  onClick={handleSubscribe}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Confirm Subscription"}
                </button>
                <button
                  className="close-btn"
                  onClick={() => setShowConfirmation(false)}
                >
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
