import { useDispatch, useSelector } from "react-redux";

import { deleteProduct } from "../../../shared/store/slices/productsSlice/productsActions";
import Image from "../../../shared/components/Image/Image";
import { useNavigate } from "react-router-dom";

const ProductsTableBody = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.products.products);
  const deleteProductHandler = async (id) => {
    await dispatch(deleteProduct(id));
  };

  return (
    <tbody>
      {data.map((product) => (
        <tr key={product.id}>
          <td>
            <Image src={product.image} alt={product.title} />
          </td>
          <td>{product.title}</td>
          <td>{product.category}</td>
          <td>${product.price}</td>
          <td className="d-flex flex-column gap-2">
            <button
              className="btn btn-danger"
              onClick={deleteProductHandler.bind(null, product.id)}
            >
              Delete
            </button>
            <button
              className="buy__btn mt-0"
              onClick={() => navigate(`/prducts/${product.id}/edit`)}
            >
              Edit
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ProductsTableBody;
