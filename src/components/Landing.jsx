import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  const categoryImages = {
    Electronics: 'https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    Fashion: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Home & Garden': 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600',
    Sports: 'https://images.pexels.com/photos/1089144/pexels-photo-1089144.jpeg?auto=compress&cs=tinysrgb&w=600',
    Health: 'https://images.pexels.com/photos/208518/pexels-photo-208518.jpeg?auto=compress&cs=tinysrgb&w=600',
    Toys: 'https://images.pexels.com/photos/1620675/pexels-photo-1620675.jpeg?auto=compress&cs=tinysrgb&w=600',
    Books: 'https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg?auto=compress&cs=tinysrgb&w=600',
    Automotive: 'https://images.pexels.com/photos/159293/car-engine-motor-clean-customized-159293.jpeg?auto=compress&cs=tinysrgb&w=600',
  };

  return (
    <div className="overflow-hidden font-inter">
      {/* Hero Section with Background Image */}
      <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1239298/pexels-photo-1239298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-5xl font-semibold mb-4 text-center">Discover the Best Deals on Quality Products</h1>
          <p className="text-xl mb-6 text-center">Join our marketplace and start shopping today!</p>
          <Link to="/Shop">
            <button className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
              Start Shopping
            </button>
          </Link>
        </div>
      </section>

      {/* Categories Section with Clean Layout */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Health', 'Toys', 'Books', 'Automotive'].map((category, index) => (
              <div key={index} className="group relative bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                <div
                  className="w-full h-60 bg-cover bg-center"
                  style={{ backgroundImage: `url(${categoryImages[category]})` }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="p-4 relative z-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">{category}</h3>
                  <Link to="/Shoppinglistpage">
                    <button className="mt-4 px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 transform group-hover:scale-110">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8">About Us</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            We are dedicated to providing the best products and deals to our customers. Our marketplace is designed to offer quality products at competitive prices.
          </p>
          
        </div>
      </section>
    </div>
  );
}
