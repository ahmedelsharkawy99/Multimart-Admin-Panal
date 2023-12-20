import { useDispatch, useSelector } from "react-redux";
import { deliverOrder } from "../../../shared/store/slices/ordersSlice/OrdersActions";

const OrdersTableBody = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  const deliverOrderHandler = async (id) => {
    await dispatch(deliverOrder(id));
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

export default OrdersTableBody;
