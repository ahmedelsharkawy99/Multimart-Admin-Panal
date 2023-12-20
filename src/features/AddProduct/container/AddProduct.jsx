import { useDispatch } from "react-redux";
import { Suspense, lazy, useRef, useState } from "react";

import useForm from "../../../shared/hooks/useForm";
import RequireAuth from "../../../routes/RequireAuth";
import { initialState } from "../shared/utils/initialState";
import { sendProduct } from "../../../shared/store/slices/productsSlice/productsActions";

import Spinner from "../../../shared/components/Spinner/Spinner";
import ProgressBar from "../../../shared/components/ProgressBar/ProgressBar";
import ProductsForm from "../../../shared/components/ProductForm/ProductsForm";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";

const Modal = lazy(() => import("../../../shared/components/Modal/Modal"));
const Preview = lazy(() =>
  import("../../../shared/components/Preview/Preview")
);

const AddProduct = RequireAuth(() => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState();

  const { formData, isLoading, handleChange, handleSubmit } =
    useForm(initialState);

  const { path, ...product } = formData;

  const handelOpenModal = () => {
    modalRef.current.open();
  };

  const addProductHandler = async () => {
    await dispatch(sendProduct(product, setProgress));
    setProgress(null);
  };

  return (
    <>
      <SectionContainer>
        <div className="col-lg-12">
          <h4 className="mb-5">Add Product</h4>
          {progress && <ProgressBar progress={progress} />}

          <ProductsForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit(addProductHandler)}
          >
            <div className="d-flex align-items-center gap-3">
              <button className="buy__btn" disabled={isLoading}>
                {isLoading ? (
                  <Spinner className="spinner-border-sm" />
                ) : (
                  "Add Prodcut"
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
          <Preview path={path} />
        </Modal>
      </Suspense>
    </>
  );
});

export default AddProduct;
