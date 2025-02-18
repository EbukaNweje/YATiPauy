import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'
import './pageCss/Layout.css'

const Layout = () => {
  return (
    <div className='Layout'>
      <header><Header/></header>
      <main><Outlet/></main>
      <footer><Footer/></footer>
    </div>
  )
}

export default Layout