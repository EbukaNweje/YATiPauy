import "./pageCss/Product.css";
import { FaNairaSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { BiDollar } from "react-icons/bi";

const Product = ({ displayedProducts }) => {
  if (!displayedProducts || displayedProducts.length === 0) {
    return (
      <p style={{ fontSize: "20px", color: "black", padding: "20px" }}>
        No products available
      </p>
    );
  }
  const Nav = useNavigate();

  return (
    <div className="Product">
      {displayedProducts.map((product, index) => (
        <div className="productCard" key={index}>
          <div className="imgBox">
            <img src={product.image} alt="" />
          </div>
          <div className="textCon">
            <h3>{product.name}</h3>
            <h2>{product.prodText}</h2>
            <h4>{product.prodIdeal}</h4>
            <ul>
              {product.prodList.map((text, idx) => (
                <li key={idx}>{text}</li>
              ))}
            </ul>
            <span>
              Price: <BiDollar size={14} />
              {product.price1} - <BiDollar size={14} />
              {product.price2}
            </span>
            <button
              onClick={() =>
                Nav("/dashboard/plan", {
                  state: { selectedPlanName: product.name },
                })
              }
            >
              Subscribe
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
