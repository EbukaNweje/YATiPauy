import "./pageCss/Product.css";
import "./pageCss/Vip.css";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import planLogo from "../assets/logo.png";
import { PuffLoader } from "react-spinners";
import toast from "react-hot-toast";

const Vip = () => {
  const user = useSelector((state) => state.YATipauy.user);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const reduxId = useSelector((state) => state?.YATipauy?.id);
  const finalId = user?.user?._id || reduxId;
  const [recycleLoading, setRecycleLoading] = useState(false);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [showUpgradeStep, setShowUpgradeStep] = useState(false);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const formatCurrency = (val) => {
    const n = Number(val);
    if (!Number.isFinite(n)) return "0.00";
    return n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const fetchSubscriptions = async () => {
    if (!finalId) return;
    try {
      setLoading(true);
      const response = await axios.get(
        `https://yaticare-backend.onrender.com/api/getusrSubcription/${finalId}`,
      );
      setUserData(response?.data);
    } catch (error) {
      // console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailablePlans = async () => {
    try {
      setPlansLoading(true);
      const response = await axios.get(
        `https://yaticare-backend.onrender.com/api/getallplan`,
      );

      // Handle different response structures
      let plans = [];
      if (Array.isArray(response?.data)) {
        plans = response.data;
      } else if (Array.isArray(response?.data?.plans)) {
        plans = response.data.plans;
      } else if (response?.data?.data && Array.isArray(response.data.data)) {
        plans = response.data.data;
      }

      setAvailablePlans(Array.isArray(plans) ? plans : []);
    } catch (error) {
      toast.error("Failed to load available plans");
      console.error("Error fetching plans:", error);
      setAvailablePlans([]);
    } finally {
      setPlansLoading(false);
    }
  };

  // console.log("availablePlans", availablePlans);

  useEffect(() => {
    fetchSubscriptions();
  }, [user, finalId]);

  const navigate = useNavigate();

  if (userData?.subscriptions === 0) {
    return <p className="no-products">No products available</p>;
  }

  // console.log("userData", userData);

  const handelRecycle = async (subscriptionId) => {
    setRecycleLoading(true);
    try {
      const response = await axios.patch(
        `https://yaticare-backend.onrender.com/api/recycleSubscription/${subscriptionId}`,
      );
      console.log("subscriptionId", response);
      toast.success(
        response?.data?.message ||
          "Subscription recycled and restarted successfully",
      );
      setShowDialog(false);
      setSelectedSubscription(null);
      setRecycleLoading(false);
      // Refresh user data
      fetchSubscriptions();
    } catch (err) {
      setRecycleLoading(false);
      toast.error(err?.response?.data?.message);
    }
  };

  const handleUpgrade = async () => {
    if (!selectedPlan) {
      toast.error("Please select a plan");
      return;
    }

    setUpgradeLoading(true);
    try {
      const response = await axios.post(
        `https://yaticare-backend.onrender.com/api/upgradePlan`,
        {
          subscriptionId: selectedSubscription._id,
          newPlanId: selectedPlan._id,
          newAmount: selectedPlan.maximumDeposit,
        },
      );
      console.log("Upgrade response", response);
      toast.success(response?.data?.message || "Plan upgraded successfully!");
      setShowDialog(false);
      setShowUpgradeStep(false);
      setSelectedSubscription(null);
      setSelectedPlan(null);
      setUpgradeLoading(false);
      // Refresh user data
      fetchSubscriptions();
    } catch (err) {
      setUpgradeLoading(false);
      toast.error(err?.response?.data?.message || "Failed to upgrade plan");
    }
  };

  return (
    <div className="vip-wrap">
      <header className="vip-header">
        <div className="vip-title">
          <h2>Your Subscriptions</h2>
          <p>Manage and view details of your active subscriptions</p>
        </div>
        <div className="vip-count">Total: {userData?.count ?? 0}</div>
      </header>

      {loading ? (
        <div className="vip-loading">Loading subscriptions...</div>
      ) : !userData ||
        !userData.subscriptions ||
        userData.subscriptions.length === 0 ? (
        <div className="vip-empty">You have no active subscriptions.</div>
      ) : (
        <div className="vip-list">
          {userData.subscriptions.reverse().map((subscriptionData) => {
            {
              /* {
              console.log("this is the subscriptionData", subscriptionData);
            } */
            }
            return (
              <article
                key={subscriptionData?._id}
                className="vip-card"
                aria-labelledby={`sub-${subscriptionData?._id}`}
              >
                <div className="card-left">
                  <div>
                    <div
                      className={`status-badge ${
                        subscriptionData?.status === "active"
                          ? "status-active"
                          : subscriptionData?.status === "expired"
                            ? "status-expired"
                            : "status-failed"
                      }`}
                    >
                      {subscriptionData?.status}
                    </div>
                  </div>
                  {/* <div className="logo-badge" aria-hidden>
                    placeholder image, replace with real plan image if available
                    <img src={planLogo} alt="plan" />
                  </div> */}
                  <div className="card-meta">
                    <h3 id={`sub-${subscriptionData?._id}`}>
                      {subscriptionData?.plan?.planName}
                    </h3>
                    <p className="muted">
                      {subscriptionData?.plan?.description ?? ""}
                    </p>
                  </div>
                </div>

                <div className="card-right">
                  <div className="details" role="list">
                    <div className="detail-item" role="listitem">
                      <span className="label">Price</span>
                      <span className="value">${subscriptionData?.amount}</span>
                    </div>

                    <div className="detail-item" role="listitem">
                      <span className="label">Period</span>
                      <span className="value">
                        {subscriptionData?.plan?.durationDays} days
                      </span>
                    </div>

                    <div className="detail-item" role="listitem">
                      <span className="label">Total Income</span>
                      <span className="value">
                        {formatCurrency(subscriptionData?.amount * 1.4)}
                      </span>
                    </div>
                  </div>

                  <button
                    className="Recycle-btn"
                    aria-label={"Recycle"}
                    disabled={!subscriptionData?.mustRecycle ? true : false}
                    style={{
                      background: `${
                        !subscriptionData?.mustRecycle
                          ? "rgba(128, 128, 128, 0.188)"
                          : ""
                      }`,
                    }}
                    onClick={() => {
                      setSelectedSubscription(subscriptionData);
                      setShowDialog(true);
                    }}
                  >
                    {recycleLoading ? (
                      <PuffLoader color="white" size={24} />
                    ) : (
                      "Recycle"
                    )}
                  </button>
                  <button
                    className="navigate-btn"
                    aria-label={`View details for ${subscriptionData?.plan?.planName}`}
                    onClick={() =>
                      navigate(`/dashboard/plandetails`, {
                        state: { subscription: subscriptionData },
                      })
                    }
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Dialog Modal for Recycle or Upgrade */}
      {showDialog && selectedSubscription && !showUpgradeStep && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowDialog(false);
            setSelectedSubscription(null);
          }}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>What would you like to do?</h3>
            <p>Choose to recycle your current plan or upgrade to a new one.</p>

            <div className="modal-buttons">
              <button
                className="modal-btn modal-btn-recycle"
                onClick={() => {
                  handelRecycle(selectedSubscription._id);
                }}
                disabled={recycleLoading}
              >
                {recycleLoading ? (
                  <PuffLoader color="white" size={16} />
                ) : (
                  "Recycle"
                )}
              </button>

              <button
                className="modal-btn modal-btn-upgrade"
                onClick={() => {
                  setShowUpgradeStep(true);
                  fetchAvailablePlans();
                }}
                disabled={upgradeLoading || showUpgradeStep}
              >
                {upgradeLoading ? (
                  <PuffLoader color="white" size={16} />
                ) : (
                  "Upgrade Plan"
                )}
              </button>
            </div>

            <button
              className="modal-btn-close"
              onClick={() => {
                setShowDialog(false);
                setSelectedSubscription(null);
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Plans Selection Modal for Upgrade */}
      {showDialog && selectedSubscription && showUpgradeStep && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowUpgradeStep(false);
            setSelectedPlan(null);
          }}
        >
          <div
            className="modal-content modal-plans"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Choose a Plan to Upgrade</h3>
            <p>Select from available plans</p>

            {plansLoading ? (
              <div className="plans-loading">
                <PuffLoader color="#047857" size={40} />
                <p>Loading plans...</p>
              </div>
            ) : availablePlans && availablePlans.length > 0 ? (
              <div className="plans-grid">
                {availablePlans.map((plan) => (
                  <div
                    key={plan._id}
                    className={`plan-card ${selectedPlan?._id === plan._id ? "selected" : ""}`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <h4>{plan.planName}</h4>
                    <div className="plan-details-mini">
                      <span className="detail">
                        Min: ${plan.minimumDeposit}
                      </span>
                      <span className="detail">
                        Max: ${plan.maximumDeposit}
                      </span>
                    </div>
                    <div className="plan-price">
                      <span className="amount">{plan.percentageInterest}%</span>
                      <span className="duration">{plan.durationDays} days</span>
                    </div>
                    {selectedPlan?._id === plan._id && (
                      <div className="selected-badge">✓ Selected</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-plans">No plans available</p>
            )}

            <div className="modal-action-buttons">
              <button
                className="modal-btn modal-btn-cancel"
                onClick={() => {
                  setShowUpgradeStep(false);
                  setSelectedPlan(null);
                }}
              >
                Back
              </button>
              <button
                className="modal-btn modal-btn-confirm"
                onClick={handleUpgrade}
                disabled={!selectedPlan || recycleLoading}
              >
                {recycleLoading ? (
                  <PuffLoader color="white" size={16} />
                ) : (
                  "Confirm Upgrade"
                )}
              </button>
            </div>

            <button
              className="modal-btn-close"
              onClick={() => {
                setShowUpgradeStep(false);
                setSelectedPlan(null);
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vip;
