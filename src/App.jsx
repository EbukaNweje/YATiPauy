import React from 'react'
import {RouterProvider, createHashRouter} from "react-router-dom";
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Layout from './pages/Layout';
import Home from './pages/Home'

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
    {path: '', element: <Home/>}
    ] }
  ])
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App