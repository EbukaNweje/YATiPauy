import React, { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import '../pageCss/Recharge.css';

const Change = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='Change'>
        <h3>Please provide the following details below to proceed</h3>
        <section className='chanPass'>
          <div className="inputDiv">
            <FaLock className="inputIcon" />
            <input type={showNewPassword ? "text" : "password"} placeholder="Enter current password" />
            <span className="toggleIcon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash size={25} cursor={'pointer'}/> : <FaEye size={25} cursor={'pointer'}/>}
            </span>
          </div>

          <div className="inputDiv">
           <aside>
           <FaLock className="inputIcon" />
           <input type={showNewPassword ? "text" : "password"} placeholder="Enter New password"/>
           </aside>
            <span className="toggleIcon" onClick={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? <FaEyeSlash size={25} cursor={'pointer'}/> : <FaEye size={25} cursor={'pointer'}/>}
            </span>
          </div>

          <div className="inputDiv">
            <aside>
            <FaLock className="inputIcon" />
            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm New password" />
            </aside>
            <span className="toggleIcon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash size={25} cursor={'pointer'}/> : <FaEye size={25} cursor={'pointer'}/>}
            </span>
          </div>

          <button>Save</button>
        </section>
    </div>
  );
}

export default Change;
