import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPizzas } from "./pizzaService";


export const getPizzas = createAsyncThunk("pizza/getAll", async () => {
  return await fetchPizzas();
});

const pizzaSlice = createSlice({
  name: "pizza",
  initialState: {
    pizzas: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPizzas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPizzas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pizzas = action.payload;
      });
  },
});

export default pizzaSlice.reducer;
