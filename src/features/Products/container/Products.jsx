import { Link } from "react-router-dom";

import RequireAuth from "../../../routes/RequireAuth";
import { PRODUCTS_TITLES } from "../shared/utils/productsTitle";

import ProductsTableBody from "../components/ProductsTableBody";
import CustomTable from "../../../shared/components/CustomTable/CustomTable";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";

const Products = RequireAuth(() => {
  return (
    <SectionContainer>
      <div className="col-lg-12">
        <h4 className="fw-bold">Products</h4>
      </div>
      <div className="col-lg-12 mb-5 text-end">
        <Link to="/add-product" className="buy__btn m-0">
          Add Product
        </Link>
      </div>
      <div className="col-lg-12">
        <CustomTable titles={PRODUCTS_TITLES}>
          <ProductsTableBody />
        </CustomTable>
      </div>
    </SectionContainer>
  );
});

export default Products;
