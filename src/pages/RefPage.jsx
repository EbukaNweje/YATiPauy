import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaRegCopy, FaUsers, FaGift } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { VscLiveShare } from "react-icons/vsc";

const RefPage = () => {
  const user = useSelector((state) => state.YATipauy.user);
  const referralLink = user.referralLink;
  const [referrals, setReferrals] = useState([]);
  const [refBonus, setRefBonus] = useState(0);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `https://yaticare-back-end.vercel.app/api/user/userdata/${user.user._id}`
        );

        const invited = response?.data?.data?.inviteCode?.userInvited || [];
        setReferrals(invited);

        setRefBonus(response?.data?.data?.referralBonus || 0);
      } catch (error) {
        // console.log(error);
      }
    }
    fetchUser();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
      <div className="w-full max-w-7xl flex flex-col gap-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Referral Dashboard
          </h1>
          <p className="text-gray-600">
            Share your referral link and earn bonuses when friends join.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Referral Link */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 flex items-center flex-col gap-4">
            <VscLiveShare className="text-green-600 text-5xl" />
            <h2 className="text-lg font-semibold text-gray-900">
              Your Referral Link
            </h2>

            <div className="flex w-[90%] items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500 transition">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="flex-1 px-4 py-3 w-[80%] text-gray-700 font-medium bg-gray-50 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold hover:bg-green-700 active:bg-green-800 transition"
              >
                <FaRegCopy />
                Copy
              </button>
            </div>
          </div>

          {/* Total Referrals */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 flex flex-col justify-center items-center text-center gap-3">
            <FaUsers className="text-green-600 text-5xl" />
            <h2 className="text-lg font-semibold text-gray-900">
              Total Referrals
            </h2>
            <span className="text-4xl font-bold text-green-600">
              {referrals.length}
            </span>
          </div>

          {/* Referral Bonus */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 flex flex-col justify-center items-center text-center gap-3">
            <FaGift className="text-green-600 text-5xl" />
            <h2 className="text-lg font-semibold text-gray-900">
              Referral Bonus
            </h2>
            <span className="text-4xl font-bold text-green-600">
              ${refBonus.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Referral List */}
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            My Referrals
          </h2>

          {referrals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="p-4 font-medium">Username</th>
                    <th className="p-4 font-medium">Phone Number</th>
                    <th className="p-4 font-medium">Plan</th>
                    <th className="p-4 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((referral, index) => (
                    <tr
                      key={index}
                      className="border-b last:border-0 hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-medium text-gray-900">
                        {referral.userName}
                      </td>
                      <td className="p-4 text-gray-700">
                        {referral.phoneNumber}
                      </td>
                      <td className="p-4 text-gray-700">{referral.plan}</td>
                      <td className="p-4 text-gray-700">{referral.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              You have no referrals yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RefPage;
