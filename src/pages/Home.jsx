import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaWallet, FaMoneyBillWave, FaUniversity, FaUsers, FaBell, FaFileContract, FaShieldAlt } from "react-icons/fa";
import "./pageCss/Home.css";
import Product from "./Product";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const images = [
    "https://zensartech.top/assets/img/banner/1.png",
    "https://zensartech.top/assets/img/banner/3.png",
    "https://zensartech.top/assets/img/banner/2.png"
  ];

  const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
    { id: 4, name: "Product 4" },
    { id: 5, name: "Product 5" },
    { id: 6, name: "Product 6" },
    { id: 7, name: "Product 7" }
  ];

  const ITEMS_PER_PAGE = 5;
  const [index, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const durations = [4000, 3000, 3000];
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, durations[index % durations.length]);
    return () => clearInterval(interval);
  }, [index]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const displayedProducts = products.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const Nav = useNavigate();

  return (
    <div className="Home">
      <div className="carousel-container">
        <motion.div
          className="carousel"
          animate={{ x: `-${index * 100}%` }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="carousel-item"
              style={{ backgroundImage: `url(${src})` }}
            ></div>
          ))}
        </motion.div>
      </div>

      <nav>
        <ul onClick={() => Nav('recharge')}>
          <div className="iconBox"><FaWallet size={30} color="grey" /></div>
          <li>Recharge</li>
        </ul>
        <ul onClick={() => Nav('withdraw')}>
          <div className="iconBox"><FaMoneyBillWave size={30} color="grey" /></div>
          <li>Withdraw</li>
        </ul>
        <ul onClick={() => Nav('bankDetails')}>
          <div className="iconBox"><FaUniversity size={30} color="grey" /></div>
          <li>Bank Account</li>
        </ul>
        <ul onClick={() => Nav('plan')}>
          <div className="iconBox"><FaUniversity size={30} color="grey" /></div>
          <li>Plans</li>
        </ul>
        <ul>
          <div className="iconBox"><FaUsers size={30} color="grey" /></div>
          <li>Community</li>
        </ul>
        <ul onClick={()=> Nav('terms')}>
          <div className="iconBox"><FaFileContract size={30} color="grey" /></div>
          <li>Terms & Conditions</li>
        </ul>
        <ul onClick={()=> Nav('Privacy')}>
          <div className="iconBox"><FaShieldAlt size={30} color="grey" /></div>
          <li>Privacy Policy</li>
        </ul>
      </nav>

      <button className="margueBtn" disabled>
        <div className="iconBox"><FaBell size={30} color="white" /></div>
        <marquee behavior="scroll" direction="left">
          Officially launched. Join YATiPauy Telegram for more updates!
        </marquee>
      </button>

      <div className="productDiv">
        <h3>Top Rated Products</h3>
        <Product displayedProducts={displayedProducts} />

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={i === currentPage ? "active" : ""}
              onClick={() => setCurrentPage(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
