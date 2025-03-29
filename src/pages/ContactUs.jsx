import React from "react";
import "./ContactStyle.css";
import { HiOutlineMail } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";
import { FaAppStore } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { PiTiktokLogo } from "react-icons/pi";
import { PiTelegramLogoDuotone } from "react-icons/pi";
import Header from "./Header";
import Footer from "./Footer";


const ContactUs = () => {
  return (
    <>
    <Header/>
        <div className="contactuswrapper">
      <div className="contactusinner1">
        <h2>Chat to our friendly team</h2>
        <p style={{ fontWeight: 400 }}>
          We'd love to hear from you. Please fill out this form or shoot us an
          email.
        </p>
      </div>
      <div className="contactusinner2">
        <div className="innerdetails">
          <h2>Send us a message</h2>
          <input type="text" placeholder="Full name" className="emailinput" />
          <input type="email" placeholder="Email address" className="emailinput" />
          <textarea placeholder="Comments" className="textinput"></textarea>

          <div className="termsnpolicies">
            <input type="checkbox" id="privacy" />
            <label htmlFor="privacy">
              You agree to our friendly <u>privacy policy</u>
            </label>
          </div>

          <button className="submitbtn">Submit</button>
        </div>

        <div className="innerdetailslink">
          <div className="emaillink">
            <HiOutlineMail size={30} style={{ color: "green" }} />
            <b>Email</b>
            <p style={{ fontWeight: 400 }}>Our friendly team is here to help</p>
            <a href="mailto:yatihelpdesk@gmail.com">yatihelpdesk@gmail.com</a>
            <a href="mailto:yaticares.hq@gmail.com">yaticares.hq@gmail.com</a>
          </div>

          <div className="emaillink1">
            <BiPhoneCall size={30} style={{ color: "green" }} />
            <b>Phone</b>
            <p style={{ fontWeight: 400 }}>Mon-Fri 8am to 5pm.</p>
            <a href="tel:+3197005032009">+3197005032009</a>
            <a href="tel:+491636219338">+491636219338</a>
          </div>

          <div className="emaillink2">
            <FaAppStore size={30} style={{ color: "green" }} />
            <b>Socials</b>
            <p style={{ fontWeight: 400 }}>Visit our social media platforms</p>
            <div className="socialicons">
              <a href="https://www.facebook.com/share/1FN8ZupQhK/">
                <FiFacebook size={20} style={{ color: "green" }} />
              </a>

              <a href="https://www.tiktok.com/@yourhandle">
                <PiTiktokLogo size={20} style={{ color: "green" }} />
              </a>

              <a href="https://t.me/yaticares">
                <PiTelegramLogoDuotone size={20} style={{ color: "green" }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;
