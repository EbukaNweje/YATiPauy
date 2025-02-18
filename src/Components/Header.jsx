import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeadphones, FaUser } from 'react-icons/fa';
import '../pages/pageCss/Layout.css';


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userPhone = "+1234567890";
  const accountBalance = "$500.00";

  const isHomePage = location.pathname === "/dashboard";

  return (
    <div className="Header">
      {isHomePage ? (
        <div className='homeHcontent'>
            <div className="header-content">
            <div className='profile'> <FaUser size={30} color='grey'/></div>
            <div className="info">
            <h3>Hello, {userPhone}</h3>
            <button disabled>{accountBalance}</button>
            </div>
          </div>

         <button className="header-btn">
            <FaHeadphones size={24} />
          </button>

        
        </div>
      ) : (
        <div className='pageContent'>
          <button className="header-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft size={24} />
          </button>

          <h3 className="header-title">{location.pathname.replace("/dashboard/", "").toUpperCase()}</h3>
        </div>
      )}
    </div>
  );
};

export default Header;
