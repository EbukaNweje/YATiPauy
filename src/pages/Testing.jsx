import React from 'react'
import "./testing.css"
import { useNavigate } from 'react-router-dom';
// import 'animate.css';

const Testing = () => {
  const Nav = useNavigate();
  return (
    <div className='MainWrapper'>
      <div className='wrapper'>
        <div className='HeroPageleft'>
            <h1>YATiCare <br />
Empowering Connections, Elevating Growth!
</h1>
<p className='animate__animated animate__fadeInLeft'>YATiCare Is A Powerful Community-Driven Financial Model, <br /> birthed for the purpose of Creating Connections and Enhancing Financial Growth amongst <br /> Individuals and Businesses.</p>
        <button className='Btn' onClick={() => Nav("/auth/login")}>Get Started</button>
        </div>
        <div className='HeroPageRight'>
            {/* <img src="src/assets/grow.jpg" alt="" className='imge' /> */}
        </div>
        
           
      </div>
    </div>
  )
}

export default Testing
