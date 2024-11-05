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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 md:p-16 text-center pt-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Discover the Best Deals on Quality Products</h1>
        <p className="text-lg md:text-xl mb-6">Join our marketplace and start shopping today!</p>
        <button className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
          Start Shopping
        </button>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Category Card */}
            {['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Health', 'Toys', 'Books', 'Automotive'].map((category, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden relative group">
                <div
                  className="w-full h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${categoryImages[category]})` }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-xl font-semibold text-white">{category}</h3>
                </div>
                <div className="p-4">
                  <Link to={`/category/${category.toLowerCase()}`}>
                    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg">
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
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-8">About Us</h2>
          <p className="text-lg md:text-xl mb-6">
            We are dedicated to providing the best products and deals to our customers. Our marketplace
            is designed to offer quality products at competitive prices.
          </p>
          <Link to="/Shoppinglistpage">
            <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg">
              Learn More
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
