import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import "../pageCss/Recharge.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoCallSharp } from "react-icons/io5";

const ChangePhone = () => {
  const user = useSelector((state) => state.YATipauy.user);
  const [userInput, setUserInput] = useState({
    currentPhoneNumber: "",
    newPhoneNumber: "",
  });

  const changeNo = async () => {
    try{
      const response = await axios.post(`https://yaticare-back-end.vercel.app/api/user/change-password/${user.user._id}`, userInput)
      console.log(response)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className="Change">
      <h3>Please provide the following details below to proceed</h3>
      <section className="chanPass">
        <div className="inputDiv">
          <IoCallSharp className="inputIcon" />
          <input
            type="phoneNo"
            placeholder="Enter current phone number"
            value={userInput.currentPhoneNumber}
            onChange={(e) =>
              setUserInput({ ...userInput, currentPhoneNumber: e.target.value })
            }
          />
        </div>

        <div className="inputDiv">
          <aside>
            <IoCallSharp className="inputIcon" />
            <input
              type= "phoneNo"
              placeholder="Enter New Phone number"
              value={userInput.newPassword}
              onChange={(e) =>
                setUserInput({ ...userInput, newPhoneNumber: e.target.value })
              }
            />
          </aside>
        </div>

        <button onClick={changeNo}>Save</button>
      </section>
    </div>
  );
};

export default ChangePhone;
