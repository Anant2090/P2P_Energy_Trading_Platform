import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './pages/Footer/Footer';

const Layout = () => {
  return (
    <div className="relative w-full min-h-screen">
    <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
      <source src="/Videos/back.mp4" type="video/mp4" />
    </video>
    <div className="relative z-10">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>
  
  );
};

export default Layout;
