import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { logout } from "../pages/Global/Slice";

const PrivateRoute = () => {
  const { isLoggedIn, user } = useSelector((state) => state.YATipauy || {});
  const reduxId = useSelector((state) => state?.YATipauy?.id);
  const finalId = user?.user?._id || reduxId;

  const [checking, setChecking] = useState(true);
  const [userData, setUserData] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timer = useRef(null);

  // 🔐 Check if user is blocked
  useEffect(() => {
    let mounted = true;

    const checkBlocked = async () => {
      if (!isLoggedIn || !finalId) {
        setChecking(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://yaticare-back-end.vercel.app/api/user/userdata/${finalId}`
        );
        const data = res?.data?.data;
        if (!mounted) return;
        setUserData(data);

        if (data?.status === "blocked" || data?.status === "banned") {
          dispatch(logout());
          toast.error("Your account has been blocked. Please contact support.");
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.error("PrivateRoute fetch error:", err);
      } finally {
        if (mounted) setChecking(false);
      }
    };

    checkBlocked();
    return () => {
      mounted = false;
    };
  }, [isLoggedIn, finalId, dispatch, navigate]);

  // ⏱️ Auto logout on inactivity
  useEffect(() => {
    if (!isLoggedIn) return;

    const logoutUser = () => {
      dispatch(logout());
      toast("You've been logged out due to inactivity.");
      navigate("/auth/login");
    };

    const resetTimer = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(logoutUser, 10 * 60 * 1000); // 10 minutes
    };

    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timer.current) clearTimeout(timer.current);
    };
  }, [isLoggedIn, dispatch, navigate]);

  if (!isLoggedIn) return <Navigate to="/" replace />;
  if (checking) return null;
  if (userData?.status === "blocked" || userData?.status === "banned") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
