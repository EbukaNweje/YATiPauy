import React from 'react'
import "./pageCss/plandetails.css"

const PlanDetails = () => {
  return (
    <div className='planDetails'>
        <h2>Yati Starter - 8% for 60 Days</h2>
        <div className='cardsPlan'>
            <div className='profit'>
                <div className="invest">
                    <h2>$3000</h2>
                    <p>Invested Amount</p>
                </div>
                <div className="earned">
                    <span>+</span>
                    <h3>Profit Earned</h3>
                </div>
            </div>
            <div className='duration'>
                <h3>Duration</h3>
                <p>60 Days</p>
            </div>
            <div className='duration'>
                <h3>Start Date:</h3>
                <p>2025-05-02</p>
            </div>
            <div className='duration'>
                <h3>End Date:</h3>
                <p>Tue July 01 2025 11:40:14</p>
            </div>
            <div className='duration' style={{borderBottom: "none"}}>
                <h3>Interest:</h3>
                <p>9%</p>
            </div>
        </div>
    </div>
  )
}

export default PlanDetails