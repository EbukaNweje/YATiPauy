import { useEffect, useMemo, useState, useRef } from "react";
import {
  FaWallet,
  FaMoneyBillWave,
  FaChartLine,
  FaHistory,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./pageCss/Home.css";
import Product from "./Product";
import { useNavigate } from "react-router-dom";
import Bg from "../assets/bg.png";
import { images, products } from "../Components/Data";
import TelegramPopup from "../Components/TelegramPopup";
import TestimonialModal from "../Components/TestimonialModal";
import { useSelector } from "react-redux";
import axios from "axios";

const Home = () => {
  const ITEMS_PER_PAGE = 6;
  const [index, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();
  const isLoggedIn = useSelector((s) => s.YATipauy?.isLoggedIn);
  const reduxUser = useSelector((s) => s.YATipauy?.user);
  const currentUserId = reduxUser.user?._id || "anon";
  const [tgTrigger, setTgTrigger] = useState(0);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [marqueeTestimonials, setMarqueeTestimonials] = useState([]);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [isTestimonialCarouselPaused, setIsTestimonialCarouselPaused] =
    useState(false);
  const prevLoggedRef = useRef(false);
  const prevLoggedRefTestimonial = useRef(false);

  useEffect(() => {
    const durations = [4000, 3000, 3000];
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      durations[index % durations.length],
    );
    return () => clearInterval(interval);
  }, [index]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const displayedProducts = products.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
  );

  const testimonialsToShow = useMemo(() => {
    const filtered = marqueeTestimonials.filter(
      (item) => item.user?._id !== currentUserId,
    );
    return filtered.length > 0 ? filtered : marqueeTestimonials;
  }, [marqueeTestimonials, currentUserId]);

  useEffect(() => {
    const prev = prevLoggedRef.current;
    if (!prev && isLoggedIn) setTgTrigger((t) => t + 1);
    prevLoggedRef.current = isLoggedIn;
  }, [isLoggedIn]);

  useEffect(() => {
    const prev = prevLoggedRefTestimonial.current;
    if (!prev && isLoggedIn) {
      axios
        .get(
          `https://yaticare-backend.onrender.com/api/user/userdata/${currentUserId}`,
        )
        .then((response) => {
          setIsTestimonialModalOpen(
            !response.data.data.userTestimonial ? false : true,
          );
        })
        .catch(() => {});
    }
    prevLoggedRefTestimonial.current = isLoggedIn;
  }, [isLoggedIn, currentUserId]);

  useEffect(() => {
    axios
      .get(
        "https://yaticare-backend.onrender.com/api/user/testimonials/approved",
      )
      .then((res) => setMarqueeTestimonials(res.data.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!testimonialsToShow.length || isTestimonialCarouselPaused) return;
    const timer = setInterval(
      () =>
        setActiveTestimonialIndex(
          (prev) => (prev + 1) % testimonialsToShow.length,
        ),
      4500,
    );
    return () => clearInterval(timer);
  }, [testimonialsToShow, isTestimonialCarouselPaused]);

  const handlePrevTestimonial = () => {
    if (!testimonialsToShow.length) return;
    setActiveTestimonialIndex(
      (prev) =>
        (prev - 1 + testimonialsToShow.length) % testimonialsToShow.length,
    );
  };
  const handleNextTestimonial = () => {
    if (!testimonialsToShow.length) return;
    setActiveTestimonialIndex((prev) => (prev + 1) % testimonialsToShow.length);
  };

  /* Quick-action items */
  const quickActions = [
    {
      icon: <FaWallet size={20} color="#065f46" />,
      label: "Add Funds",
      path: "recharge",
    },
    {
      icon: <FaMoneyBillWave size={20} color="#065f46" />,
      label: "Withdraw",
      path: "withdraw",
    },
    {
      icon: <FaChartLine size={20} color="#065f46" />,
      label: "Plans",
      path: "plan",
    },
    {
      icon: <FaHistory size={20} color="#065f46" />,
      label: "History",
      path: "history",
    },
  ];

  return (
    <div className="Home">
      <TelegramPopup trigger={tgTrigger} />
      <TestimonialModal
        isOpen={isTestimonialModalOpen}
        onClose={() => setIsTestimonialModalOpen(false)}
        userId={currentUserId}
      />

      {/* ---- Hero Banner ---- */}
      <div className="home-hero" style={{ backgroundImage: `url(${Bg})` }}>
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <p className="home-hero-label">YATiCare Investment Platform</p>
          <h1>Built On Humanity. Powered By Growth.</h1>
          <p className="home-hero-sub">
            Every step you take empowers a community and helps write a story of
            shared success.
          </p>
          <button
            className="home-hero-btn"
            onClick={() => navigate("/dashboard/plan")}
          >
            Start Investing
          </button>
        </div>
      </div>

      {/* ---- Quick Actions ---- */}
      <nav>
        {quickActions.map((a) => (
          <ul key={a.path} onClick={() => navigate(a.path)}>
            <div className="iconBox">{a.icon}</div>
            <li>{a.label}</li>
          </ul>
        ))}
      </nav>

      {/* ---- Testimonials Carousel ---- */}
      <div
        className="testimonialCarousel"
        onMouseEnter={() => setIsTestimonialCarouselPaused(true)}
        onMouseLeave={() => setIsTestimonialCarouselPaused(false)}
      >
        <div className="testimonialCarouselHeader">
          <div>
            <div className="testimonialCarouselLabel">Official Update</div>
            <p className="testimonialCarouselText">
              Officially launched 14th of February. Join YATiCare Telegram for
              more updates!
            </p>
          </div>
          <div className="testimonialCarouselButtons">
            <button
              onClick={handlePrevTestimonial}
              className="testimonialCarouselBtn"
              aria-label="Previous"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNextTestimonial}
              className="testimonialCarouselBtn"
              aria-label="Next"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="testimonialCarouselCard">
          {testimonialsToShow.length > 0 ? (
            <>
              <div className="testimonialCarouselCardHeader">
                <h4>
                  {testimonialsToShow[activeTestimonialIndex].user?.userName ||
                    "Anonymous"}
                </h4>
                <p className="testimonialDate">
                  {new Date(
                    testimonialsToShow[activeTestimonialIndex].createdAt ||
                      testimonialsToShow[activeTestimonialIndex].date,
                  ).toLocaleDateString()}
                </p>
              </div>
              <p className="testimonialCarouselTextBody">
                {testimonialsToShow[activeTestimonialIndex].testimonial ||
                  testimonialsToShow[activeTestimonialIndex].message ||
                  "Great service!"}
              </p>
            </>
          ) : (
            <div className="testimonialEmptyState">
              <p>No testimonials yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>

        <div className="testimonialCarouselDots">
          {testimonialsToShow.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              className={`testimonialCarouselDot${activeTestimonialIndex === idx ? " active" : ""}`}
              onClick={() => setActiveTestimonialIndex(idx)}
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ---- Products ---- */}
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
};

export default Home;
