import React from 'react';
import './pageCss/Product.css';
import speaker from '../assets/speaker.png'


const Product = ({ displayedProducts }) => {
  if ( displayedProducts.length === 0) {
    return <p style={{fontSize: '20px', color: 'lightgray', padding: '20px'}}>No products available</p>;
  }

  return (
    <div className='Product'>
      {displayedProducts.map((product, i) => (
        <section key={i}>
          <div className='productHead'>
            <div className="iconBox"></div>
            <h3>{product.name || "ZenithVault"}</h3>
          </div>
          <div className="imgBox">
            <img src={product.image || speaker} alt="product" />
          </div>
          <div className="productDetails">
            <li>
              <h4>Price</h4>
              <h3>₦{product.price || "6,000.00"}</h3>
            </li>
            <li>
              <h4>Period</h4>
              <h3>{product.period || "50 days"}</h3>
            </li>
            <li>
              <h4>Daily Income</h4>
              <h3>₦{product.dailyIncome || "1,800.00"}</h3>
            </li>
            <li>
              <h4>Total Income</h4>
              <h3>₦{product.totalIncome || "90,000.00"}</h3>
            </li>
          </div>
          <button>Purchase</button>
        </section>
      ))}
    </div>
  );
};

export default Product;
