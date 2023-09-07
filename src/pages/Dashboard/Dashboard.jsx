import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
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

import "./dashboard.css";
import RequireAuth from "../../routers/RequireAuth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Total Sales",
    },
  },
};

const Dashboard = () => {
  const users = useSelector((state) => state.users.users);
  const products = useSelector((state) => state.products.products);
  const ordersSlice = useSelector((state) => state.orders);
  const { orders, totalSales } = ordersSlice;

  const data = {
    labels: orders
      .map((order) => order.createdAt)
      .sort((a, b) => new Date(a) - new Date(b)),
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
      <Container>
        <Row>
          <Col lg="3" className="mb-3">
            <div className="revenue__box">
              <h5>Total Sales</h5>
              <span>${totalSales}</span>
            </div>
          </Col>
          <Col lg="3" className="mb-3">
            <div className="order__box">
              <h5>Orders</h5>
              <span>{orders.length}</span>
            </div>
          </Col>
          <Col lg="3" className="mb-3">
            <div className="product__box">
              <h5>Total Products</h5>
              <span>{products.length}</span>
            </div>
          </Col>
          <Col lg="3" className="mb-3">
            <div className="user__box">
              <h5>Total Users</h5>
              <span>{users.length}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <Line options={options} data={data} className="w-100 h-100" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RequireAuth(Dashboard);
