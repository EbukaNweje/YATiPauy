import React from "react";
import { FaUserFriends, FaFileInvoice, FaLock, FaSignOutAlt, FaChevronRight } from "react-icons/fa"; 
import "./pageCss/Profile.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./Global/Slice";

const Profile = () => {
  const Nav = useNavigate();
  const dispatch = useDispatch(); 

  const handleLogout = () => { 
    dispatch(logout());
    Nav('/'); 
  };

  return (
    <div className="Profile">
      <div className="smallBox">
        <section>
          <div className="profile"></div>
          <div className="profileI">
          <h3>ID: 07023456789</h3>
          <h3>userName: john</h3>
          </div>
        </section>
        <div className="balance">
          <button disabled>
            <h3>₦1,000.00</h3>
            <span>Total Assets (₦)</span>
          </button>
          <button disabled>
            <h3>₦0.00</h3>
            <span>Recharge Asset (₦)</span>
          </button>
        </div>
      </div>

      <div className="profileInfo">
        <section>
          <div className="iconBox">
            <FaUserFriends className="profileIcon" />
            <h3>Invite</h3>
          </div>
          <FaChevronRight className="arrowIcon" />
        </section>
        <section onClick={() => Nav('/dashboard/history')}>
          <div className="iconBox">
            <FaFileInvoice className="profileIcon" />
            <h3>Total Bills</h3>
          </div>
          <FaChevronRight className="arrowIcon" />
        </section>
        <section onClick={() => Nav('/dashboard/changePassword')}>
          <div className="iconBox">
            <FaLock className="profileIcon" />
            <h3>Change password</h3>
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
