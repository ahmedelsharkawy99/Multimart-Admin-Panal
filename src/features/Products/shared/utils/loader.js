import { json, redirect } from "react-router-dom";

import store from "../../../../shared/store/store";
import SessionStorageService from "../../../../shared/storage/sessionStorage";
import { productsAcrions } from "../../../../shared/store/slices/productsSlice/productsSlice";
import { fetchProductsItems } from "../../../../shared/store/slices/productsSlice/productsActions";

export const productsLoader = async () => {
  try {
    const currentUser = SessionStorageService.getStoredData("multimart_admin");

    if (!currentUser) {
      return redirect("/login");
    }

    const storedProducts =
      SessionStorageService.getStoredData("multimart_products");

    if (!storedProducts) {
      const products = await store.dispatch(fetchProductsItems());
      SessionStorageService.saveData("multimart_products", products);
      return products;
    }

    store.dispatch(productsAcrions.replaceProducts(storedProducts));

    return storedProducts;
  } catch (error) {
    throw json(
      { message: "Could not fetch products data." },
      {
        status: 500,
      }
    );
  }
};
