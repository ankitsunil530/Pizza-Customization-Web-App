import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// helper to get token safely
const getToken = () =>
  JSON.parse(localStorage.getItem("userInfo"))?.token;

// ================= FETCH CART =================
export const fetchCart = createAsyncThunk(
  "cart/get",
  async (_, thunkAPI) => {
    try {
      const token = getToken();

      const res = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch cart");
    }
  }
);

// ================= ADD ITEM =================
export const addItemToCart = createAsyncThunk(
  "cart/add",
  async (item, thunkAPI) => {
    try {
      const token = getToken();

      const res = await api.post(
        "/cart",
        { item },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to add item");
    }
  }
);

// ================= REMOVE ITEM =================
export const removeItem = createAsyncThunk(
  "cart/remove",
  async (id, thunkAPI) => {
    try {
      const token = getToken();

      const res = await api.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to remove item");
    }
  }
);

// ================= CLEAR CART =================
export const clearCart = createAsyncThunk(
  "cart/clear",
  async (_, thunkAPI) => {
    try {
      const token = getToken();

      await api.delete("/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return { items: [] };
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to clear cart");
    }
  }
);

// ================= SLICE =================
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // fetch
      .addCase(fetchCart.pending, (s) => {
        s.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (s, a) => {
        s.isLoading = false;
        s.cart = a.payload;
      })
      .addCase(fetchCart.rejected, (s, a) => {
        s.isLoading = false;
        s.isError = true;
        s.message = a.payload;
      })

      // add
      .addCase(addItemToCart.fulfilled, (s, a) => {
        s.cart = a.payload;
      })

      // remove
      .addCase(removeItem.fulfilled, (s, a) => {
        s.cart = a.payload;
      })

      // clear
      .addCase(clearCart.fulfilled, (s) => {
        if (s.cart) s.cart.items = [];
      });
  },
});

export default cartSlice.reducer;
