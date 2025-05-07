import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";

const RefPage = () => {
  const user = useSelector((state) => state.YATipauy.user);
  const referralLink = user.referralLink;
  const userInvited = user.user.inviteCode.userInvited
  const [referrals] = useState(userInvited);
  console.log(user)

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };


  return (
    <div className="w-full h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-3xl p-6 flex flex-col gap-2">
        <h1 className="text-2xl font-bold mb-4">My Referral</h1>

        <div className="w-full  flex items-center gap-2.5  p-4 rounded-lg mb-6">
          <div className=" font-semibold mb-2">Referral Link:</div>
          <div className="w-160 flex gap-10">
            <input
              type="text"
              readOnly
              value={referralLink}
              className=" rounded-lg p-2 w-full text-blue-600"
            />
            <button onClick={handleCopy} className="cursor-pointer">
              <FaRegCopy />
            </button>
          </div>
        </div>
        <div className="w-full  flex items-center gap-2.5  p-4 rounded-lg mb-6">
          <div className=" font-semibold mb-2">No of referrals:</div>
          <div className="w-100 flex gap-10">
              {user.user.referralCount}
          </div>
        </div>

        <h2 className="text-xl font-semibold">My Referrals</h2>

        <div className="p-4 flex flex-col gap-2">
          {referrals.length > 0 ? (
            <ul className="space-y-3 flex flex-col gap-2">
              {referrals.map((referral, index) => (
                <li
                  key={index}
                  className="h-15 flex w-max gap-10 px-3 items-center justify-between bg-white"
                  style={{padding: "10px"}}
                >
                  <div>
                    <p style={{fontWeight: "600"}}>
                      {referral.name}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span style={{fontWeight: "600"}}>PhoneNumber:</span> {referral.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <p>
                     <span style={{fontWeight: "600"}}>Plan:</span> {referral.plan}
                    </p>
                  </div>
                  <div>
                    <p>
                     <span style={{fontWeight: "600"}}>Joined:</span> {referral.joined}
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
