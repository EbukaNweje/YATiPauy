import React from "react";
import "./testing.css";
import { useNavigate } from "react-router-dom";
// import 'animate.css';

const Testing = () => {
  const Nav = useNavigate();
  return (
    <div className="MainWrapper">
      <div className="wrapper">
        <div className="HeroPageleft">
          <h1>
            YATiCare: <br />
            Empowering Connections, Elevating Financial Growth!
          </h1>
          <p className="animate__animated animate__fadeInLeft">
            At YatiCare, we believe true prosperity is measured not just by
            wealth, but by lives transformed. Through Our Community-Driven
            Financial Model, We Achieve Our Goal by Empowering the Underserved,
            Educating the Next Generation, and Building Bridges of Hope Across
            the World. Here, every milestone you reach helps uplift another.
            This is Growth that gives back.
          </p>
          <button className="Btn" onClick={() => Nav("/auth/login")}>
            Get Started
          </button>
        </div>
        <div className="HeroPageRight">
          {/* <img src="src/assets/grow.jpg" alt="" className='imge' /> */}
        </div>
      </div>
    </div>
  );
};

export default Testing;
