import React, { useState } from "react";
import { Link } from "react-scroll";
import "./HeaderStyle.css";
import "../MobileStyle/MobileStyle.css";
import Logo from "../assets/logo.png";
import { Drawer } from "antd";
import { CgMenuRight } from "react-icons/cg";
import MobileMenu from "./MobileMenu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const Nav = useNavigate();

  return (
    <div className="HeaderBody">
      <div className="Header-Wrapper">
        <div className="Logo">
          <img src={Logo} alt="Logo" on onClick={() => Nav("/")}/>
        </div>
        <div className="Navs">
          <ul>
            <li>
              <Link to="hero" smooth={true} duration={500}>
                Home
              </Link>
            </li>
            <li>
              <Link to="about" smooth={true} duration={500}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="how-it-works" smooth={true} duration={500}>
                How it works
              </Link>
            </li>
            {/* <li>
              <Link to="faqs" smooth={true} duration={500}>
                FAQs
              </Link>
            </li> */}
            <li onClick={()=>Nav("/contact-us")}>
                Contacts
            </li>
          </ul>

          <div className="Auth">
            <button onClick={()=>Nav("/auth/login")}>Login</button>
            <button className="Active" onClick={()=>Nav("/auth/Sign-up")}>Create account</button>
          </div>
        </div>

        <CgMenuRight className="Icon" onClick={() => setToggle(true)} />
        <Drawer placement="right" onClose={() => setToggle(false)} open={toggle}>
          <MobileMenu />
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
