import React from "react";
import "./footer.css";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footerbody">
        <div className="footerwrapper">
          {/* About Section */}
          <div className="footercontent">
            <h4>YatiCare</h4>
            <p>
              We are committed to bridging economic gaps, ensuring that financial
              growth opportunities are accessible to everyone, regardless of
              background or status.
            </p>
          </div>

          {/* Company Section */}
          <div className="footercontent">
            <h3>Company</h3>
            <p>About us</p>
          </div>

          {/* Legal Section */}
          <div className="footercontent">
            <h3>Legal</h3>
            <p>Privacy note</p>
            <p>Terms and conditions</p>
          </div>

          {/* Contact Section */}
          <div className="footercontent">
            <h3>Contact us</h3>
            {/* <div className="social-icons">
              <IoLogoInstagram style={{ color: "white", fontSize: 17 }} />
              <FaXTwitter style={{ color: "white", fontSize: 17, marginLeft: 10 }} />
              <IoLogoLinkedin style={{ color: "white", fontSize: 17, marginLeft: 10 }} />
            </div> */}
            <p>
              Support email: <a href="mailto:yatihelpdesk@gmail.com ">yatihelpdesk@gmail.com </a> <br />
              Email: <a href="mailto:yaticares.hq@gmail.com">yaticares.hq@gmail.com</a> <br />
              +31 970 050 32009
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footeraddress">
          <p>© {currentYear} YatiCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
