import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../Slices/AdditemsSlice'; // Update with the correct path

export default function ShoppingList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchItems()); // Fetch items when the component mounts
  }, [dispatch]);

  // Filter items based on the search query
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group items by category
  const itemsByCategory = filteredItems.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-6 bg-white text-gray-800 rounded-lg shadow-lg mt-16"> {/* Changed bg-gray-800 to bg-white and text-white to text-gray-800 */}
      <h1 className="text-4xl font-bold mb-6 text-center">Shopping List</h1>

      {loading && <p className="text-center">Loading items...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 bg-gray-100 p-2 mb-4 w-full rounded focus:outline-none focus:border-indigo-500" // Changed bg-gray-900 to bg-gray-100 and border-gray-700 to border-gray-300
        />
      </div>

      {/* Categories and Items */}
      {Object.keys(itemsByCategory).length > 0 ? (
        Object.keys(itemsByCategory).map(category => (
          <div key={category} className="mb-8">
            <h2 className="text-3xl font-semibold mb-4 border-b border-gray-400 pb-2">{category}</h2> {/* Changed border-gray-600 to border-gray-400 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {itemsByCategory[category].map(item => (
                <div key={item.id} className="bg-gray-100 shadow-md rounded-lg p-4 flex flex-col justify-between transition-transform transform hover:scale-105"> {/* Changed bg-gray-800 to bg-gray-100 */}
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-gray-600">Category: {item.category}</p> {/* Changed text-gray-400 to text-gray-600 */}
                    <p className="text-gray-600">Price: R{item.price}</p> {/* Changed text-gray-400 to text-gray-600 */}
                    {item.image && <img src={item.image} alt={item.title} className="mt-2 max-w-full rounded" />}
                  </div>
                  <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    View Details
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
