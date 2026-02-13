import React, { useEffect, useState } from "react";
import {
  FaUserFriends,
  FaFileInvoice,
  FaSignOutAlt,
  FaChevronRight,
  FaUser,
} from "react-icons/fa";
import "./pageCss/Profile.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./Global/Slice";
import axios from "axios";
import { MdManageAccounts } from "react-icons/md";

const Profile = () => {
  const Nav = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.YATipauy.user);
  const [userInfo, setUserInfo] = useState(null);
  const reduxId = useSelector((state) => state?.YATipauy?.id);
  const finalId = user?.user?._id || reduxId;

  const handleLogout = () => {
    // clear this user's Telegram shown flag for the session
    try {
      const key = `tg_shown_${finalId}`;
      sessionStorage.removeItem(key);
    } catch (e) {
      /* ignore */
    }
    dispatch(logout());
    Nav("/");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://yaticare-backend.onrender.com/api/user/userdata/${finalId}`,
        );
        const data = response?.data?.data;
        setUserInfo(data);
        // console.log("FGF", data);
      } catch (error) {
        // console.error("Error fetching user data:", error);
      }
    };
    if (finalId) {
      fetchUserData();
    }
  }, [user, finalId]);

  return (
    <div className="Profile">
      <div className="smallBox">
        <section>
          <div className="profile"></div>
          <div className="profileI">
            <h3>ID: {userInfo ? userInfo?.phoneNumber : "Loading..."}</h3>
            <h3>userName: {userInfo ? userInfo?.userName : "Loading..."}</h3>
          </div>
        </section>
        <div className="balance">
          <button disabled>
            <h3>
              $
              {userInfo
                ? `${Number(userInfo?.accountBalance).toLocaleString()}.00`
                : "Loading..."}
            </h3>
            <span>Total Balance ($)</span>
          </button>
        </div>
      </div>

      <div className="profileInfo">
        <section onClick={() => Nav("/dashboard/referrals")}>
          <div className="iconBox">
            <FaUserFriends className="profileIcon" />
            <h3>Invite</h3>
          </div>
          <FaChevronRight className="arrowIcon" />
        </section>
        <section onClick={() => Nav("/dashboard/history")}>
          <div className="iconBox">
            <FaFileInvoice className="profileIcon" />
            <h3>Transaction Records</h3>
          </div>
          <FaChevronRight className="arrowIcon" />
        </section>
        <section onClick={() => Nav("/dashboard/profileinfo")}>
          <div className="iconBox">
            <FaUser className="profileIcon" />
            <h3>Personal Information</h3>
          </div>
          <FaChevronRight className="arrowIcon" />
        </section>
        <section onClick={() => Nav("/dashboard/accountSettings")}>
          <div className="iconBox">
            <MdManageAccounts className="profileIcon" />
            <h3>Profile Settings</h3>
          </div>
          <FaChevronRight className="arrowIcon" />
        </section>
        <section onClick={handleLogout}>
          <div className="iconBox">
            <FaSignOutAlt className="profileIcon logoutIcon" />
            <h3>Log out</h3>
          </div>
          <FaChevronRight className="arrowIcon" />
        </section>
      </div>
    </div>
  );
};

export default Profile;
