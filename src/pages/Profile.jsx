import React, { useEffect, useState } from "react";
import {
  FaUserFriends,
  FaFileInvoice,
  FaSignOutAlt,
  FaChevronRight,
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

  const handleLogout = () => {
    dispatch(logout());
    Nav("/");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://yaticare-back-end.vercel.app/api/user/userdata/${user.user._id}`
        );
        const data = response?.data?.data;
        setUserInfo(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (user?.user?._id) {
      fetchUserData();
    }
  }, []);

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
              ₦
              {userInfo
                ? `${Number(userInfo?.accountBalance).toLocaleString()}.00`
                : "Loading..."}
            </h3>
            <span>Total Recharge (₦)</span>
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
            <h3>Total Bills</h3>
          </div>
          <FaChevronRight className="arrowIcon" />
        </section>
        {/* <section onClick={() => Nav("/dashboard/changePassword")}>
          <div className="iconBox">
            <FaLock className="profileIcon" />
            <h3>Change password</h3>
          </div>
          <FaChevronRight className="arrowIcon" />
        </section> */}
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
