import { toast } from "react-toastify";

import { productsAcrions } from "./productsSlice";
import {
  deleteData,
  getCollectionData,
  setProduct,
} from "../../../handlers/firestore";
import { uploadImage } from "../../../handlers/storage";

export const fetchProductsItems = () => {
  return async (dispatch) => {
    try {
      const products = await getCollectionData("products");
      dispatch(productsAcrions.replaceProducts(products));
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const sendProduct = (product, setProgress) => {
  return async (dispatch) => {
    try {
      const downloadUrl = await uploadImage(
        `productsImage/${Date.now() + product.title}`,
        product.image,
        setProgress
      );

      await setProduct({ ...product, image: downloadUrl });

      dispatch(fetchProductsItems());

      toast.success("Product added");
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      await deleteData("products", id);

      dispatch(fetchProductsItems());

      toast.success("Product Delete Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
};
