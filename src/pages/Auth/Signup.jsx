import React, { useState } from 'react' 
import "./LoginStyle.css"
import '../../MobileStyle/AllMobileStyle.css'
import { IoMdArrowDropleft } from "react-icons/io";
import { FaRegUser, FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { MdOutlineAttachEmail } from "react-icons/md";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const Nav = useNavigate()
    const changePassword = () => { 
        setShowPassword(!showPassword)
    }

  return (
    <div className='MainBody'>
        <div className='Wrapper'>
            <div className='navBack'>
                <IoMdArrowDropleft/>
            </div>
            
            <div className='AuthHader'>
                <h3>Create an Account.</h3>
                <p>Please enter your appropriate details to continue</p>
            </div>

                <form className='MyForm'>
                    <div className='MyFormWrapper'>
                        <div className='divInputWrapper'> 
                            <div className='divInput'>
                                <FaRegUser className='IconFont'/>
                                <input type="text"  className='Input' placeholder='Enter your full Name'/>
                            </div>
                            <div className='divInput'>
                                <FaRegUser className='IconFont'/>
                                <input type="text"  className='Input' placeholder='Enter your mobile'/>
                            </div>
                            <div className='divInput'>
                                <MdOutlineAttachEmail className='IconFont'/>
                                <input type="email"  className='Input' placeholder='Enter your email address'/>
                            </div>
                            <div className='divInput'>
                                 <MdOutlineAttachEmail className='IconFont'/>
                                <input type="text" className='Input' placeholder='Enter your invite code'/>
                            </div>
                        </div>
                        <div className='divInputWrapper'> 
                        <div className='divInput'>
                                <input type={showPassword ? "text" : "password"}  className='Input' placeholder='Enter your password'/>
                                {
                                    showPassword ? <FaRegEyeSlash onClick={changePassword}/> : <FaRegEye className='IconFont' onClick={changePassword}/>
                                }
                               
                                
                            </div>
                            <div className='divInput'>
                                <input type={showPassword ? "text" : "password"}  className='Input' placeholder='Confirm password'/>
                                {
                                    showPassword ? <FaRegEyeSlash onClick={changePassword}/> : <FaRegEye className='IconFont' onClick={changePassword}/>
                                }
                               
                                
                            </div>
                        </div>
                        {/* <div className='divInputWrapper'> 
                            <div className='divInput'>
                                <FaRegUser className='IconFont'/>
                                <input type="text"  className='Input' placeholder='Enter your mobile'/>
                            </div>
                        </div> */}

                            <button className='Btn'>Sign In</button>

                            <div className='Not'>
                            <p>Not a member?  <small>Already have an account?<span onClick={()=> Nav("/")}> Sign in</span></small></p>
                        </div>
                    </div>
                </form> 

        </div>
    </div>
  )
}

export default Signup