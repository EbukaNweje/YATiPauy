import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";

const RefPage = () => {
  const referralLink = JSON.parse(localStorage.getItem("refLink"));
  const [referrals] = useState([
    { name: "John Doe", joined: "April 15, 2025" },
    { name: "Jane Smith", joined: "April 20, 2025" },
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-3xl p-6 flex flex-col gap-2">
        <h1 className="text-2xl font-bold mb-4">My Referral</h1>

        <div className="flex flex-col sm:flex-row items-center gap-2.5  p-4 rounded-lg mb-6">
          <div className=" font-semibold mb-2">Referral Link:</div>
          <div className="">
            <input
              type="text"
              readOnly
              value={referralLink}
              className=" rounded-lg p-2 w-130 text-blue-600"
            />
            <button onClick={handleCopy} className="cursor-pointer">
              <FaRegCopy />
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold">My Referrals</h2>

        <div className="p-4 flex flex-col gap-2">
          {referrals.length > 0 ? (
            <ul className="space-y-3 flex flex-col gap-2">
              {referrals.map((referral, index) => (
                <li
                  key={index}
                  className="h-15 flex items-center justify-between bg-white"
                  style={{padding: "10px"}}
                >
                  <div>
                    <p>
                      {referral.name}
                    </p>
                  </div>
                  <div>
                    <p>
                      Joined: {referral.joined}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-black py-4">
              You have no referrals yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RefPage;
