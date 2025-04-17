import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink, scroller } from 'react-scroll';
import { FaHome, FaLandmark } from "react-icons/fa";
import { MdOutlinePayment, MdContactPhone } from "react-icons/md";
import "./MobileStyle.css"; // Ensure this file has your styles

const MobileMenu = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const goToSection = (sectionId) => {
    if (!isHomePage) {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(sectionId, {
          duration: 500,
          smooth: true,
          offset: -70, // adjust for fixed header if needed
        });
      }, 300); // delay for landing page to mount
    } else {
      scroller.scrollTo(sectionId, {
        duration: 500,
        smooth: true,
        offset: -70,
      });
    }
  };

  return (
    <div className='MobileMenuContainer'>
      <div className="MobilenavList">
        <ul>
          <li>
            {isHomePage ? (
              <ScrollLink to="hero" smooth={true} duration={500} offset={-70} className="mobile-menu-link">
                <FaHome /> Home
              </ScrollLink>
            ) : (
              <span onClick={() => goToSection("hero")} className="mobile-menu-link">
                <FaHome /> Home
              </span>
            )}
          </li>

          <li>
            {isHomePage ? (
              <ScrollLink to="about" smooth={true} duration={500} offset={-70} className="mobile-menu-link">
                <FaLandmark /> About Us
              </ScrollLink>
            ) : (
              <span onClick={() => goToSection("about")} className="mobile-menu-link">
                <FaLandmark /> About Us
              </span>
            )}
          </li>

          <li>
            {isHomePage ? (
              <ScrollLink to="how-it-works" smooth={true} duration={500} offset={-70} className="mobile-menu-link">
                <MdOutlinePayment /> How it works
              </ScrollLink>
            ) : (
              <span onClick={() => goToSection("how-it-works")} className="mobile-menu-link">
                <MdOutlinePayment /> How it works
              </span>
            )}
          </li>

          <li onClick={() => navigate("/contact-us")} className="mobile-menu-link">
            <MdContactPhone /> Contacts
          </li>
        </ul>

        <div className="Auth">
          <button className="auth-btn" onClick={() => navigate("/auth/login")}>Login</button>
          <button className="auth-btn active" onClick={() => navigate("/auth/signup")}>Create account</button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
