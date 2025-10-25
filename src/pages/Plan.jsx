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

  const handleSubscribe = async () => {
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

    setLoading(true);
    try {
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

      if (response.data.message.includes("successfully")) {
        toast.success("Subscription created successfully!");
        setSelectedPlan(null);
        setSelectedAmount(null);
        setCustomAmount("");
        // signal header to refresh balance and user data
        dispatch(depositedAmount(Date.now()));
      } else {
        toast.error(response.data.data.message || "Subscription failed");
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
          <p>Loading plans...</p>
        ) : plansData.length === 0 ? (
          <p>No plan available</p>
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

              <button
                className="subscribe-btn"
                onClick={handleSubscribe}
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
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
