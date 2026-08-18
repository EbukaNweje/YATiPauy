import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaShoppingBag, FaCrown, FaUser } from "react-icons/fa";
import { HiMiniChatBubbleOvalLeft } from "react-icons/hi2";
import "../pages/pageCss/Layout.css";
import { useSelector } from "react-redux";
import axios from "axios";

const NAV_ITEMS = [
  { to: "/dashboard", icon: <FaHome size={20} />, label: "Home" },
  { to: "plan", icon: <FaShoppingBag size={20} />, label: "Plans" },
  { to: "/dashboard/myPlans", icon: <FaCrown size={20} />, label: "Mine" },
  {
    to: "/dashboard/Chat",
    icon: null /* chat uses special wrapper */,
    label: "Chat",
    isChat: true,
  },
  { to: "/dashboard/Profile", icon: <FaUser size={20} />, label: "Profile" },
];

const Footer = () => {
  const location = useLocation();
  const user = useSelector((state) => state?.YATipauy?.user);
  const currentUser = user?.user || user || null;
  const userEmail =
    currentUser?.email ||
    currentUser?.userEmail ||
    currentUser?.user?.email ||
    "";
  const [chatCount, setChatCount] = useState(0);
  const API_BASE = "https://yaticare-backend.onrender.com/api/chat";

  useEffect(() => {
    if (!userEmail) {
      setChatCount(0);
      return;
    }
    axios
      .get(`${API_BASE}/user/${encodeURIComponent(userEmail)}`)
      .then((res) => setChatCount(res?.data?.data?.unreadByUser || 0))
      .catch(() => setChatCount(0));
  }, [userEmail]);

  useEffect(() => {
    const onRead = () => setChatCount(0);
    const onNew = (e) => {
      if (location.pathname.toLowerCase().includes("/dashboard/chat")) return;
      setChatCount((c) => c + Number(e?.detail?.count || 1));
    };
    window.addEventListener("chat:read", onRead);
    window.addEventListener("chat:new-message", onNew);
    return () => {
      window.removeEventListener("chat:read", onRead);
      window.removeEventListener("chat:new-message", onNew);
    };
  }, [location.pathname]);

  return (
    <div className="Footer">
      <nav>
        {NAV_ITEMS.map(({ to, icon, label, isChat }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/dashboard"}
              className={({ isActive }) =>
                isActive ? "footer-link-active" : "footer-link"
              }
            >
              {isChat ? (
                <div className="chat-icon-wrapper">
                  <HiMiniChatBubbleOvalLeft size={20} />
                  {chatCount > 0 && (
                    <span className="chat-badge">{chatCount}</span>
                  )}
                </div>
              ) : (
                icon
              )}
              <h3>{label}</h3>
            </NavLink>
          </li>
        ))}
      </nav>
    </div>
  );
};

export default Footer;
