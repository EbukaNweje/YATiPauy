import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaHeadphones,
  FaUser,
  FaBars,
  FaRegCopy,
} from "react-icons/fa";
// import '../pages/pageCss/Layout.css';
import "./ComponentCss/Header.css";
import { IoMdArrowDropleft } from "react-icons/io";
import {
  FaWallet,
  FaMoneyBillWave,
  FaUniversity,
  FaUsers,
  FaBell,
  FaFileContract,
  FaShieldAlt,
} from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaNairaSign } from "react-icons/fa6";
import toast from "react-hot-toast";
import { BsCurrencyDollar } from "react-icons/bs";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const user = useSelector((state) => state.YATipauy.user);
  const depositSignal = useSelector((state) => state.YATipauy.depositAmout);
  const refLink = user.referralLink;

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `https://yaticare-back-end.vercel.app/api/user/userdata/${user.user._id}`
      );
      const data = response?.data?.data;
      setUserData(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const copy = (refLink) => {
    navigator.clipboard.writeText(refLink);
    toast.success("copied successfully");
  };

  React.useEffect(() => {
    // fetch when user logs in or when a deposit/withdraw/subscription updates the signal
    if (user?.user?._id) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, depositSignal]);

  React.useEffect(() => {}, [userData]);

  const isHomePage = location.pathname === "/dashboard";

  return (
    <div className="Header">
      {isHomePage ? (
        <div className="homeHcontent">
          <div className="header-content">
            <div
              className="profileler"
              onClick={() => navigate("Profile")}
              title="Go to Profile"
            >
              <FaUser size={20} color="grey" />
            </div>
            <div className="info">
              <h3>Hello, {userData ? userData.userName : "Loading..."}</h3>
              <div className="refinfo">
                <button disabled className="Btn">
                  Available Balance:
                  <BsCurrencyDollar />{" "}
                  {userData ? `${userData.accountBalance}.00` : "0.00"}
                </button>
                <div className="reflink">
                  Referral Link
                  <span onClick={() => copy(refLink)}>
                    <FaRegCopy />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="menu-container">
            <div
              className="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
              title="Toggle Menu"
            >
              <FaBars size={35} color="white" />
            </div>
            {menuOpen && (
              <div className="dropdown-menu">
                <button
                  onClick={() => {
                    navigate("recharge"), setMenuOpen(false);
                  }}
                >
                  <FaWallet size={30} color="grey" />
                  Add Funds
                </button>
                <button
                  onClick={() => {
                    navigate("withdraw"), setMenuOpen(false);
                  }}
                >
                  <FaMoneyBillWave size={30} color="grey" />
                  Withdraw
                </button>
                <button
                  onClick={() => {
                    navigate("WalletAddress"), setMenuOpen(false);
                  }}
                >
                  <FaUniversity size={30} color="grey" />
                  Wallet Address
                </button>
                <button
                  onClick={() => {
                    navigate("plan"), setMenuOpen(false);
                  }}
                >
                  <FaUniversity size={30} color="grey" />
                  Plans
                </button>
                {/* <button onClick={() => navigate("community")}>
                  <FaUsers size={30} color="grey" />
                  Community
                </button>
                <button onClick={() => navigate("Privacy")}>
                  <FaShieldAlt size={30} color="grey" />
                  Privacy Policy
                </button> */}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="pageContent">
          <div className="navBack" onClick={() => navigate(-1)} title="Go Back">
            <IoMdArrowDropleft size={40} />
          </div>
          <h3 style={{ color: "white", fontSize: "20px" }}>
            {location.pathname.replace("/dashboard/", "").toUpperCase()}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Header;
