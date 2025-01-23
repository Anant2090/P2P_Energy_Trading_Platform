import React from 'react';

const Footer = () => {
  return (
    <footer
      className="bg-cover bg-center text-white py-8"
      style={{
        backgroundImage: "url('/images/footer.jpg')", // Corrected path to the image
      }}
    >
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-xl font-bold">Footer Title</h2>
        <p className="text-center text-sm mt-2">
          © 2025 P2P. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
