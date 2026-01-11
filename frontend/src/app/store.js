import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import pizzaReducer from "../features/pizza/pizzaSlice";
import cartReducer from "../features/cart/cartSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    pizza: pizzaReducer,
    cart: cartReducer,
  },
});
export default store;