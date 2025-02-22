import React from 'react'
import {RouterProvider, createHashRouter} from "react-router-dom";
import Login2 from './pages/Auth/Login2'
import Signup from './pages/Auth/Signup'
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
import Forgot from './pages/Auth/Forgot';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Plan from './pages/Plan';

const App = () => {
  const router = createHashRouter([
    {
      path : "/",
      element: <Login2/>
    },
    {
      path : "/Sign-up",
      element: <Signup/>
    },
    {
      path : "/Forgottenpassword",
      element: <Forgot/>
    },
    { path: 'dashboard', element: <Layout/>, children:[
    {path: '', element: <Home/>},
    {path: 'Products', element: <ProductS/>},
    {path: 'recharge', element: <Recharge/>},
    {path: 'withdraw', element: <Withdraw/>},
    {path: 'bankDetails', element: <Bank/>},
    {path: 'Profile', element: <Profile/>},
    {path: 'history', element: <History/>},
    {path: 'Vip', element: <Vip/>},
    {path: 'plan', element: <Plan/>},
    {path: 'changePassword', element: <Change/>},
    {path: 'terms', element: <Terms/>},
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