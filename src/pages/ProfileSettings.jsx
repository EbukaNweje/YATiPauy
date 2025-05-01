import React, { useEffect, useState } from "react";
import {
  FaLock,
  FaChevronRight,
  FaUniversity,
  FaUser,
} from "react-icons/fa";
import "./pageCss/Profile.css";
import { useNavigate } from "react-router-dom";

const ProfileSettings = () => {
  const Nav = useNavigate();

  return (
    <div className="Profile">

      <div className="profileInfo">
        <section onClick={() => Nav("/dashboard/profileinfo")}>
          <div className="iconBox">
            <FaUser className="profileIcon" />
            <h3>Personal Information</h3>
          </div>
          <FaChevronRight className="arrowIcon" />
        </section>
        <section onClick={() => Nav("/dashboard/changePassword")}>
          <div className="iconBox">
            <FaLock className="profileIcon" />
            <h3>Change password</h3>
          </div>
          <FaChevronRight className="arrowIcon" />
        </section>
        <section onClick={() => Nav("/dashboard/bankDetails")}>
          <div className="iconBox">
            <FaUniversity className="profileIcon logoutIcon" />
            <h3>Bank</h3>
          </div>
          <FaChevronRight className="arrowIcon" />
        </section>
      </div>
    </div>
  );
};

export default ProfileSettings;
