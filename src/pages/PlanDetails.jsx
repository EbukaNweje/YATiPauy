import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./pageCss/plandetails.css";
import { useSelector } from "react-redux";
import axios from "axios";

const PlanDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const user = useSelector((state) => state.YATipauy.user);
  const [subscription, setSubscription] = useState(
    location?.state?.subscription || null
  );

  // If the user navigated directly to /plandetails/:id, params.id can be used to fetch data.
  useEffect(() => {
    if (!subscription && params?.id) {
      // TODO: fetch subscription by id if required. For now, show placeholder fallback.
      // Example: axios.get(`/api/subscription/${params.id}`).then(res => setSubscription(res.data))
      // We'll set a lightweight fallback object so the UI still renders.
      setSubscription({
        plan: {
          planName: `Plan (${params.id})`,
          durationDays: "-",
          description: "",
        },
        amount: "-",
        startDate: "-",
        endDate: "-",
        planInterest: "-",
      });
    }
  }, [params, subscription]);

  const formatCurrency = (val) => {
    const n = Number(val);
    if (!Number.isFinite(n)) return "-";
    return n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (s) => {
    if (!s) return "-";
    const d = new Date(s);
    if (isNaN(d)) return s;
    return d.toLocaleString();
  };

  useEffect(() => {
    // If navigated with state we already have the subscription. Otherwise, if we have an id and the user is logged in,
    // fetch the user's subscriptions and find the one with the matching id.
    const fetchById = async () => {
      if (subscription || !params?.id) return;
      if (!user?.user?._id) return;

      try {
        const resp = await axios.get(
          `https://yaticare-back-end.vercel.app/api/getusrSubcription/${user.user._id}`
        );
        const data =
          resp?.data?.subscriptions || resp?.data?.data?.subscriptions || [];
        const found = data.find((s) => String(s._id) === String(params.id));
        if (found) setSubscription(found);
        else {
          // fallback lightweight object if not found
          setSubscription({
            plan: { planName: `Plan (${params.id})` },
            amount: "-",
          });
        }
      } catch (err) {
        console.error("Error fetching subscription by id:", err);
        setSubscription({
          plan: { planName: `Plan (${params.id})` },
          amount: "-",
        });
      }
    };

    fetchById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, user?.user?._id]);

  if (!subscription) {
    return (
      <div className="planDetails">
        <h2>Plan Details</h2>
        <div className="cardsPlan">
          <p style={{ padding: 24 }}>Loading plan details…</p>
        </div>
      </div>
    );
  }

  const amountDisplay = subscription?.amount
    ? formatCurrency(subscription.amount)
    : "-";
  const interestPct =
    subscription?.plan?.percentageInterest ?? subscription?.planInterest ?? "-";
  const startDateDisplay =
    subscription?.startDate ?? subscription?.createdAt ?? null;
  const endDateDisplay = subscription?.endDate ?? null;
  // const durationDaysNum = Number(subscription?.plan?.durationDays) || 0;
  // const pctNum = Number(interestPct) || 0;
  const totalPct = amountDisplay * 1.4;

  return (
    <div className="planDetails">
      <div
        style={{
          width: "100%",
          maxWidth: 760,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>{subscription?.plan?.planName ?? "Plan Details"}</h2>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "transparent",
            border: "none",
            color: "#065f46",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>

      <div className="cardsPlan">
        <div className="profit">
          <div className="invest">
            <h2>${amountDisplay}</h2>
            <p>Invested Amount</p>
          </div>

          <div className="earned">
            <span>+</span>
            <h3>{interestPct}% Daily</h3>
          </div>
        </div>

        <div className="duration">
          <h3>Duration</h3>
          <p>{subscription?.plan?.durationDays ?? "-"} Days</p>
        </div>

        <div className="duration">
          <h3>Start Date:</h3>
          <p>{formatDate(startDateDisplay)}</p>
        </div>

        <div className="duration">
          <h3>End Date:</h3>
          <p>{formatDate(endDateDisplay)}</p>
        </div>

        <div className="duration Total" style={{ borderBottom: "none" }}>
          <h3>Total Income:</h3>
          <p>${formatCurrency(totalPct)}</p>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
