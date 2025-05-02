import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'

const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scroll(0, 0)
    }, [pathname])
    
  return <Outlet />
}

export default ScrollToTop;