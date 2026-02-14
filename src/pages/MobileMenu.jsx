import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";
import { FaHome, FaLandmark } from "react-icons/fa";
import { MdOutlinePayment, MdContactPhone } from "react-icons/md";
import "./MobileStyle.css"; // Ensure this file has your styles
import { TfiGallery } from "react-icons/tfi";

const MobileMenu = ({ onClose }) => {
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
    onClose();
  };

  return (
    <div className="MobileMenuContainer">
      <div className="MobilenavList">
        <ul>
          <li>
            {isHomePage ? (
              <ScrollLink
                to="hero"
                smooth={true}
                duration={500}
                offset={-70}
                className="mobile-menu-link"
                onClick={() => onClose()}
              >
                <FaHome /> Home
              </ScrollLink>
            ) : (
              <span
                onClick={() => goToSection("hero")}
                className="mobile-menu-link"
              >
                <FaHome /> Home
              </span>
            )}
          </li>

          <li>
            {isHomePage ? (
              <ScrollLink
                to="about"
                smooth={true}
                duration={500}
                offset={-70}
                className="mobile-menu-link"
                onClick={() => onClose()}
              >
                <FaLandmark /> About Us
              </ScrollLink>
            ) : (
              <span
                onClick={() => goToSection("about")}
                className="mobile-menu-link"
              >
                <FaLandmark /> About Us
              </span>
            )}
          </li>

          <li>
            {isHomePage ? (
              <ScrollLink
                to="how-it-works"
                smooth={true}
                duration={500}
                offset={-70}
                className="mobile-menu-link"
                onClick={() => onClose()}
              >
                <MdOutlinePayment /> How it works
              </ScrollLink>
            ) : (
              <span
                onClick={() => goToSection("how-it-works")}
                className="mobile-menu-link"
              >
                <MdOutlinePayment /> How it works
              </span>
            )}
          </li>

          <li
            onClick={() => {
              onClose();
              navigate("/gallery-hub");
            }}
            className="mobile-menu-link"
          >
            <TfiGallery /> Gallery Hub
          </li>

          <li
            onClick={() => {
              onClose();
              navigate("/contact-us");
            }}
            className="mobile-menu-link"
          >
            <MdContactPhone /> Contacts
          </li>
        </ul>

        <div className="Auth">
          <button
            className="auth-btn"
            onClick={() => {
              onClose();
              navigate("/auth/login");
            }}
          >
            Login
          </button>
          <button
            className="auth-btn active"
            onClick={() => {
              onClose();
              navigate("/auth/sign-up");
            }}
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
