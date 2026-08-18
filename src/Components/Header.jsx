import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBars,
  FaRegCopy,
  FaWallet,
  FaMoneyBillWave,
  FaUniversity,
  FaChartLine,
  FaTimes,
} from "react-icons/fa";
import { IoMdArrowDropleft } from "react-icons/io";
import { BsCurrencyDollar } from "react-icons/bs";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAlert } from "./AlertModal";
import "./ComponentCss/Header.css";

/* Human-readable page title map */
const PAGE_TITLES = {
  plan: "Investment Plans",
  myplans: "My Subscriptions",
  recharge: "Add Funds",
  withdraw: "Withdraw",
  deposit: "Deposit",
  history: "Transaction History",
  profile: "My Profile",
  profileinfo: "Personal Info",
  accountsettings: "Account Settings",
  referrals: "Referrals",
  chat: "Support Chat",
  walletaddress: "Wallet Address",
  bankdetails: "Bank Details",
  changepin: "Change PIN",
  changepassword: "Change Password",
  changephonenumber: "Change Phone",
  plandetails: "Plan Details",
  vip: "VIP Plans",
};

const getPageTitle = (pathname) => {
  const segment = pathname
    .replace("/dashboard/", "")
    .toLowerCase()
    .split("/")[0];
  return (
    PAGE_TITLES[segment] ||
    segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const alert = useAlert();

  const user = useSelector((state) => state.YATipauy.user);
  const depositSignal = useSelector((state) => state.YATipauy.depositAmount);
  const reduxId = useSelector((state) => state?.YATipauy?.id);
  const finalId = user?.user?._id || reduxId;
  const refLink = user?.referralLink;

  const isHomePage = location.pathname === "/dashboard";

  const formatCurrency = (val) => {
    const n = Number(val);
    if (!Number.isFinite(n)) return "0.00";
    return n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  /* close menu on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (
        !e.target.closest(".menu-container") &&
        !e.target.closest(".dropdown-menu")
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  /* fetch user data */
  useEffect(() => {
    if (!finalId) return;
    axios
      .get(`https://yaticare-backend.onrender.com/api/user/userdata/${finalId}`)
      .then((res) => setUserData(res?.data?.data))
      .catch(() => {});
  }, [user, finalId, depositSignal]);

  const copy = () => {
    if (!refLink) return;
    alert.success("Referral link copied!");
  };

  const menuItems = [
    { icon: <FaWallet />, label: "Add Funds", path: "recharge" },
    { icon: <FaMoneyBillWave />, label: "Withdraw", path: "withdraw" },
    { icon: <FaUniversity />, label: "Wallet Address", path: "WalletAddress" },
    { icon: <FaChartLine />, label: "Plans", path: "plan" },
  ];

  return (
    <div className="Header">
      {isHomePage ? (
        /* ---- Home header ---- */
        <div className="homeHcontent">
          <div className="header-content">
            <div
              className="profileler"
              onClick={() => navigate("Profile")}
              title="Profile"
            >
              <FaUser size={18} color="#065f46" />
            </div>

            <div className="info">
              <h3>
                Welcome, <strong>{userData?.userName ?? "..."}</strong>
              </h3>
              <div className="refinfo">
                <button className="Btn" disabled>
                  <BsCurrencyDollar />
                  <span>
                    {userData
                      ? formatCurrency(userData.accountBalance)
                      : "0.00"}
                  </span>
                </button>
                <div
                  className="reflink"
                  onClick={copy}
                  title="Copy referral link"
                >
                  <FaRegCopy /> Referral Link
                </div>
              </div>
            </div>
          </div>
          {/* 
          <div className="menu-container">
            <div
              className="Menu"
              onClick={() => setMenuOpen((o) => !o)}
              title="Menu"
            >
              {menuOpen ? (
                <FaTimes size={20} color="white" />
              ) : (
                <FaBars size={20} color="white" />
              )}
            </div>

            {menuOpen && (
              <div className="dropdown-menu">
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMenuOpen(false);
                    }}
                  >
                    {item.icon} {item.label}
                  </button>
                ))}
              </div>
            )}
          </div> */}
        </div>
      ) : (
        /* ---- Sub-page header ---- */
        <div className="pageContent">
          <div className="navBack" onClick={() => navigate(-1)} title="Go Back">
            <IoMdArrowDropleft size={28} />
          </div>
          <h3>{getPageTitle(location.pathname)}</h3>
        </div>
      )}
    </div>
  );
};

export default Header;
