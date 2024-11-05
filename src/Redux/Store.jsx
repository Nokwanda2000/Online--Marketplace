import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from '../Slices/RegisterSlice';
import authReducer from '../Slices/authSlice';
import itemsReducer from '../Slices/AdditemsSlice';

const store = configureStore({
    reducer: {
        registration: registrationReducer,
        auth: authReducer,
        items: itemsReducer,
    },
});

export default store;
