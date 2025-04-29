import React from 'react'
import {RouterProvider, createHashRouter} from "react-router-dom";
import Login2 from './Components/Auth/Login'
import Signup from './Components/Auth/SignUp'
import Layout from './pages/Layout';
import Home from './pages/Home'
import Product from './pages/Product';
import ProductS from './pages/Product2';
import Recharge from './pages/Recharge';
import Withdraw from './pages/Withdraw';
import Bank from './pages/Bank';
import Profile from './pages/Profile';
import History from './pages/History';
import Change from './pages/Auth/Change';
import Vip from './pages/Vip';
import Forgot from './Components/Auth/Forgotpassword';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Plan from './pages/Plan';
import Resetpass from "./Components/Auth/Resetpassword"
import LandingPage from './pages/LandingPage'
import ContactUs from './pages/ContactUs'
import ProfileSettings from './pages/ProfileSettings';
import RefPage from './pages/RefPage';
// import FAQ from './pages/FAQ';

const App = () => {
  const router = createHashRouter([

    {
      path : "/",
      element: <LandingPage/>},
    {
      path : "/auth/login",
      element: <Login2/>
    },
    {
      path : "/auth/Sign-up",
      element: <Signup/>
    },
    {
      path : "/auth/Forgottenpassword",
      element: <Forgot/>
    },
    {
      path : "/auth/Resetpassword",
      element: <Resetpass/>
    },
    {
      path : "/contact-us",
      element: <ContactUs/>
    },
    {path: 'terms', element: <Terms/>},
    { path: 'dashboard', element: <Layout/>, children:[
    {path: '', element: <Home/>},
    {path: 'Products', element: <ProductS/>},
    {path: 'recharge', element: <Recharge/>},
    {path: 'withdraw', element: <Withdraw/>},
    {path: 'bankDetails', element: <Bank/>},
    {path: 'referrals', element: <RefPage/>},
    {path: 'Profile', element: <Profile/>},
    {path: 'accountSettings', element: <ProfileSettings/>},
    {path: 'history', element: <History/>},
    {path: 'myPlans', element: <Vip/>},
    {path: 'plan', element: <Plan/>},
    {path: 'changePassword', element: <Change/>},

    {path: 'Privacy', element: <Privacy/>},
    ] }
  ])
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App