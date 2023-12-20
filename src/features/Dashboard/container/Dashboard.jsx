import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import "../shared/styles/dashboard.css";
import RequireAuth from "../../../routes/RequireAuth";
import { options } from "../shared/utils/chartOptions";

import StatesCard from "../components/StatesCard";
import { useEffect } from "react";
import { fetchOrders } from "../../../shared/store/slices/ordersSlice/OrdersActions";
import Spinner from "../../../shared/components/Spinner/Spinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = RequireAuth(() => {
  const dispatch = useDispatch();
  const ordersSlice = useSelector((state) => state.orders);
  const users = useSelector((state) => state.users.usersStatus);
  const products = useSelector((state) => state.products.productsStatus);

  const { orders, ordersStatus } = ordersSlice;

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const data = {
    labels: orders
      .map((order) =>
        new Date(order.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      )
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime()),
    datasets: [
      {
        label: "Total Sales",
        data: orders.map((order) => order.orderDetails.totalAmount),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <StatesCard
            cardClass="revenue__box"
            cardTitle="Total Sales"
            cardNumber={`$${ordersStatus?.totalSales}`}
          />
          <StatesCard
            cardClass="order__box"
            cardTitle="Orders"
            cardNumber={ordersStatus?.count}
          />
          <StatesCard
            cardClass="product__box"
            cardTitle="Total Products"
            cardNumber={products}
          />
          <StatesCard
            cardClass="user__box"
            cardTitle="Total Users"
            cardNumber={users}
          />
        </div>
        <div className="row">
          {orders.length === 0 ? (
            <Spinner
              width="5rem"
              height="5rem"
              className="mt-5 d-flex mx-auto"
            />
          ) : (
            <Line options={options} data={data} className="w-100 h-100" />
          )}
        </div>
      </div>
    </section>
  );
});

export default Dashboard;
