import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./pageCss/plandetails.css";

const PlanDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
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
            <h2>${subscription?.amount ?? "-"}</h2>
            <p>Invested Amount</p>
          </div>

          <div className="earned">
            <span>+</span>
            <h3>
              {subscription?.plan?.percentageInterest ??
                subscription?.planInterest ??
                "-"}
              %
            </h3>
          </div>
        </div>

        <div className="duration">
          <h3>Duration</h3>
          <p>{subscription?.plan?.durationDays ?? "-"} Days</p>
        </div>

        <div className="duration">
          <h3>Start Date:</h3>
          <p>{subscription?.startDate ?? subscription?.createdAt ?? "-"}</p>
        </div>

        <div className="duration">
          <h3>End Date:</h3>
          <p>{subscription?.endDate ?? "-"}</p>
        </div>

        <div className="duration" style={{ borderBottom: "none" }}>
          <h3>Interest:</h3>
          <p>
            {subscription?.plan?.percentageInterest ??
              subscription?.planInterest ??
              "-"}
            %
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
