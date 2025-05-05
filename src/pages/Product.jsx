import React from "react";
import "./pageCss/Product.css";
import speaker from "../assets/speaker.png";
import { FaNairaSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Product = ({ displayedProducts }) => {
  if (!displayedProducts || displayedProducts.length === 0) {
    return (
      <p style={{ fontSize: "20px", color: "black", padding: "20px" }}>
        No products available
      </p>
    );
  }
  const Nav = useNavigate()

  return (
    <div className="Product">
      {displayedProducts.map((product, index) => (
        <div className="productCard" key={index}>
          <div className="imgBox">
            <img src={product.image} alt="" />
          </div>
          <div className="textCon">
            <h3 style={{fontSize: "16px"}}>{product.name}</h3>
            <h2>{product.prodText}</h2>
            <h4>{product.prodIdeal}</h4>
            {product.prodList.map((text, index) => (
            <li>{text}</li>
            ))}
            <span>
              Price: <FaNairaSign size={15} />{product.price1} - <FaNairaSign size={15} />{product.price2}
            </span>
            <button onClick={() => Nav("/dashboard/plan")}>Get Started</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
