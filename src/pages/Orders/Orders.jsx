import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder } from "../../redux/slices/ordersSlice/OrdersActions";
import CustomTable from "../../components/CustomTable/CustomTable";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import RequireAuth from "../../routers/RequireAuth";

const titles = ["Id", "Total", "Paid", "Delivered", "Action"];
const Orders = () => {
  const [loading, setLoading] = useState(false);
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Orders</h4>
          </Col>

          <Col lg="12" className="pt-5">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <CustomTable titles={titles}>
                <CustomTableBody setLoading={setLoading} />
              </CustomTable>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const CustomTableBody = ({ setLoading }) => {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const deliverOrderHandler = async (id) => {
    setLoading(true);
    await dispatch(deliverOrder(id));
    setLoading(false);
  };

  return (
    <tbody>
      {orders.map((order) => (
        <tr key={order.id}>
          <td>{order.id.slice(0, 7)}</td>
          <td>{order.orderDetails.totalAmount}</td>
          <td>{order.isPaid ? `Paid At: ${order.paidAt}` : "Not Paid"}</td>
          <td>
            {order.isDelivered
              ? `Delivered At: ${order.deliveredAt}`
              : "Not Delivered"}
          </td>
          <td>
            <button
              className={`buy__btn m-0 ${
                order.isDelivered ? "btn-disabled " : ""
              }`}
              onClick={deliverOrderHandler.bind(null, order.id)}
              disabled={order.isDelivered}
            >
              Deliver
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default RequireAuth(Orders);
