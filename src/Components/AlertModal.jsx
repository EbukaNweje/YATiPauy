import { createContext, useCallback, useContext, useState } from "react";
import "./AlertModal.css";

/* ─────────────────────────────────────────────
   Context
───────────────────────────────────────────── */
const AlertCtx = createContext(null);

/* ─────────────────────────────────────────────
   Provider  — wrap the whole app with this
───────────────────────────────────────────── */
export const AlertProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);

  const show = useCallback((type, message) => {
    const id = Date.now() + Math.random();
    setQueue((q) => [...q, { id, type, message }]);
  }, []);

  const close = useCallback((id) => {
    setQueue((q) => q.filter((item) => item.id !== id));
  }, []);

  const success = useCallback((msg) => show("success", msg), [show]);
  const error = useCallback((msg) => show("error", msg), [show]);
  const info = useCallback((msg) => show("info", msg), [show]);

  return (
    <AlertCtx.Provider value={{ success, error, info }}>
      {children}

      {/* render one modal per queued alert, stacked via CSS */}
      {queue.map((item, idx) => (
        <AlertModal
          key={item.id}
          {...item}
          stackIndex={idx}
          onClose={() => close(item.id)}
        />
      ))}
    </AlertCtx.Provider>
  );
};

/* ─────────────────────────────────────────────
   Hook  — use anywhere instead of toast
   e.g.  const alert = useAlert();
         alert.success("Done!");
         alert.error("Something went wrong");
───────────────────────────────────────────── */
export const useAlert = () => {
  const ctx = useContext(AlertCtx);
  if (!ctx) throw new Error("useAlert must be used inside <AlertProvider>");
  return ctx;
};

/* ─────────────────────────────────────────────
   Single modal card
───────────────────────────────────────────── */
const ICONS = {
  success: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-5" />
    </svg>
  ),
  error: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9l-6 6M9 9l6 6" />
    </svg>
  ),
  info: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  ),
};

const TITLES = { success: "Success", error: "Error", info: "Info" };

const AlertModal = ({ type, message, onClose }) => (
  <div className="am-overlay" onClick={onClose} role="dialog" aria-modal="true">
    <div
      className={`am-card am-card--${type}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Icon circle */}
      <div className={`am-icon am-icon--${type}`}>{ICONS[type]}</div>

      {/* Text */}
      <div className="am-body">
        <h4 className="am-title">{TITLES[type]}</h4>
        <p className="am-message">{message}</p>
      </div>

      {/* Close button */}
      <button className="am-close-btn" onClick={onClose} aria-label="Close">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Action button */}
      <button
        className={`am-action-btn am-action-btn--${type}`}
        onClick={onClose}
      >
        OK
      </button>
    </div>
  </div>
);

export default AlertModal;
