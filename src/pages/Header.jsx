import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";
import "./HeaderStyle.css";
import "../MobileStyle/MobileStyle.css";
import Logo from "../assets/logo.png";
import { Drawer } from "antd";
import { CgMenuRight } from "react-icons/cg";
import MobileMenu from "./MobileMenu";

const Header = () => {
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
          offset: -70, // adjust if you have a fixed header
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
    <div className="HeaderBody">
      <div className="Header-Wrapper">
        <div className="Logo">
          <img src={Logo} alt="Logo" onClick={() => navigate("/")} />
        </div>
        <div className="Navs">
          <ul>
            <li>
              {isHomePage ? (
                <ScrollLink
                  to="hero"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  Home
                </ScrollLink>
              ) : (
                <span
                  onClick={() => {
                    setToggle(false);
                    goToSection("hero");
                  }}
                >
                  Home
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
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  About Us
                </ScrollLink>
              ) : (
                <span
                  onClick={() => {
                    setToggle(false);
                    goToSection("about");
                  }}
                >
                  About Us
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
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  How it works
                </ScrollLink>
              ) : (
                <span
                  onClick={() => {
                    setToggle(false);
                    goToSection("how-it-works");
                  }}
                >
                  How it works
                </span>
              )}
            </li>
            <li
              onClick={() => {
                setToggle(false);
                navigate("/gallery-hub");
              }}
            >
              Gallery Hub
            </li>
            <li
              onClick={() => {
                setToggle(false);
                navigate("/contact-us");
              }}
            >
              Contacts
            </li>
          </ul>

          <div className="Auth">
            <button
              onClick={() => {
                setToggle(false);
                navigate("/auth/login");
              }}
            >
              Login
            </button>
            <button
              className="Active"
              onClick={() => {
                setToggle(false);
                navigate("/auth/Sign-up");
              }}
            >
              Create account
            </button>
          </div>
        </div>

        <CgMenuRight className="Icon" onClick={() => setToggle(true)} />
        <Drawer
          placement="right"
          onClose={() => setToggle(false)}
          open={toggle}
        >
          <MobileMenu onClose={() => setToggle(false)} />
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
