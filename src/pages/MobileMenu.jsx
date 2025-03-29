import React from 'react'
import { Button } from "antd"
import { FaHome, FaQuestion } from "react-icons/fa";
import { FaLandmark } from "react-icons/fa6";
import { MdOutlinePayment, MdContactPhone } from "react-icons/md";
import { Link } from "react-scroll";
import { useNavigate } from 'react-router-dom';



const MobileMenu = () => {
  const Nav = useNavigate();

  return (
    <div className='MobileMenuContainer'>
            <div className="MobilenavList">
                   <ul>
                    <li>

                       <Link to="hero" smooth={true} duration={500} style={{
                        color: "black"
                       }}>
                      <FaHome/> Home
                       </Link>
                    </li>

                      <li>
                      <Link to="about" smooth={true} duration={500} style={{
                        color: "black"
                      }}>
                        <FaLandmark/> About Us
                      </Link>
                      </li> 
                         <li> 
                          <Link to="how-it-works" smooth={true} duration={500} style={{
                            color: "black"
                          }}>
                          <MdOutlinePayment/> How it works
                          </Link>
                        </li>
                      {/* <li><FaQuestion/> FAQs</li> */}
                      <li onClick={() => Nav("/contact-us")}><MdContactPhone/> Contacts</li>
                   </ul>

                    <div className='Auth'>
                      <button onClick={() => Nav("/auth/login")}>Login</button>
                      <button className='Active' onClick={() => Nav("/auth/signup")}>Create account</button>
                  </div>

            </div>
    </div>
  )
}

export default MobileMenu