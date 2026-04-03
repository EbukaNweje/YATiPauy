import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import toast from "react-hot-toast";

const TestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!testimonials.length || isPaused) return;

    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3200);

    return () => clearInterval(intervalId);
  }, [testimonials, isPaused]);

  useEffect(() => {
    if (!carouselRef.current || testimonials.length === 0) return;

    const cards = carouselRef.current.querySelectorAll("[data-card]");
    const activeCard = cards[activeIndex];
    if (!activeCard) return;

    carouselRef.current.scrollTo({
      left:
        activeCard.offsetLeft -
        (carouselRef.current.clientWidth - activeCard.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [activeIndex, testimonials]);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(
        "https://yaticare-backend.onrender.com/api/user/testimonials/approved",
      );
      setTestimonials(response.data.data || []);
      setActiveIndex(0);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const scrollToIndex = (idx) => {
    if (!carouselRef.current || testimonials.length === 0) return;
    const cards = carouselRef.current.querySelectorAll("[data-card]");
    const target = cards[idx];
    if (!target) return;

    setActiveIndex(idx);
    carouselRef.current.scrollTo({
      left:
        target.offsetLeft -
        (carouselRef.current.clientWidth - target.clientWidth) / 2,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    const next = (activeIndex - 1 + testimonials.length) % testimonials.length;
    scrollToIndex(next);
  };

  const handleNext = () => {
    if (testimonials.length === 0) return;
    const next = (activeIndex + 1) % testimonials.length;
    scrollToIndex(next);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="md:min-h-[60vh] h-[70vh] bg-gradient-to-b from-white via-orange-50 to-orange-100 py-14 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col items-center gap-12">
        <div className="mb-8 text-center">
          <p className="inline-block px-4 py-1 text-xs font-semibold tracking-wider text-orange-700 uppercase rounded-full bg-orange-100">
            Testimonials
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Trusted by users worldwide
          </h2>
          <p className="mt-3 text-gray-600 mx-auto">
            Real success stories from clients who rely on YatiCare every day.
          </p>
        </div>

        <div
          className="relative mt-20 w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-10 h-[200px] items-center"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style>{`#hidden-scrollbar::-webkit-scrollbar { display: none; }`}</style>
            {testimonials.length === 0 ? (
              <div className="snap-center min-w-full sm:min-w-[40vw] md:min-w-[35vw] lg:min-w-[30vw] xl:min-w-full rounded-2xl  borde mx-auto">
                {/* <FaQuoteLeft className="mx-auto h-16 w-16 text-[#022308f5] mb-6" /> */}
                <p className="text-gray-700 text-xl font-semibold text-center">
                  No testimonials yet
                </p>
                <p className="text-gray-500 text-center mt-3">
                  Be the first to share what you love about YatiCare.
                </p>
              </div>
            ) : (
              testimonials.map((testimonial, idx) => (
                <article
                  key={testimonial._id || idx}
                  data-card
                  className={`snap-center min-w-full max-w-2xl mx-autop-6 flex items-center flex-col transition-transform duration-300 ${
                    activeIndex === idx ? "scale-100" : "scale-95 opacity-80"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-4 bg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-[#022308f5]">
                      <FaQuoteLeft className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">
                        {testimonial.user?.userName || "Anonymous"}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {testimonial.date
                          ? new Date(testimonial.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )
                          : "Date not available"}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed mb-6 text-center">
                    {testimonial.testimonial || "No testimonial available"}
                  </p>
                </article>
              ))
            )}
          </div>

          <button
            onClick={handlePrev}
            aria-label="Prev testimonial"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 text-[#022308f5] border border-gray-200 shadow hover:bg-orange-50"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 text-[#022308f5] border border-gray-200 shadow hover:bg-orange-50"
          >
            <FaChevronRight />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => scrollToIndex(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  activeIndex === idx
                    ? "bg-[#022308f5]"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialPage;
