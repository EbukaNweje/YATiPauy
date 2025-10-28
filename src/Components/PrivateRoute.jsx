import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { logout } from "../pages/Global/Slice";

// PrivateRoute: allows access only when user is logged in and not blocked.
const PrivateRoute = () => {
  const { isLoggedIn, user } = useSelector((state) => state.YATipauy || {});
  const reduxId = useSelector((state) => state?.YATipauy?.id);
  const finalId = user?.user?._id || reduxId;

  const [checking, setChecking] = useState(true);
  const [userData, setUserData] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const checkBlocked = async () => {
      // if not logged in we don't need to call API
      if (!isLoggedIn) {
        setChecking(false);
        return;
      }
      if (!finalId) {
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
          // log out user locally and redirect with message
          dispatch(logout());
          toast.error("Your account has been blocked. Please contact support.");
          navigate("/", { replace: true });
          return;
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

  // not logged in -> redirect to landing/login
  if (!isLoggedIn) return <Navigate to="/" replace />;

  // while we're checking the server, don't render protected content
  if (checking) return null;

  // if user data says blocked (fallback)
  if (userData?.status === "blocked" || userData?.status === "banned") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
