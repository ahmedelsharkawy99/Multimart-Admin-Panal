import { toast } from "react-toastify";

import { productsAcrions } from "./productsSlice";
import { compressImages } from "../../../utils/helpers";
import {
  deleteData,
  getCollectionData,
  setProduct,
  updateProductDb,
} from "../../../services/handlers/firestore";
import { uploadImage } from "../../../services/handlers/storage";
import SessionStorageService from "../../../storage/sessionStorage";

export const fetchProductsItems = () => {
  return async (dispatch) => {
    try {
      const products = await getCollectionData("products");
      dispatch(productsAcrions.replaceProducts(products));
      return products;
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const sendProduct = (product, setProgress) => {
  return async (dispatch) => {
    const storedProducts =
      SessionStorageService.getStoredData("multimart_products");
    try {
      const compressedImage = await compressImages(
        product.image,
        546,
        364,
        0.8
      );
      const downloadUrl = await uploadImage(
        `images/products/${product.title}/${
          Date.now().toLocaleString() + product.title
        }`,
        compressedImage,
        setProgress
      );

      const newProduct = await setProduct({ ...product, image: downloadUrl });

      dispatch(productsAcrions.addProduct(newProduct));
      SessionStorageService.saveData("multimart_products", [
        ...storedProducts,
        newProduct,
      ]);

      toast.success("Product added");
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const updateProduct = (product, setProgress) => {
  return async (dispatch) => {
    const storedProducts =
      SessionStorageService.getStoredData("multimart_products");

    const existingProductIndex = storedProducts.findIndex(
      (p) => p.id === product.id
    );

    let upadetedProperties;

    try {
      if ("image" in product) {
        const compressedImage = await compressImages(
          product.image,
          546,
          364,
          0.8
        );

        const downloadUrl = await uploadImage(
          `images/products/${product.title}/${
            Date.now().toLocaleString() + product.title
          }`,
          compressedImage,
          setProgress
        );

        upadetedProperties = {
          ...product,
          image: downloadUrl,
        };

        await updateProductDb(product.id, upadetedProperties);

        storedProducts[existingProductIndex] = {
          ...storedProducts[existingProductIndex],
          ...upadetedProperties,
        };
      } else {
        upadetedProperties = {
          ...product,
        };
        await updateProductDb(product.id, upadetedProperties);

        storedProducts[existingProductIndex] = {
          ...storedProducts[existingProductIndex],
          ...upadetedProperties,
        };
      }

      SessionStorageService.saveData("multimart_products", [...storedProducts]);

      dispatch(productsAcrions.updateProduct(upadetedProperties));

      toast.success("Product Updated Successfully");
      return product;
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const storedProducts =
        SessionStorageService.getStoredData("multimart_products");

      const newProducts = storedProducts.filter((product) => product.id !== id);

      await deleteData("products", id);

      dispatch(productsAcrions.replaceProducts(newProducts));

      SessionStorageService.saveData("multimart_products", newProducts);

      toast.success("Product Delete Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
};
