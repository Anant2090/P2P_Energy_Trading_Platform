// Layout.js
import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './pages/Footer/Footer';

const Layout = () => {
  return (
    <div className="bg-custom-bg  bg-cover bg-center min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
