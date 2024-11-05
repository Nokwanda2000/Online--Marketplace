import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false); // State to manage the mobile menu visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-screen bg-black shadow-lg z-50">
      <div className="navbar container mx-auto p-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800">MyMarketplace</Link>
        </div>
        
        {/* Navigation Links (for larger screens) */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-blue-600">Home</Link>
          <Link to="/Shoppinglistpage" className="text-white hover:text-blue-600">Shop</Link>
          <Link to="#about" className="text-white hover:text-blue-600">About</Link>
          <Link to="/Loginpage" className="text-white hover:text-blue-600">Login</Link>
        </div>
        
     
      

      

        {/* Hamburger Menu for Small Screens */}
        <div className="dropdown dropdown-end md:hidden">
          <button onClick={toggleMenu} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          {isOpen && (
            <ul className="dropdown-content bg-white rounded-box shadow-lg mt-3 w-52 p-2">
              <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/Shoppinglistpage" onClick={toggleMenu}>Shop</Link></li>
              <li><Link to="#about" onClick={toggleMenu}>About</Link></li>
              <li><Link to="/Footer" onClick={toggleMenu}>Contact</Link></li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
