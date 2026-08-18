import React, { useState } from "react";
import axios from "axios";
import { useAlert } from './AlertModal';
import "./TestimonialModal.css"; // We'll create this CSS files for styling the modal

const TestimonialModal = ({ isOpen, onClose, userId }) => {
  const alert = useAlert();
  const [testimonial, setTestimonial] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setLoading(true);

    if (!testimonial.trim()) {
      alert.error("Please enter a testimonial");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "https://yaticare-backend.onrender.com/api/user/testimonials",
        {
          userId,
          testimonial: testimonial.trim(),
        },
      );

      alert.success("Thank you for your testimonial!");
      setTestimonial("");
      onClose();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      alert.error("Failed to submit testimonial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="testimonial-modal-overlay">
      <div className="testimonial-modal">
        <h2>Share Your Testimonial</h2>
        <p>
          We would love to hear your experience! Please share your testimonial
          below.
        </p>
        <textarea
          value={testimonial}
          onChange={(e) => setTestimonial(e.target.value)}
          placeholder="Write your testimonial here..."
          rows={4}
        />
        <div className="modal-buttons">
          <button
            onClick={handleSubmit}
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Testimonial"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialModal;
