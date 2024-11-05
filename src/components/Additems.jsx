import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../Slices/AdditemsSlice'; 

export default function AddItems() {
  const [item, setItem] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  const dispatch = useDispatch(); // Initialize Redux dispatch

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };
console.log(item);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItem({ ...item, image: reader.result }); // Store base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the action to add the item to Redux and Firestore
    dispatch(addItem(item)); // Make sure to implement this action in your Redux slice
    setItem({
      title: '',
      description: '',
      price: '',
      category: '',
      image: ''
    }); // Reset form
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-4 rounded-lg shadow-md mt-12">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Item for Sale</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label className="block text-gray-600 font-medium mb-1">Item Title</label>
          <input
            type="text"
            name="title"
            value={item.title}
            onChange={handleInputChange}
            placeholder="Enter item title"
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="block text-gray-600 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={item.description}
            onChange={handleInputChange}
            placeholder="Describe the item"
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            rows="3"
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="block text-gray-600 font-medium mb-1">Price (R)</label>
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={handleInputChange}
            placeholder="Enter price"
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="block text-gray-600 font-medium mb-1">Category</label>
          <select
            name="category"
            value={item.category}
            onChange={handleInputChange}
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          >
            <option value="">Select category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
            <option value="books">Books</option>
            <option value="toys">Toys</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label className="block text-gray-600 font-medium mb-1">Upload Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-1 px-4 rounded hover:bg-indigo-700 transition-colors"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
