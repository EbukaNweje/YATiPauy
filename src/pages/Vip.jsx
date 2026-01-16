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

  const formatCurrency = (val) => {
    const n = Number(val);
    if (!Number.isFinite(n)) return "0.00";
    return n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  useEffect(() => {
    if (!finalId) return;

    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://yaticare-backend.onrender.com/api/getusrSubcription/${finalId}`
        );
        setUserData(response?.data);
      } catch (error) {
        // console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

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
        `https://yaticare-backend.onrender.com/api/recycleSubscription/${subscriptionId}`
      );
      console.log("subscriptionId", response);
      toast.success(response?.data?.message);
      setRecycleLoading(true);
    } catch (err) {
      setRecycleLoading(false);
      toast.error(err?.response?.data?.message);
      // console.log(err?.response?.data?.message);
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
                    disabled={
                      !subscriptionData?.isSubscriptionRecycle ? true : false
                    }
                    style={{
                      background: `${
                        !subscriptionData?.isSubscriptionRecycle
                          ? "rgba(128, 128, 128, 0.188)"
                          : ""
                      }`,
                    }}
                    onClick={() => {
                      handelRecycle(subscriptionData._id);
                      // console.log("wroking");
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
    </div>
  );
};

export default Vip;
