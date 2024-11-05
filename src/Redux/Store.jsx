// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import registrationReducer from '../Slices/RegisterSlice';
import authReducer from '../Slices/authSlice';
import itemsReducer from '../Slices/AdditemsSlice';
import cartReducer from '../Slices/CartSlice';

const persistConfig = {
    key: 'root',
    storage,
};

// Combine your reducers into one
const rootReducer = combineReducers({
    registration: registrationReducer,
    auth: authReducer,
    items: itemsReducer,
    cart: cartReducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Set up the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // To ignore non-serializable checks for redux-persist actions
        }),
});

export const persistor = persistStore(store);
export default store;
