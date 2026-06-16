import { useEffect, useMemo, useState, useRef } from "react";
import {
  FaWallet,
  FaMoneyBillWave,
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

  const testimonialsToShow = useMemo(() => {
    const filtered = marqueeTestimonials.filter(
      (item) => item.user?._id !== currentUserId,
    );
    return filtered.length > 0 ? filtered : marqueeTestimonials;
  }, [marqueeTestimonials, currentUserId]);

  const Nav = useNavigate();

  useEffect(() => {
    const prev = prevLoggedRef.current;
    if (!prev && isLoggedIn) {
      setTgTrigger((t) => t + 1);
    }
    prevLoggedRef.current = isLoggedIn;
  }, [isLoggedIn]);

  useEffect(() => {
    const prev = prevLoggedRefTestimonial.current;
    if (!prev && isLoggedIn) {
      // Check if user has already submitted a testimonial
      axios
        .get(
          `https://yaticare-backend.onrender.com/api/user/userdata/${currentUserId}`,
        )
        .then((response) => {
          if (!response.data.data.userTestimonial) {
            // User has testimonials, do not show modal
            setIsTestimonialModalOpen(false);
          } else {
            // No testimonials, show modal
            setIsTestimonialModalOpen(true);
          }
        })
        .catch((error) => {
          console.error("Error checking testimonials:", error);
          // If error, don't show modal to be safe
        });
    }

    prevLoggedRefTestimonial.current = isLoggedIn;
  }, [isLoggedIn, currentUserId]);

  useEffect(() => {
    const fetchTestimonialsForMarquee = async () => {
      try {
        const response = await axios.get(
          "https://yaticare-backend.onrender.com/api/user/testimonials/approved",
        );
        setMarqueeTestimonials(response.data.data || []);
      } catch (error) {
        console.error("Error fetching marquee testimonials:", error);
      }
    };

    fetchTestimonialsForMarquee();
  }, []);

  useEffect(() => {
    if (!testimonialsToShow.length || isTestimonialCarouselPaused) return;

    const timer = setInterval(() => {
      setActiveTestimonialIndex(
        (prev) => (prev + 1) % testimonialsToShow.length,
      );
    }, 4500);

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

  return (
    <div className="Home">
      <TelegramPopup trigger={tgTrigger} />
      <TestimonialModal
        isOpen={isTestimonialModalOpen}
        onClose={() => setIsTestimonialModalOpen(false)}
        userId={currentUserId}
      />
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

      {/* Testimonials Carousel */}
      <div
        className="testimonialCarousel"
        onMouseEnter={() => setIsTestimonialCarouselPaused(true)}
        onMouseLeave={() => setIsTestimonialCarouselPaused(false)}
      >
        <div className="testimonialCarouselHeader">
          <div>
            <div className="testimonialCarouselLabel">Official update</div>
            <p className="testimonialCarouselText">
              Officially launched 14th of February. Join YATiCare Telegram for
              more updates!
            </p>
          </div>
          <div className="testimonialCarouselButtons">
            <button
              onClick={handlePrevTestimonial}
              className="testimonialCarouselBtn"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNextTestimonial}
              className="testimonialCarouselBtn"
              aria-label="Next testimonial"
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
                  {testimonialsToShow[activeTestimonialIndex].createdAt
                    ? new Date(
                        testimonialsToShow[activeTestimonialIndex].createdAt,
                      ).toLocaleDateString()
                    : testimonialsToShow[activeTestimonialIndex].date
                      ? new Date(
                          testimonialsToShow[activeTestimonialIndex].date,
                        ).toLocaleDateString()
                      : "Date not available"}
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
              <p>No testimonials available right now.</p>
              <p>Be the first to share your experience!</p>
            </div>
          )}
        </div>

        <div className="testimonialCarouselDots">
          {testimonialsToShow.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              className={`testimonialCarouselDot ${
                activeTestimonialIndex === idx ? "active" : ""
              }`}
              onClick={() => setActiveTestimonialIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>

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
