import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../Slices/AdditemsSlice'; 
import { addToCart } from '../Slices/CartSlice'; 
import { Link } from 'react-router-dom';
import { db } from '../firebase.config'; // Import your Firebase config
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods

export default function ShoppingList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [notification, setNotification] = useState('');

  // Fetch items from Firestore when the component mounts
  useEffect(() => {
    const fetchItemsFromFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'items')); // Fetch items from Firestore
        const fetchedItems = [];
        querySnapshot.forEach((doc) => {
          fetchedItems.push({ id: doc.id, ...doc.data() }); // Collect data and add doc ID
        });

        // Dispatch the fetched items to Redux
        dispatch(fetchItems(fetchedItems));
      } catch (error) {
        console.error('Error fetching items from Firestore:', error);
      }
    };

    fetchItemsFromFirestore();
  }, [dispatch]);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const itemsByCategory = filteredItems.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setNotification(`Added ${item.title} to cart`);

    setTimeout(() => {
      setNotification('');
    }, 3000);
    
    console.log(`Added ${item.title} to cart`);
  };

  const categories = Array.from(new Set(items.map(item => item.category)));

  return (
    <div className="container mx-auto p-6 text-gray-800">
      <h1 className="text-2xl mb-6 text-center font-bold">Shop with Us</h1>

      {loading && <p className="text-center">Loading items...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg">
          {notification}
        </div>
      )}

      {/* Search Input and Category Filter */}
      <div className="mb-4 flex flex-col sm:flex-row items-center justify-between">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 bg-gray-100 p-2 mb-4 w-full sm:w-64 rounded focus:outline-none focus:border-black"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 bg-gray-100 p-2 rounded focus:outline-none focus:border-black ml-0 sm:ml-4"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Categories and Items */}
      {Object.keys(itemsByCategory).length > 0 ? (
        Object.keys(itemsByCategory).map(category => (
          <div key={category} className="mb-8">
            <h2 className="text-3xl font-semibold mb-4 border-b border-gray-600 pb-2">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {itemsByCategory[category].map(item => (
                <div key={item.id} className="bg-gray-100 shadow-md rounded-lg p-4 flex flex-col justify-between transition-transform transform hover:scale-105">
                  <div>
                    <img src={item.image} alt={item.title} className="w-full rounded mb-4 h-48 object-cover" />
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-gray-600">Category: {item.category}</p>
                    <p className="text-gray-600 font-bold">Price: R{item.price}</p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-4 px-3 py-1 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        !loading && <p className="text-center">No items found matching your search.</p>
      )}
    </div>
  );
}
