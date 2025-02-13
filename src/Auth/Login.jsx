import React, { useState } from 'react' 
import "../Auth/LoginStyle.css"
import "../MobileStyle/AllMobileStyle.css"
import { IoMdArrowDropleft } from "react-icons/io";
import { FaRegUser, FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const Login = () => {
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
                <h3>Let’s login.</h3>
                <p>Let’s us know what your mobile and your password</p>
            </div>

                <form className='MyForm'>
                    <div className='MyFormWrapper'>
                        <div className='divInputWrapper'> 
                            <div className='divInput'>
                                <FaRegUser className='IconFont'/>
                                <input type="text"  className='Input' placeholder='Enter your mobile'/>
                            </div>
                            <div className='divInput'>
                                <input type={showPassword ? "text" : "password"}  className='Input' placeholder='Enter your password'/>
                                {
                                    showPassword ? <FaRegEyeSlash onClick={changePassword}/> : <FaRegEye className='IconFont' onClick={changePassword}/>
                                }
                               
                                
                            </div>
                        </div>
                        <div className='forgot'>
                            <p>Forgot password?</p>
                        </div>
                            <button className='Btn'>Sign In</button>

                            <div className='Not'>
                            <p>Not a member?  <small>Create an new account? <span onClick={()=> Nav("/Sign-up")}>Sign Up</span></small></p>
                        </div>
                    </div>
                </form> 

        </div>
    </div>
  )
}

export default Login