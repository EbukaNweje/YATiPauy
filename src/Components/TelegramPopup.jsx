import React, { useEffect, useState } from "react";
import { FaTelegramPlane, FaTimes } from "react-icons/fa";
import "./ComponentCss/TelegramPopup.css";

const TELEGRAM_URL = "https://t.me/+lnOJnUzDLUM5OTVk"; // replace with your Telegram link
const STORAGE_KEY = "tg_popup_dismissed_v1";

const TelegramPopup = ({ trigger = 0 }) => {
  const [visible, setVisible] = useState(false);
  const [lastTrigger, setLastTrigger] = useState(0);

  useEffect(() => {
    // normal mount behavior: respect dismissal
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        const t = setTimeout(() => setVisible(true), 2000);
        return () => clearTimeout(t);
      }
    } catch (e) {
      setVisible(true);
    }
  }, []);

  // programmatic trigger: open when `trigger` increments
  useEffect(() => {
    if (trigger && trigger !== lastTrigger) {
      setVisible(true);
      setLastTrigger(trigger);
    }
  }, [trigger, lastTrigger]);

  const close = (remember = true) => {
    setVisible(false);
    if (remember) {
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch (e) {
        // ignore
      }
    }
  };

  if (!visible) return null;

  return (
    <div className="tg-popup-overlay" onClick={() => close(false)}>
      <div
        className="tg-popup"
        role="dialog"
        aria-label="Join our Telegram"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="tg-close" onClick={() => close()} aria-label="Close">
          <FaTimes />
        </button>

        <div className="tg-content">
          <div className="tg-emoji">📣</div>
          <div className="tg-text">
            <h4>Join our Telegram</h4>
            <p>Get the latest updates, announcements and community support.</p>
          </div>
        </div>

        <div className="tg-actions">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="tg-join"
          >
            <FaTelegramPlane className="tg-icon" /> Join Now
          </a>
          <button className="tg-later" onClick={() => close(true)}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelegramPopup;
