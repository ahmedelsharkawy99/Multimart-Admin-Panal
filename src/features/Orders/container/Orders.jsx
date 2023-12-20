import RequireAuth from "../../../routes/RequireAuth";
import { ORDER_TITLES } from "../shared/utils/tableTitles";

import OrdersTableBody from "../components/OrdersTableBody";
import CustomTable from "../../../shared/components/CustomTable/CustomTable";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";

const Orders = RequireAuth(() => {
  return (
    <SectionContainer>
      <div className="col-lg-12">
        <h4 className="fw-bold">Orders</h4>
      </div>

      <div className="col-lg-12 pt-5">
        <CustomTable titles={ORDER_TITLES}>
          <OrdersTableBody />
        </CustomTable>
      </div>
    </SectionContainer>
  );
});

export default Orders;
