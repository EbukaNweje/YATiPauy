import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaShoppingBag, FaCrown, FaUser } from "react-icons/fa";
import "../pages/pageCss/Layout.css";
import { useSelector } from "react-redux";
import { HiMiniChatBubbleOvalLeft } from "react-icons/hi2";
import axios from "axios";

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

    const fetchChatCount = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/user/${encodeURIComponent(userEmail)}`,
        );
        const conversation = res?.data?.data;
        setChatCount(conversation?.unreadByUser || 0);
      } catch (error) {
        console.error("Error fetching chat count:", error);
        setChatCount(0);
      }
    };

    fetchChatCount();
  }, [userEmail]);

  useEffect(() => {
    const onChatRead = () => setChatCount(0);
    const onChatNewMessage = (event) => {
      const isChatOpen = location.pathname
        .toLowerCase()
        .includes("/dashboard/chat");
      if (isChatOpen) return;

      const increment = Number(event?.detail?.count || 1);
      setChatCount((current) => current + increment);
    };

    window.addEventListener("chat:read", onChatRead);
    window.addEventListener("chat:new-message", onChatNewMessage);
    return () => {
      window.removeEventListener("chat:read", onChatRead);
      window.removeEventListener("chat:new-message", onChatNewMessage);
    };
  }, [location.pathname]);

  return (
    <div className="Footer" style={{ height: "70px" }}>
      <nav>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "footer-link-active" : "footer-link"
            }
          >
            <FaHome size={20} />
            <h3>Home</h3>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="plan"
            className={({ isActive }) =>
              isActive ? "footer-link-active" : "footer-link"
            }
          >
            <FaShoppingBag size={20} />
            <h3>Plans</h3>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/myPlans"
            className={({ isActive }) =>
              isActive ? "footer-link-active" : "footer-link"
            }
          >
            <FaCrown size={20} />
            <h3>My Subscriptions</h3>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/Chat"
            className={({ isActive }) =>
              isActive ? "footer-link-active" : "footer-link"
            }
          >
            <div className="chat-icon-wrapper">
              <HiMiniChatBubbleOvalLeft size={20} />
              {chatCount > 0 && <span className="chat-badge">{chatCount}</span>}
            </div>
            <h3>Chat</h3>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/Profile"
            className={({ isActive }) =>
              isActive ? "footer-link-active" : "footer-link"
            }
          >
            <FaUser size={20} />
            <h3>Profile</h3>
          </NavLink>
        </li>

        {/* <li>
          <NavLink 
          onClick={handleLogout}
          className={({ isActive }) => isActive ? "footer-link-active" : "footer-link"}>
            <FaPowerOff size={30} />
            <h3>Logout</h3>
          </NavLink>
        </li> */}
      </nav>
    </div>
  );
};

export default Footer;
