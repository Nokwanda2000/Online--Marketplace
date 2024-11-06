import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';  
import { db } from '../firebase.config';  // Firebase Firestore setup (Assuming db is initialized)
import { clearCart } from '../Slices/CartSlice';  // Action to clear the cart

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = cartItems.reduce((total, item) => total + Number(item.price || 0), 0);
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [orderStatus, setOrderStatus] = useState(null);
  const [stripeClientSecret, setStripeClientSecret] = useState(null);
  
  const user = useSelector(state => state.auth.user);  

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const validateForm = () => {
    return (
      shippingInfo.name &&
      shippingInfo.address &&
      shippingInfo.city &&
      shippingInfo.zipCode &&
      paymentInfo.cardNumber &&
      paymentInfo.expiryDate &&
      paymentInfo.cvv
    );
  };

  const handleCheckout = async () => {
    if (!validateForm()) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Create Payment Intent with Stripe (Backend should handle this)
      const { data } = await axios.post('/api/payment_intent', { 
        amount: totalAmount * 100,  // Amount in cents
      });

      setStripeClientSecret(data.clientSecret);

      // Once we have the Stripe client secret, proceed to handle payment
      const stripe = window.Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
      const { error, paymentIntent } = await stripe.confirmCardPayment(stripeClientSecret, {
        payment_method: {
          card: {
            number: paymentInfo.cardNumber,
            exp_month: parseInt(paymentInfo.expiryDate.split('/')[0]),
            exp_year: parseInt(paymentInfo.expiryDate.split('/')[1]),
            cvc: paymentInfo.cvv,
          },
        },
      });

      if (error) {
        setOrderStatus('failed');
        alert("Payment failed: " + error.message);
      } else if (paymentIntent.status === 'succeeded') {
        // Payment successful, save order to Firestore
        await saveOrderToFirestore(paymentIntent);
        setOrderStatus('success');
        dispatch(clearCart());  // Clear the cart after successful order
        alert("Order placed successfully!");
      }

    } catch (error) {
      setOrderStatus('failed');
      alert("Error processing the payment: " + error.message);
    }
  };

  const saveOrderToFirestore = async (paymentIntent) => {
    try {
      await db.collection('orders').add({
        userId: user.id,
        shippingInfo,
        cartItems,
        totalAmount,
        paymentIntentId: paymentIntent.id,
        status: 'Processing',
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error saving order to Firestore:", error);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white text-gray-900 rounded-lg shadow-xl mt-16 max-w-4xl">
      <h1 className="text-3xl font-extrabold mb-8 text-center tracking-tight">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Shipping Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Shipping Information</h2>
          <form className="space-y-4">
            <input
              type="text"
              name="name"
              value={shippingInfo.name}
              onChange={handleShippingChange}
              placeholder="Full Name"
              className="w-full p-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleShippingChange}
              placeholder="Address"
              className="w-full p-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              name="city"
              value={shippingInfo.city}
              onChange={handleShippingChange}
              placeholder="City"
              className="w-full p-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              name="zipCode"
              value={shippingInfo.zipCode}
              onChange={handleShippingChange}
              placeholder="ZIP Code"
              className="w-full p-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </form>
        </div>

        {/* Payment Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Payment Information</h2>
          <form className="space-y-4">
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handlePaymentChange}
              placeholder="Card Number"
              className="w-full p-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handlePaymentChange}
              placeholder="Expiry Date (MM/YY)"
              className="w-full p-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handlePaymentChange}
              placeholder="CVV"
              className="w-full p-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </form>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h2>
        <div className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-inner">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between p-4 bg-white rounded-lg shadow-sm">
              <span className="text-gray-800">{item.title}</span>
              <span className="font-semibold text-gray-700">R{item.price}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg pt-6 border-t mt-6 text-gray-800">
            <span>Total Amount:</span>
            <span>R{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        className="mt-12 w-40 py-4 bg-gradient-to-r from-gray-500 to-black text-white text-lg font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105 focus:outline-none"
      >
        Place Order
      </button>
      
      {/* Order Status */}
      {orderStatus && (
        <div className={`mt-6 text-center text-lg font-semibold ${orderStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {orderStatus === 'success' ? 'Order placed successfully!' : 'Failed to place order. Try again.'}
        </div>
      )}
    </div>
  );
}
