import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from './slices/auth'
import { productsReducer } from './slices/forms'

const store = configureStore({
    reducer: {
        auth: authReducer,
        prod: productsReducer
    }
});

export default store;

// import { postsReducer } from './slices/products'