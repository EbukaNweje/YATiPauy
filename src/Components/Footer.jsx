import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaCrown, FaUsers, FaUser } from 'react-icons/fa';
import '../pages/pageCss/Layout.css';

const Footer = () => {
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
          <NavLink to="/dashboard/Products" className={({ isActive }) => isActive ? "footer-link-active" : "footer-link"}>
            <FaShoppingBag size={30} />
            <h3>Packages</h3>
          </NavLink>
        </li>
        <li>
          <NavLink  to="/dashboard/Vip" className={({ isActive }) => isActive ? "footer-link-active" : "footer-link"}>
            <FaCrown size={30} />
            <h3>My packages</h3>
          </NavLink>
        </li>
        <li>
          <NavLink 
           to="/dashboard" 
          className={({ isActive }) => isActive ? "footer-link-active" : "footer-link"}>
            <FaUsers size={30} />
            <h3>Team</h3>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/Profile" className={({ isActive }) => isActive ? "footer-link-active" : "footer-link"}>
            <FaUser size={30} />
            <h3>Profile</h3>
          </NavLink>
        </li>
      </nav>
    </div>
  );
};

export default Footer;
