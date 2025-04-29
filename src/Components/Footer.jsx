import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaCrown, FaUsers, FaUser, FaPowerOff } from 'react-icons/fa';
import '../pages/pageCss/Layout.css';
import { logout } from '../pages/Global/Slice';
import { useDispatch } from 'react-redux';

const Footer = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleLogout = () => {
      dispatch(logout());
      nav('/');
    };

  return (
    <div className="Footer">
      <nav>
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "footer-link-active" : "footer-link"}>
            <FaHome size={30} />
            <h3>Home</h3>
          </NavLink>
        </li>
        <li>
          <NavLink to="plan" className={({ isActive }) => isActive ? "footer-link-active" : "footer-link"}>
            <FaShoppingBag size={30} />
            <h3>Plans</h3>
          </NavLink>
        </li>
        <li>
          <NavLink  to="/dashboard/myPlans" className={({ isActive }) => isActive ? "footer-link-active" : "footer-link"}>
            <FaCrown size={30} />
            <h3>My Plans</h3>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/Profile" className={({ isActive }) => isActive ? "footer-link-active" : "footer-link"}>
            <FaUser size={30} />
            <h3>Profile</h3>
          </NavLink>
        </li>

        {/* <li>
          <NavLink 
          onClick={handleLogout}
          className={({ isActive }) => isActive ? "footer-link-active" : "footer-link"}>
            <FaPowerOff size={30} />
            <h3>Logout</h3>
          </NavLink>
        </li> */}
      </nav>
    </div>
  );
};

export default Footer;
