import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { logout } from "../pages/Global/Slice";

const isAdminOrSuperAdmin = (userRecord) => {
  const roleCandidates = [
    userRecord?.role,
    userRecord?.userRole,
    userRecord?.userType,
    userRecord?.user?.role,
    userRecord?.user?.userRole,
    userRecord?.user?.userType,
  ];

  const roleText = roleCandidates.filter(Boolean).join(" ").toLowerCase();
  const isFlaggedAdmin =
    userRecord?.isAdmin === true ||
    userRecord?.isSuperAdmin === true ||
    userRecord?.user?.isAdmin === true ||
    userRecord?.user?.isSuperAdmin === true;

  return isFlaggedAdmin || /(admin|superadmin|supperadmin)/i.test(roleText);
};

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
          `https://yaticare-backend.onrender.com/api/user/userdata/${finalId}`,
        );
        const data = res?.data?.data;
        if (!mounted) return;
        setUserData(data);

        const isBlockedUser =
          data?.status === "blocked" || data?.status === "banned";
        const canBypassBlock = isAdminOrSuperAdmin(data);

        if (isBlockedUser && !canBypassBlock) {
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

  const isBlockedUser =
    userData?.status === "blocked" || userData?.status === "banned";
  const canBypassBlock = isAdminOrSuperAdmin(userData);

  if (isBlockedUser && !canBypassBlock) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
