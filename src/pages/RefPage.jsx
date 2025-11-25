import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaRegCopy, FaUsers, FaGift } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { VscLiveShare } from "react-icons/vsc";
import "./pageCss/refpage.css";

const RefPage = () => {
  const user = useSelector((state) => state.YATipauy.user);
  const [referrals, setReferrals] = useState([]);
  const [refBonus, setRefBonus] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalreferredactivesubscribers, settotalreferredactivesubscribers] =
    useState(null);
  const reduxId = useSelector((state) => state?.YATipauy?.id);
  const finalId = user?.user?._id || reduxId;
  const referralLink = user?.referralLink;

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `https://yaticare-backend.onrender.com/api/user/userdata/${finalId}`
        );

        console.log("response:", response);

        const invited = response?.data?.data?.inviteCode?.userInvited || [];
        setReferrals(invited);

        setRefBonus(response?.data?.data?.inviteCode?.bonusAmount || 0);
        setLoading(false);
      } catch (error) {
        // console.log(error);
        setLoading(false);
      }
    }
    fetchUser();
  }, [user, finalId]);

  const fetchReferredSubscribers = () => {
    const url = `https://yaticare-backend.onrender.com/api/user/totalreferredactivesubscribers/${finalId}`;
    axios
      .get(url)
      .then((res) => {
        settotalreferredactivesubscribers(
          res?.data?.totalReferredActiveSubscribers
        );
        console.log("this is totalreferredactivesubscribers", res);
        // setOneUserData(res?.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchReferredSubscribers();
  }, [user, finalId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  const formatCurrency = (val) => {
    const n = Number(val);
    if (!Number.isFinite(n)) return "$0.00";
    return n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (s) => {
    if (!s) return "-";
    const d = new Date(s);
    if (isNaN(d)) return s;
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  return (
    <div className="refpage-root">
      <div className="refpage-inner">
        {/* Header */}
        <div className="ref-header">
          <h1>Referral Dashboard</h1>
          <p>Share your referral link and earn bonuses when friends join.</p>
        </div>

        {/* Stats Section */}
        <div className="ref-stats">
          {/* Referral Link */}
          <div className="ref-card">
            <div className="icon">
              <VscLiveShare />
            </div>
            <h2>Your Referral Link</h2>
            <div className="ref-link-row">
              <input
                type="text"
                readOnly
                value={referralLink || ""}
                placeholder={referralLink ? "" : "No referral link available"}
                className="ref-link-input"
              />
              <button
                onClick={handleCopy}
                disabled={!referralLink}
                className={`ref-link-btn`}
              >
                {referralLink ? "Copy Link" : "Unavailable"}
              </button>
            </div>
          </div>

          {/* Total Referrals */}
          <div className="ref-card">
            <div className="icon">
              <FaUsers />
            </div>
            <h2>Total Referrals</h2>
            <div className="big">{referrals.length}</div>
          </div>
          <div className="ref-card">
            <div className="icon">
              <FaUsers />
            </div>
            <h2>Total Referred Active Subscribers</h2>
            <div className="big">{totalreferredactivesubscribers}</div>
          </div>

          {/* Referral Bonus */}
          <div className="ref-card">
            <div className="icon">
              <FaGift />
            </div>
            <h2>Referral Bonus</h2>
            <div className="big">{formatCurrency(refBonus)}</div>
          </div>
        </div>

        {/* Referral List */}
        <div className="ref-table-card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            My Referrals
          </h2>

          {loading ? (
            <div className="empty-state">Loading...</div>
          ) : referrals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="ref-table">
                <thead>
                  <tr>
                    <th className="p-4 font-medium">User</th>
                    <th className="p-4 font-medium">Phone</th>
                    <th className="p-4 font-medium">Joined</th>
                    <th className="p-4 font-medium">Subscription Status</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((referral, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="p-4">
                        <div className="user-cell">
                          <div className="avatar">
                            {(referral?.userName || "?").charAt(0)}
                          </div>
                          <div>
                            <div className="user-name">
                              {referral?.userName}
                            </div>
                            <div className="user-sub">
                              {referral?.email || ""}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-700">
                        {referral?.phoneNumber}
                      </td>
                      <td className="p-4 text-gray-700">
                        {formatDate(referral?.date)}
                      </td>
                      <td
                        className="p-4 "
                        style={{
                          color: referral?.isSubscribed ? "green" : "red",
                        }}
                      >
                        {formatDate(
                          referral?.isSubscribed ? "Active" : "Inactive"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">You have no referrals yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RefPage;
