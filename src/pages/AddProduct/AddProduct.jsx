import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Progress,
  Spinner,
} from "reactstrap";

import RequireAuth from "../../routers/RequireAuth";
import { sendProduct } from "../../redux/slices/productsSlice/productsActions";

import Preview from "../../components/Preview/Preview";
import CustomInput from "../../components/UI/Input/CustomInput";

const initialState = {
  title: "",
  shortDescription: "",
  description: "",
  price: "",
  inStock: "",
  category: "",
  image: null,
  path: null,
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const changeHandler = (e) => {
    if (e.target.id === "image")
      setFormData((prevState) => ({
        ...prevState,
        image: e.target.files[0] || null,
        path:
          (e.target.files[0] && URL.createObjectURL(e.target.files[0])) || null,
      }));
    else
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
  };

  const { path, ...product } = formData;

  const addProductHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(sendProduct(product, setProgress));
    setFormData(initialState);
    setIsLoading(false);
    setProgress(null);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="mb-5">Add Product</h4>
            <Form onSubmit={addProductHandler}>
              <CustomInput
                label="Product Name"
                input={{
                  type: "text",
                  placeholder: "Double Sofa",
                  id: "title",
                  value: formData.title,
                  onChange: changeHandler,
                  required: true,
                }}
              />

              <CustomInput
                label="Short Description"
                input={{
                  type: "text",
                  placeholder: "Lorem....",
                  id: "shortDescription",
                  value: formData.shortDescription,
                  onChange: changeHandler,
                  required: true,
                }}
              />

              <CustomInput
                label="Description"
                input={{
                  type: "text",
                  placeholder: "Lorem....",
                  id: "description",
                  value: formData.description,
                  onChange: changeHandler,
                  required: true,
                }}
              />

              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <CustomInput
                  className="w-30"
                  label="Price"
                  input={{
                    type: "text",
                    placeholder: "$100",
                    id: "price",
                    value: formData.price,
                    onChange: changeHandler,
                    required: true,
                  }}
                />

                <CustomInput
                  className="w-30"
                  label="Count In Stock"
                  input={{
                    type: "text",
                    placeholder: "100",
                    id: "inStock",
                    value: formData.inStock,
                    onChange: changeHandler,
                    required: true,
                  }}
                />

                <FormGroup className="form__group w-30">
                  <label className="mb-2" htmlFor="category">
                    Category
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={changeHandler}
                    required
                  >
                    <option value="">Choose Product Category</option>
                    <option value="chair">Chair</option>
                    <option value="sofa">Sofa</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </FormGroup>
              </div>

              <div>
                <CustomInput
                  label="Prodcut Image"
                  input={{
                    type: "file",
                    id: "image",
                    onChange: changeHandler,
                    required: true,
                  }}
                />
              </div>

              <div className="preview__container p-2 rounded">
                <h5 className="mb-3 px-3 pt-3">Preview The uploaded Image</h5>
                <div className="d-flex align-items-center justify-content-center">
                  <Preview path={path} />
                </div>
              </div>

              {isLoading && (
                <FormGroup className="form__group mt-3">
                  <Progress animated value={progress}>
                    {progress}%
                  </Progress>
                </FormGroup>
              )}

              <button className="buy__btn" disabled={isLoading}>
                {isLoading ? (
                  <Spinner size="sm">Loading...</Spinner>
                ) : (
                  "Add Prodcut"
                )}
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RequireAuth(AddProduct);
