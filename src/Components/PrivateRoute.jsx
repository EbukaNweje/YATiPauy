import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const isLoggedIn = useSelector((state) => state.blackstone.isLoggedIn);
    console.log("PrivateRoute isLoggedIn:", isLoggedIn);  

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
