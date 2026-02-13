import { useEffect, useState, useRef } from "react";
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
import TelegramPopup from "../Components/TelegramPopup";
import { useDispatch, useSelector } from "react-redux";
import { userId } from "./Global/Slice";

const Home = () => {
  const ITEMS_PER_PAGE = 6;
  const [index, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const { userDataId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((s) => s.YATipauy?.isLoggedIn);
  const reduxUser = useSelector((s) => s.YATipauy?.user);
  const currentUserId = reduxUser?.user?._id || "anon";
  const [tgTrigger, setTgTrigger] = useState(0);
  const prevLoggedRef = useRef(false);

  useEffect(() => {
    if (userDataId) {
      dispatch(userId(userDataId));
      navigate("/dashboard");
    }
  }, [userDataId, dispatch, navigate]);

  useEffect(() => {
    const durations = [4000, 3000, 3000];
    const interval = setInterval(
      () => {
        setIndex((prev) => (prev + 1) % images.length);
      },
      durations[index % durations.length],
    );
    return () => clearInterval(interval);
  }, [index]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const displayedProducts = products.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
  );

  const Nav = useNavigate();

  useEffect(() => {
    const prev = prevLoggedRef.current;
    const shownKey = `tg_shown_${currentUserId}`;
    if (!prev && isLoggedIn) {
      const alreadyShown = sessionStorage.getItem(shownKey);
      if (!alreadyShown) {
        setTgTrigger((t) => t + 1);
        try {
          sessionStorage.setItem(shownKey, "1");
        } catch (e) {
          /* ignore */
        }
      }
    }
    prevLoggedRef.current = isLoggedIn;
  }, [isLoggedIn]);

  return (
    <div className="Home">
      <TelegramPopup trigger={tgTrigger} />
      {/* Carousel */}
      {/* <div className="carousel-container"> */}
      <div
        className="relative flex items-center justify-center text-white h-[300px] w-[100%] md:h-[400px] lg:h-[500px] bg-cover bg-center mb-10"
        style={{ backgroundImage: `url(${Bg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-2xl flex flex-col items-center gap-6 mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Welcome To A Movement Built On Humanity.
          </h1>
          <p className="text-lg md:text-xl mb-6" style={{ color: "white" }}>
            Every step you take empowers a community, bridges an economic gap,
            and helps write a story of shared success.
          </p>
          <button
            onClick={() => navigate("/dashboard/plan")}
            className="bg-green-600 hover:bg-green-700 w-[150px] h-[40px] text-white font-semibold px-6 py-2 rounded shadow-lg transition duration-300"
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
          Officially launched 14th of February. Join YATiCare Telegram for more
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
