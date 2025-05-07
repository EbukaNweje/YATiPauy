import React, { useState, useEffect, useRef } from "react";
import "./pageCss/profilepage.css";
import { FiEdit2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProfileInfo() {
  const user = useSelector((state) => state.YATipauy.user);
  console.log(user);
  const [details, setDetails] = useState({
    UserName: user.user.userName || "",
    email: user.user.email,
    PhoneNumber: user.user.phoneNumber,
    bankDetails: "",
    KYC: "" || "",
    uplineUserName: "" || "",
    uplinePhoneNumber: "" || "",
  });
  const [editMode, setEditMode] = useState({
    UserName: true,
    PhoneNumber: true,
  });
  const Nav = useNavigate()

  const updateInfo = async () => {
    try {
      const response = await axios.post(
        `https://yaticare-back-end.vercel.app/api/user/updateuser/${user.user._id}`,
        details
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (field) => (e) => {
    setDetails({ ...details, [field]: e.target.value });
  };

  const toggleEdit = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleCancel = () => {
    setDetails({
      UserName: user.user.userName,
      email: user.user.email,
      PhoneNumber: user.user.phoneNumber,
    });
    setEditMode({
      UserName: true,
      PhoneNumber: true,
    });
  };

  const renderField = (label, value, fieldKey) => (
    <div className="inforcontainer">
      <h2>{label}</h2>
      {editMode[fieldKey] ? (
        <div className="readonly-field">
          <span>{value || "N/A"}</span>
          <FiEdit2 className="edit-icon" onClick={() => toggleEdit(fieldKey)} />
        </div>
      ) : (
        <input
          className="containerwrap"
          type="text"
          value={value}
          onChange={handleInputChange(fieldKey)}
          placeholder={`Enter ${label.toLowerCase()} here...`}
        />
      )}
    </div>
  );

  return (
    <div>
      <div className="informationdetailcont">
        <h1
          style={{ marginLeft: "30px", paddingTop: "10px", fontSize: "27px" }}
        >
          My Profile
        </h1>
        <form className="profileform" onSubmit={""}>
          {renderField("UserName", details.UserName, "UserName")}

          <div className="inforcontainer">
            <h2>Email</h2>
            <div className="readonly-field">
              <span>{details.email}</span>
            </div>
          </div>

          <div className="inforcontainer">
            <h2>Phone Number</h2>
            <div className="readonly-field">
              <span>{details.PhoneNumber}</span>
            </div>
          </div>

          <div className="inforcontainer">
            <h2>Bank Details</h2>
            <div className="readonly-field">
              <span>{details.bankDetails || "bank details"}</span>
            </div>
          </div>

          <div className="inforcontainer">
            <h2>KYC</h2>
            <div className="readonly-field">
              <span>{details.KYC || "status"}</span>
            </div>
          </div>

          <div className="inforcontainer">
            <h2>Upline Username</h2>
            <div className="readonly-field">
              <span>{details.uplineUserName || "Username" }</span>
            </div>
          </div>

          <div className="inforcontainer">
            <h2>Upline PhoneNumber</h2>
            <div className="readonly-field">
              <span>{details.uplinePhoneNumber || "PhoneNumber"}</span>
            </div>
          </div>

          <div className="actionbtn">
            <div className="actionbuttonwrapper1">
              <button
                type="button"
                className="cancelbtn1"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="submitbtn" onClick={updateInfo}>
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
      <section onClick={() => Nav("/dashboard/accountSettings")} style={{cursor: "pointer", marginTop: "10px"}}>
        <div className="iconBoxs">
          <h3 style={{fontWeight: "600"}}>PROFILE SETTINGS</h3>
        </div>
      </section>
    </div>
  );
}

export default ProfileInfo;
