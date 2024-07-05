import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from "./Footer"
// import Chatbot from './Pages/Chatbot'


const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    {/* <Chatbot/> */}
    <Footer/>
    </>
  )
}

export default Layout