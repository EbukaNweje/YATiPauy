import React from 'react'
import {RouterProvider, createHashRouter} from "react-router-dom";
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Layout from './pages/Layout';
import Home from './pages/Home'
import Product from './pages/Product';
import ProductS from './pages/Product2';
import Recharge from './pages/Recharge';
import Withdraw from './pages/Withdraw';
import Bank from './pages/Bank';
import Profile from './pages/Profile';
import History from './pages/history';
import Change from './pages/Auth/Change';

const App = () => {
  const router = createHashRouter([
    {
      path : "/",
      element: <Login/>
    },
    {
      path : "/Sign-up",
      element: <Signup/>
    },
    { path: 'dashboard', element: <Layout/>, children:[
    {path: '', element: <Home/>},
    {path: 'vip', element: <ProductS/>},
    {path: 'recharge', element: <Recharge/>},
    {path: 'withdraw', element: <Withdraw/>},
    {path: 'bankDetails', element: <Bank/>},
    {path: 'Profile', element: <Profile/>},
    {path: 'history', element: <History/>},
    {path: 'changePassword', element: <Change/>},
    ] }
  ])
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App