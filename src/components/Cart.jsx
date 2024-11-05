import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../Slices/CartSlice'; // Update with the correct path

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // Assume cart items are stored here
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId)); // Dispatch action to remove item from cart
  };

  return (
    <div className="container mx-auto p-6 bg-white text-gray-800 rounded-lg shadow-lg mt-16">
      <h1 className="text-4xl font-bold mb-6 text-center">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is currently empty.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-gray-100 shadow-md rounded-lg p-4 flex flex-col justify-between transition-transform transform hover:scale-105">
                <img src={item.image} alt={item.title} className="w-full rounded mb-4" />
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">Price: R{item.price}</p>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="mt-4 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove from Cart
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-between border-t border-gray-300 pt-4">
            <h2 className="text-2xl font-bold">Total Amount: R{totalAmount.toFixed(2)}</h2>
            <button className="px-5 py-2 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
