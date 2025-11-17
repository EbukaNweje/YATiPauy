import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaWallet,
  FaMoneyBillWave,
  FaUniversity,
  FaUsers,
  FaBell,
  FaShieldAlt,
} from "react-icons/fa";
import "./pageCss/Home.css";
import Product from "./Product";
import { useNavigate, useParams } from "react-router-dom";
import Bg from "../assets/bg.png";
import { images, products } from "../Components/Data";
import { useDispatch } from "react-redux";
import { userId } from "./Global/Slice";

const Home = () => {
  const ITEMS_PER_PAGE = 6;
  const [index, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const { userDataId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userDataId) {
      dispatch(userId(userDataId));
      navigate("/dashboard");
    }
  }, [userDataId, dispatch, navigate]);

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
      {/* <div className="carousel-container"> */}
      <div
        className="carousel-item relative flex items-center justify-center text-white h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center mb-10"
        style={{ backgroundImage: `url(${Bg})` }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        {/* Dark overlay behind text */}
        <div className="relative z-20 text-center px-6 max-w-2xl flex flex-col items-center gap-6 mx-auto sm:mx-0">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Welcome To A Movement Built On Humanity.
          </h1>
          <span className="text-[lightgray] text-lg md:text-xl mb-6">
            Every step you take empowers a community, bridges an economic gap,
            and helps write a story of shared success.
          </span>
          <button
            onClick={() => Nav("/dashboard/plan")}
            className="bg-green-600 hover:bg-green-700 w-[150px] h-[40px] text-white font-semibold px-6 py-3 rounded-[5px] shadow-lg transition"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* </div> */}

      {/* Navigation */}
      <nav>
        <ul onClick={() => Nav("recharge")}>
          <div className="iconBox">
            <FaWallet size={25} color="grey" />
          </div>
          <li>Add Funds</li>
        </ul>
        <ul onClick={() => Nav("withdraw")}>
          <div className="iconBox">
            <FaMoneyBillWave size={25} color="grey" />
          </div>
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
        <div className="iconBox">
          <FaBell size={30} color="white" />
        </div>
        <marquee behavior="scroll" direction="left">
          Officially launched 31st of September. Join YATiCare Telegram for more
          updates!
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
};

export default Home;
