import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 p-10 w-screen bottom-0 ">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Services Section */}
        <div>
          <h6 className="text-white text-lg font-semibold mb-4">Services</h6>
          <ul>
            <li>
              <a href="#" className="block hover:text-white transition-colors duration-200">
                Marketing
              </a>
            </li>
            <li>
              <a href="#" className="block hover:text-white transition-colors duration-200">
                Advertisement
              </a>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h6 className="text-white text-lg font-semibold mb-4">Company</h6>
          <ul>
            <li>
              <a href="#" className="block hover:text-white transition-colors duration-200">
                About us
              </a>
            </li>
            <Link to='Policiespage'>
              <li>
                <a href="#" className="block hover:text-white transition-colors duration-200">
                  Payment & cancellation policies
                </a>
              </li>
            </Link>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h6 className="text-white text-lg font-semibold mb-4">Follow Us</h6>
          <div className="flex space-x-4">
            <a href="#" aria-label="Twitter" className="hover:text-white transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775A4.948 4.948 0 0 0 23.337 3.3a9.869 9.869 0 0 1-3.127 1.195 4.924 4.924 0 0 0-8.388 4.49A13.975 13.975 0 0 1 1.671 2.897a4.926 4.926 0 0 0 1.523 6.574 4.9 4.9 0 0 1-2.229-.616v.062a4.927 4.927 0 0 0 3.947 4.83 4.904 4.904 0 0 1-2.224.084 4.927 4.927 0 0 0 4.6 3.419 9.866 9.866 0 0 1-6.102 2.102c-.398 0-.79-.023-1.177-.069A13.933 13.933 0 0 0 7.548 24c9.14 0 14.307-7.722 13.995-14.648a9.94 9.94 0 0 0 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-white transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.49 3.45 0 5.804 0 12c0 6.185.49 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-white transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642l.358-4H14V5c0-.955.192-1.333 1.115-1.333H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h6 className="text-white text-lg font-semibold mb-4">Contact Us</h6>
          <p className="mb-2">Email: LuxuryStays@gmail.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-white">
        © 2024 Luxury Stays.com. All rights reserved.
      </div>
    </footer>
  );
}
