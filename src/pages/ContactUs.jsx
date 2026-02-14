import React, { useState } from "react";
import "./ContactStyle.css";
import { HiOutlineMail } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";
import { FaAppStore, FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { PiTiktokLogo } from "react-icons/pi";
import { PiTelegramLogoDuotone } from "react-icons/pi";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
    privacyAccepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Send data to API
  const sendContactMessage = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.fullName || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (!formData.privacyAccepted) {
      setErrorMessage("Please accept the Privacy Policy");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("YOUR_API_ENDPOINT_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Message sent successfully!");
        setFormData({
          fullName: "",
          email: "",
          message: "",
          privacyAccepted: false,
        });
      } else {
        setErrorMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="contactuswrapper">
        <div className="contactusinner1">
          <h2>Chat with our friendly team</h2>
          <p style={{ fontWeight: 400 }}>
            We'd love to hear from you. Please fill out this form or shoot us an
            email.
          </p>
        </div>
        <div className="contactusinner2">
          <div className="innerdetails">
            <h2>Send us a message</h2>
            <form onSubmit={sendContactMessage}>
              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                className="emailinput"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="emailinput"
                value={formData.email}
                onChange={handleInputChange}
              />
              <textarea
                name="message"
                placeholder="Comments"
                className="textinput"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>

              <div className="termsnpolicies">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleInputChange}
                />
                <label htmlFor="privacy">
                  You agree to our friendly{" "}
                  <Link to="/Privacy">
                    <u>Privacy Policy</u>
                  </Link>
                  .
                </label>
              </div>

              {errorMessage && (
                <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>
              )}
              {successMessage && (
                <p style={{ color: "green", fontSize: "14px" }}>
                  {successMessage}
                </p>
              )}

              <button
                type="submit"
                className="submitbtn"
                disabled={loading}
                style={{ opacity: loading ? 0.6 : 1 }}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>

          <div className="innerdetailslink">
            <div className="emaillink">
              <HiOutlineMail size={30} style={{ color: "green" }} />
              <b>Email</b>
              <p style={{ fontWeight: 400 }}>
                Our friendly team is here to help
              </p>
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
              <p style={{ fontWeight: 400 }}>
                Visit our social media platforms
              </p>
              <div className="socialicons">
                <a href="https://www.facebook.com/share/1Az3viZyVE/">
                  <FiFacebook size={20} style={{ color: "green" }} />
                </a>

                <a href="https://www.tiktok.com/@yaticares?_r=1&_d=egf47i023a47lc&sec_uid=MS4wLjABAAAAU1sK-jM7_uJNyR1R7KPN1qFoikNwPcKIQoiMk3N4jVi7da9ceLfzOlnaCIOaLFac&share_author_id=7473110709330035767&sharer_language=en&source=h5_m&u_code=f1b3chkf17dfae&item_author_type=2&utm_source=more&tt_from=more&enable_checksum=1&utm_medium=ios&share_link_id=C707EF5A-DF75-459B-9743-258AB26B8265&user_id=7593088255794021398&sec_user_id=MS4wLjABAAAAHfdAjOu2UZVqhHUmAzEzwrKDIuf3TYNP0T6aNqxhAr4Xder2qjn9OYC9GfOHBTMs&social_share_type=5&ug_btm=b2001,b5836&utm_campaign=client_share&share_app_id=1233">
                  <PiTiktokLogo size={20} style={{ color: "green" }} />
                </a>

                <a href="https://www.instagram.com/yaticares?igsh=MWZwbzZjcmtra3Z3aA==">
                  <FaInstagram size={20} style={{ color: "green" }} />
                </a>

                <a href="https://t.me/+lnOJnUzDLUM5OTVk">
                  <PiTelegramLogoDuotone size={20} style={{ color: "green" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
