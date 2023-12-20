import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: null,
  productsStatus: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    replaceProducts: (state, action) => {
      state.products = action.payload;
    },

    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    getProduct: (state, action) => {
      state.product = state.products.find(
        (product) => product.id === action.payload
      );
    },

    updateProduct: (state, action) => {
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      let existingProduct = state.products[existingProductIndex];

      const updatedProduct = { ...existingProduct, ...action.payload };

      existingProduct = updatedProduct;
    },

    setProductsStatus: (state, action) => {
      state.productsStatus = action.payload;
    },
  },
});

export const productsAcrions = productsSlice.actions;

export default productsSlice.reducer;
