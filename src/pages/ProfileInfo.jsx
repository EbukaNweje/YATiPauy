import React, { useState, useEffect, useRef } from "react";
import "./pageCss/profilepage.css";
import { FiEdit2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProfileInfo() {
  const user = useSelector((state) => state.YATipauy.user);
  const [UsersData, setUsersData] = useState([]);
  // console.log("UsersData", UsersData);

  const [details, setDetails] = useState({
    UserName: UsersData.userName || "",
    email: UsersData.email,
    PhoneNumber: UsersData.phoneNumber,
    WalletAddress: "",
    KYC: "" || "",
    uplineUserName: "" || "",
    uplinePhoneNumber: "" || "",
  });

  const [editMode, setEditMode] = useState({
    UserName: true,
    PhoneNumber: true,
  });
  const Nav = useNavigate();

  // const updateInfo = async () => {
  //   try {
  //     const response = await axios.post(
  //       `https://yaticare-back-end.vercel.app/api/user/updateuser/${user.user._id}`,
  //       details
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    async function fetchUser() {
      try {
        // Replace with your actual user API endpoint
        const response = await axios.get(
          `https://yaticare-back-end.vercel.app/api/user/userdata/${user.user._id}`
        );
        // console.log("FGF", response?.data?.data);
        setUsersData(response?.data?.data);
      } catch (error) {
        // console.log(error);
      }
    }
    fetchUser();
  }, []);

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
    <div className="informationdetailcont">
      <h1 style={{ marginLeft: "30px", paddingTop: "10px", fontSize: "27px" }}>
        My Profile
      </h1>
      <form className="profileform" onSubmit={""}>
        <div className="inforcontainer">
          <h2>UserName</h2>
          <div className="readonly-field">
            <span>{UsersData.userName}</span>
          </div>
        </div>
        <div className="inforcontainer">
          <h2>Email</h2>
          <div className="readonly-field">
            <span>{UsersData.email}</span>
          </div>
        </div>

        <div className="inforcontainer">
          <h2>Phone Number</h2>
          <div className="readonly-field">
            <span>{UsersData.phoneNumber}</span>
          </div>
        </div>

        <div className="inforcontainer">
          <h2> Wallet Address</h2>
          <div className="readonly-field">
            <span>
              {UsersData?.WalletInfo?.WalletAddress || "Wallet Address"}
            </span>
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
            <span>{details.uplineUserName || "Username"}</span>
          </div>
        </div>

        <div className="inforcontainer">
          <h2>Upline PhoneNumber</h2>
          <div className="readonly-field">
            <span>{details.uplinePhoneNumber || "PhoneNumber"}</span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileInfo;
