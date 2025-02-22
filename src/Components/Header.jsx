import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeadphones, FaUser, FaBars } from 'react-icons/fa';
import '../pages/pageCss/Layout.css';
import { IoMdArrowDropleft } from "react-icons/io";
import { FaWallet, FaMoneyBillWave, FaUniversity, FaUsers, FaBell, FaFileContract, FaShieldAlt } from "react-icons/fa";


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const userPhone = "+1234567890";
  const accountBalance = "$500.00";

  const isHomePage = location.pathname === "/dashboard";

  return (
    <div className="Header">
      {isHomePage ? (
        <div className='homeHcontent'>
            <div className="header-content">
            <div className='profile' onClick={()=> navigate('Profile')}> <FaUser size={30} color='grey'/></div>
            <div className="info">
            <h3>Hello, {userPhone}</h3>
            <button disabled>{accountBalance}</button>
            </div>
          </div>

         {/* <button className="header-btn">
            <FaHeadphones size={24} />
          </button> */}

          <div className="menu-container">
            <div className="Menu" onClick={() => setMenuOpen(!menuOpen)}>
              <FaBars size={35} color='white'/>
            </div> 
            {menuOpen && (
              <div className="dropdown-menu">
                <button onClick={() => navigate('recharge')}><FaWallet size={30} color="grey" />Recharge</button>
                <button onClick={() => navigate('withdraw')}><FaMoneyBillWave size={30} color="grey" />Withdraw</button>
                <button onClick={() => navigate('bankDetails')}><FaUniversity size={30} color="grey" />Bank Account</button>
                <button onClick={() => navigate('plan')}><FaUniversity size={30} color="grey" />Plans</button>
                <button onClick={() => navigate('community')}><FaUsers size={30} color="grey" />Community</button>
                <button onClick={() => navigate('terms')}><FaFileContract size={30} color="grey" />Terms & Conditions</button>
                <button onClick={() => navigate('Privacy')}><FaShieldAlt size={30} color="grey" />Privacy Policy</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='pageContent'>
         <div className='navBack' onClick={() => navigate(-1)}>
                        <IoMdArrowDropleft size={40}/>
                    </div>

          <h3 style={{color: 'white', fontSize: '20px'}}>{location.pathname.replace("/dashboard/", "").toUpperCase()}</h3>
        </div>
      )}
    </div>
  );
};

export default Header;
