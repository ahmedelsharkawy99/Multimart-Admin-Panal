import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import RequireAuth from "../../routers/RequireAuth";
import { deleteProduct } from "../../redux/slices/productsSlice/productsActions";

import { Col, Container, Row } from "reactstrap";
import CustomTable from "../../components/CustomTable/CustomTable";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const titles = ["Image", "Title", "Category", "Price", "Actions"];
const AllProducts = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5 text-end">
            <Link to="/add-product" className="buy__btn m-0">
              Add Product
            </Link>
          </Col>
          <Col lg="12">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <CustomTable titles={titles}>
                <CustomTableBody setIsLoading={setIsLoading} />
              </CustomTable>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const CustomTableBody = ({ setIsLoading }) => {
  const data = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const deleteProductHandler = async (id) => {
    setIsLoading(true);
    await dispatch(deleteProduct(id));
    setIsLoading(false);
  };
  return (
    <tbody>
      {data.map((product) => (
        <tr key={product.id}>
          <td>
            <img src={product.image} alt={product.title} loading="lazy" />
          </td>
          <td>{product.title}</td>
          <td>{product.category}</td>
          <td>${product.price}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={deleteProductHandler.bind(null, product.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default RequireAuth(AllProducts);
