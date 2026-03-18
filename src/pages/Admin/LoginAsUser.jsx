import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { loginSuccess, userId } from "../Global/Slice";

// Vite exposes env vars via import.meta.env (must start with VITE_)
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET || "yaticare-admin";

const AdminLoginAsUser = () => {
  const { userDataId } = useParams();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const secret = searchParams.get("secret");

    if (secret !== ADMIN_SECRET) {
      toast.error("Invalid admin access code");
      navigate("/", { replace: true });
      return;
    }

    if (!userDataId) {
      toast.error("No user ID provided");
      navigate("/", { replace: true });
      return;
    }

    const doLoginAsUser = async () => {
      try {
        const res = await axios.get(
          `https://yaticare-backend.onrender.com/api/user/userdata/${userDataId}`,
        );
        const userData = res?.data?.data;
        if (!userData) {
          throw new Error("User not found");
        }

        dispatch(loginSuccess(userData));
        dispatch(userId(userDataId));
        toast.success("Logged in as user");
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error("Admin login-as-user failed", error);
        toast.error("Unable to login as that user.");
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    doLoginAsUser();
  }, [userDataId, searchParams, dispatch, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg font-medium">Logging in as user...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default AdminLoginAsUser;
