import React, { useState } from "react";
import "./weather.css";
// import { FcAbout } from "react-icons/fc";

const Weather = () => {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <div className="container">
      <div className="wraper">
        {/* Left Section (About Us) */}
        <div className="left-section">
          <h2>About Us</h2>
          <p>
            {" "}
            <strong>YATiCare</strong> Is A Powerful Community-Driven Financial
            Model, birthed for the purpose of Creating Connections and Enhancing
            Financial Growth amongst Individuals and Businesses.
          </p>
        </div>

        {/* Right Section */}
        <div className="right-section">
          {/* Navigation Tabs */}
          <div className="nav-tabs">
            <h2
              className={activeTab === "mission" ? "active-tab" : ""}
              onClick={() => setActiveTab("mission")}
            >
              Mission
            </h2>
            <h2
              className={activeTab === "vision" ? "active-tab" : ""}
              onClick={() => setActiveTab("vision")}
            >
              Vision
            </h2>
            <h2
              className={activeTab === "values" ? "active-tab" : ""}
              onClick={() => setActiveTab("values")}
            >
              Our Core Values
            </h2>
          </div>

          {/* Content Section (Changes Based on Active Tab) */}
          <div className="content-section">
            {activeTab === "mission" && (
              <div className="content-box">
                <h3>Mission Statement:</h3>
                <p>
                  YATiCare is dedicated to creating meaningful financial
                  connections by providing innovative solutions that enable
                  individuals and businesses to support each other while growing
                  their wealth through Transparency, Collaboration, and
                  impact-driven initiatives, we strive to bridge economic gaps
                  and empower communities toward financial independence.
                </p>
              </div>
            )}

            {activeTab === "vision" && (
              <div className="content-box">
                <h3>Vision Statement:</h3>
                <p>
                  To build a world where financial empowerment is accessible to
                  all, fostering a culture of shared growth, trust, and
                  community-driven prosperity.
                </p>
              </div>
            )}

            {activeTab === "values" && (
              <div className="content-box">
                <h3>Our Core Values:</h3>
                <ul>
                  <li>
                    {" "}
                    1.⁠ ⁠Empowerment – We equip individuals and businesses with
                    the tools, resources, and financial opportunities to achieve
                    sustainable growth and success.{" "}
                  </li>

                  <li>
                    {" "}
                    2.⁠ ⁠Trust & Transparency – Integrity is the foundation of
                    our platform. We foster trust by ensuring fair, open, and
                    ethical financial practices in all our interactions.{" "}
                  </li>

                  <li>
                    {" "}
                    3.⁠ ⁠Innovation & Growth – We embrace technology and
                    forward-thinking financial solutions to create scalable
                    opportunities for wealth-building and social impact.{" "}
                  </li>

                  <li>
                    {" "}
                    4.⁠ ⁠Community-Driven Impact – We believe in the strength of
                    collective financial support, where individuals and
                    businesses thrive by uplifting one another.{" "}
                  </li>

                  <li>
                    {" "}
                    5.⁠ ⁠Financial Inclusion – We are committed to bridging
                    economic gaps, ensuring that financial growth opportunities
                    are accessible to everyone, regardless of background or
                    status.{" "}
                  </li>

                  <li>
                    {" "}
                    6.⁠ ⁠Sustainability & Responsibility – We focus on long-term
                    financial success through ethical, responsible, and
                    future-focused financial models that benefit both
                    individuals and communities.{" "}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
