import React, { useState } from "react";
import "../pageCss/Recharge.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoCallSharp } from "react-icons/io5";

const ChangePhone = () => {
  const user = useSelector((state) => state.YATipauy.user);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    currentPhoneNumber: "",
    newPhoneNumber: "",
  });

  const changeNo = async () => {
    try {
      setLoading(true); // start loading
      const response = await axios.post(
        `https://yaticare-back-end.vercel.app/api/user/changePhonenumber/${user.user._id}`,
        userInput
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="Change">
      <h3>Please provide the following details below to proceed</h3>
      <section className="chanPass">
        {/* Uncomment if you want current phone input */}
        {/* <div className="inputDiv">
          <IoCallSharp className="inputIcon" />
          <input
            type="tel"
            placeholder="Enter current phone number"
            value={userInput.currentPhoneNumber}
            onChange={(e) =>
              setUserInput({ ...userInput, currentPhoneNumber: e.target.value })
            }
          />
        </div> */}

        <div className="inputDiv">
          <aside>
            <IoCallSharp className="inputIcon" />
            <input
              type="tel"
              placeholder="Enter New Phone number"
              value={userInput.newPhoneNumber}
              onChange={(e) =>
                setUserInput({ ...userInput, newPhoneNumber: e.target.value })
              }
            />
          </aside>
        </div>

        <button onClick={changeNo} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </section>
    </div>
  );
};

export default ChangePhone;
