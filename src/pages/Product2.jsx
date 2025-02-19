import React from 'react';
import './pageCss/Product.css';

const ProductS = () => {

    const products = [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
        { id: 3, name: "Product 3" },
        { id: 4, name: "Product 4" },
        { id: 5, name: "Product 5" },
        { id: 6, name: "Product 6" },
        { id: 7, name: "Product 7" }
      ];

  if ( products.length === 0) {
    return <p style={{fontSize: '20px', color: 'lightgray', padding: '20px'}}>No products available</p>;
  }

  return (
    <div className="productWrap">
         <div className='Product'>
      {products.map((product, i) => (
        <section key={i}>
          <div className='productHead'>
            <div className="iconBox"></div>
            <h3>{product.name || "ZenithVault"}</h3>
          </div>
          <div className="imgBox">
            <img src={product.image || "https://zensartech.top/storage/plans/Zenith%20Vault1737234553.png"} alt="product" />
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
    </div>
  );
};

export default ProductS;
