import "./pageCss/Product.css";
import speaker from "../assets/speaker.png";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Vip = () => {
  const products = [
    { id: 1, name: "Plan 1" },
    { id: 2, name: "Plan 2" },
    { id: 3, name: "Plan 3" },
    { id: 4, name: "Plan 4" },
    { id: 5, name: "Plan 5" },
    { id: 6, name: "Plan 6" },
    { id: 7, name: "Plan 7" },
  ];

  const navigate = useNavigate();

  if (products.length === 0) {
    return <p className="no-products">No products available</p>;
  }

  return (
    <div className="product-wrap">
      <div className="products-list">
        {products.map(
          ({ id, name, price, period, dailyIncome, totalIncome, image }) => (
            <section key={id} className="product-card">
              <div className="product-left">
                <div className="image-container">
                  <img src={image || speaker} alt={name} />
                </div>
                <div className="product-title">
                  <h3>{name || "ZenithVault"}</h3>
                </div>
              </div>
              <ul className="product-details">
                <li>
                  <span className="label">Price:</span>
                  <span className="value">₦{price || "6,000.00"}</span>
                </li>
                <li>
                  <span className="label">Period:</span>
                  <span className="value">{period || "50 days"}</span>
                </li>
                <li>
                  <span className="label">Daily Income:</span>
                  <span className="value">₦{dailyIncome || "1,800.00"}</span>
                </li>
                <li>
                  <span className="label">Total Income:</span>
                  <span className="value">₦{totalIncome || "90,000.00"}</span>
                </li>
                <li
                  className="navigate-icon"
                  onClick={() => navigate(`/dashboard/plandetails/${id}`)}
                >
                  <FaChevronRight />
                </li>
              </ul>
            </section>
          )
        )}
      </div>
    </div>
  );
};

export default Vip;
