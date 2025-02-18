import React from 'react'
import './pageCss/Product.css'

const Product = ({displayedProducts}) => {
  return (
    <div className='Product'>
        {
        displayedProducts.map((products, i)=>(
            <section key={i}>
                <div className='productHead'>
                    <div className="iconBox"></div>
                   <h3> ZenithVault</h3>
                </div >
                <div className="imgBox">
                    <img src="https://zensartech.top/storage/plans/Zenith%20Vault1737234553.png" alt="product" />
                </div>
                <div className="productDetails">
                    <li>
                        <h4>Price</h4>
                        <h3>₦6,000.00</h3>
                    </li>
                    <li>
                        <h4>period</h4>
                        <h3>50 days</h3>
                    </li>
                    <li>
                        <h4>Daily income</h4>
                        <h3>₦1,800.00</h3>
                    </li>
                    <li>
                        <h4>Total income</h4>
                        <h3>₦90,000.00</h3>
                    </li>
                   
                </div>
                <button>Purchase</button>
            </section>
        ))
        }
    </div>
  )
}

export default Product