import React from 'react'
import Login from './Auth/Login'
import {RouterProvider, createHashRouter} from "react-router-dom";
import Signup from './Auth/Signup';

const App = () => {
  const router = createHashRouter([
    {
      path : "/",
      element: <Login/>
    },
    {
      path : "/Sign-up",
      element: <Signup/>
    }
  ])
  return (
    <>
            <RouterProvider router={router} />
    </>
  )
}

export default App