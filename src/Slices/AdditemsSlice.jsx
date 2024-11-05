import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs,  addDoc  } from 'firebase/firestore'; // Import necessary Firestore methods
import { db } from '../firebase.config'; 

// Async thunk to fetch items from Firestore
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const itemsCollection = collection(db, 'items'); // Get a reference to the 'items' collection
  const snapshot = await getDocs(itemsCollection); // Fetch the documents
  const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map through documents
  return items; // Return the fetched items
});

// Async thunk to add an item to Firestore
export const addItem = createAsyncThunk('items/addItem', async (item) => {
    const docRef = await addDoc(collection(db, 'items'), item); // Use addDoc to add item
    return { id: docRef.id, ...item }; // Return the new item with its Firestore ID
  });
// Create the slice
const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true; // Set loading to true when fetching
        state.error = null; // Reset error
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload; // Store the fetched items in state
        state.loading = false; // Set loading to false after fetching
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        state.error = action.error.message; // Set error message
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload); // Add the new item to the state
      });
  },
});

// Export the reducer to be used in the store
export default itemsSlice.reducer;
