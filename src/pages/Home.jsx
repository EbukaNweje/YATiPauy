import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaWallet, FaMoneyBillWave, FaUniversity, FaUsers, FaBell, FaShieldAlt } from "react-icons/fa";
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
    { 
      image: "/IMG/WhatsApp Image 2025-04-30 at 05.11.24_bd60e258.jpg",
      name: "YATI STARTER",
      prodText: "Start Smart, Grow Steadily.",
      prodIdeal: "Ideal For: Daily essentials and foundational support.",
      prodList: [
        "Local transportation coverage.",
        "Basic daily meal allowances.",
        "Access to community networking opportunities."
      ],
      price1: "5000",
      price2: "9000",
    },
    { 
      image: "/IMG/WhatsApp Image 2025-04-30 at 05.11.53_75aba231.jpg",
      name: "YATI HOPE EXPLORER",
      prodText: "Explore Limitless Possibilities.",
      prodIdeal: "Ideal For: Adventurers seeking affordable exploration.",
      prodList: [
        "Short-distance travel assistance (local/regional).",
        "Budget-friendly hotel accommodations.",
        "Curated local experience packages."
      ],
      price1: "10000",
      price2: "49000",
    },
    { 
      image: "/IMG/WhatsApp Image 2025-04-30 at 05.12.53_f34d84e9.jpg",
      name: "YATI BRIGHTER HORIZON",
      prodText: "Invest In Tomorrow, Today.",
      prodIdeal: "Ideal For: Professionals aiming for growth.",
      prodList: [
        "Expanded interstate travel support.",
        "Partial asset acquisition funding (e.g., tools, small equipment)",
        "Education fee subsidies."
      ],
      price1: "50000",
      price2: "90000",
    },
    { 
      image: "/IMG/WhatsApp Image 2025-04-30 at 05.13.48_57ab3a06.jpg",
      name: "YATI EMPOWER PASS",
      prodText: "Unlock Global Opportunities.",
      prodIdeal: "Ideal For: Ambitious individuals and entrepreneurs.",
      prodList: [
        "Premium domestic travel packages.",
        "Luxury vacation experiences (resorts, cruises).",
        "Fixed asset financing (property, vehicles).",
        "Priority access to Yaticare’s financial advisory network."
      ],
      price1: "100000",
      price2: "399000",
    },
    { 
      image: "/IMG/WhatsApp Image 2025-04-30 at 05.14.41_8ea10062.jpg",
      name: "YATI ELITE STARS",
      prodText: "Live Luxuriously, Thrive Endlessly.",
      prodIdeal: "Ideal For: High-net-worth individuals and lifestyle enthusiasts.",
      prodList: [
        "Premium and quality healthcare packages (global medical coverage).",
        "International travel concierge (bespoke itineraries).",
        "Custom car project support (imports, modifications).",
        "Exclusive networking events."
      ],
      price1: "400000",
      price2: "799000",
    },
    { 
      image: "/IMG/WhatsApp Image 2025-04-30 at 05.15.12_35ea150a.jpg",
      name: "YATI DIAMOND PARTNERS",
      prodText: "Redefine Excellence, Craft Your Legacy.",
      prodIdeal: "Ideal For: Visionaries building legacies.",
      prodList: [
        "Ultimate Travel: Private jet charters, 5-star global stays, and personalized cultural tours.",
        "Asset Mastery: High-value assets (real estate, businesses).",
        "Legacy Planning: Tailored wealth management, generational trust funds, and philanthropy coordination.",
        "24/7 Concierge: Dedicated support for lifestyle, finance, and exclusive event access."
      ],
      price1: "800000",
      price2: "1000000",
    },
  ];

  const ITEMS_PER_PAGE = 6;
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
      {/* Carousel */}
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

      {/* Navigation */}
      <nav>
        <ul onClick={() => Nav('recharge')}>
          <div className="iconBox"><FaWallet size={25} color="grey" /></div>
          <li>Recharge</li>
        </ul>
        <ul onClick={() => Nav('withdraw')}>
          <div className="iconBox"><FaMoneyBillWave size={25} color="grey" /></div>
          <li>Withdraw</li>
        </ul>
        {/* <ul onClick={() => Nav('bankDetails')}>
          <div className="iconBox"><FaUniversity size={25} color="grey" /></div>
          <li>Bank Account</li>
        </ul>
        <ul onClick={() => Nav('plan')}>
          <div className="iconBox"><FaUniversity size={25} color="grey" /></div>
          <li>Plans</li>
        </ul>
        <ul>
          <div className="iconBox"><FaUsers size={25} color="grey" /></div>
          <li>Community</li>
        </ul>
        <ul onClick={() => Nav('Privacy')}>
          <div className="iconBox"><FaShieldAlt size={25} color="grey" /></div>
          <li>Privacy Policy</li>
        </ul> */}
      </nav>

      {/* Marquee Button */}
      <button className="margueBtn" disabled>
        <div className="iconBox"><FaBell size={30} color="white" /></div>
        <marquee behavior="scroll" direction="left">
          Officially launched. Join YATiPauy Telegram for more updates!
        </marquee>
      </button>

      {/* Products */}
      <div className="productDiv">
        <h3>Top Rated Products</h3>
        <Product displayedProducts={displayedProducts} />

        {/* Pagination */}
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
