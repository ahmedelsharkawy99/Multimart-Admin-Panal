import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, lazy, useRef, useState } from "react";

import useForm from "../../../shared/hooks/useForm";
import RequireAuth from "../../../routes/RequireAuth";
import { compareObj } from "../../../shared/utils/compareObj";
import { updateProduct } from "../../../shared/store/slices/productsSlice/productsActions";

import Spinner from "../../../shared/components/Spinner/Spinner";
import ProductsForm from "../../../shared/components/ProductForm/ProductsForm";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";

const Modal = lazy(() => import("../../../shared/components/Modal/Modal"));
const ProgressBar = lazy(() =>
  import("../../../shared/components/ProgressBar/ProgressBar")
);

const Preview = lazy(() =>
  import("../../../shared/components/Preview/Preview")
);

const EditProduct = RequireAuth(() => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [progress, setProgress] = useState();
  const product = useSelector(({ products }) => products.product);
  const { formData, isLoading, handleChange, handleSubmit } = useForm(product);

  const { path, ...updatedProduct } = formData;

  const handelOpenModal = () => {
    modalRef.current.open();
  };

  const editProductHandler = async () => {
    const isProductNotChanged = compareObj(updatedProduct, product);
    if (isProductNotChanged.status) {
      toast.error("Product not changed");
      return;
    }

    await dispatch(
      updateProduct(
        { ...isProductNotChanged.result, id: updatedProduct.id },
        setProgress
      )
    );
    setProgress(null);

    navigate(`/products`);
  };

  return (
    <>
      <SectionContainer>
        <div className="col-lg-12">
          <h4 className="mb-5">Edit Product</h4>
          <Suspense>{progress && <ProgressBar progress={progress} />}</Suspense>
          <ProductsForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit(editProductHandler)}
          >
            <div className="d-flex align-items-center gap-3">
              <button className="buy__btn" disabled={isLoading}>
                {isLoading ? (
                  <Spinner className="spinner-border-sm" />
                ) : (
                  "Edit Prodcut"
                )}
              </button>
              <button
                className="buy__btn"
                type="button"
                onClick={handelOpenModal}
              >
                Show Image Preview
              </button>
            </div>
          </ProductsForm>
        </div>
      </SectionContainer>

      <Suspense>
        <Modal ref={modalRef}>
          <Preview path={path || updatedProduct.image} />
        </Modal>
      </Suspense>
    </>
  );
});

export default EditProduct;
