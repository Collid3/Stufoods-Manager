import "../styles/order.css";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";
import { apiWithCred } from "../api/api";

const Orders = () => {
  const { orders, me } = useContext(DataContext);

  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [category, setCategory] = useState("active");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category === "all") {
      return setFilteredOrders(orders);
    }

    setFilteredOrders(
      orders.filter(
        (order) => order.status.toLowerCase() === category.toLowerCase()
      )
    );
  }, [category, orders]);

  const collectOrder = async (orderId) => {
    if (!orderId) return;
    setLoading(true);
    try {
      const response = await apiWithCred(me.accessToken).put("/order/collect", {
        orderId,
      });

      console.log(response.data);

      setFilteredOrders((prev) => {
        return prev.map((order) =>
          order._id === orderId ? response.data.updatedOrder : order
        );
      });
      return setLoading(false);
    } catch (err) {
      console.log(err);
      return setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!orderId) return;
    setLoading(true);
    try {
      const response = await apiWithCred(me.accessToken).put("/order/cancel", {
        orderId,
      });

      setFilteredOrders((prev) => {
        return prev.map((order) =>
          order._id === orderId ? response.data.updatedOrder : order
        );
      });
      return setLoading(false);
    } catch (err) {
      console.log(err);
      return setLoading(false);
    }
  };

  if (!orders) return;

  return (
    <div className="order-container">
      <h2>Orders</h2>

      {loading && <p>Loading...</p>}

      <section>
        <aside>
          <h3>Filter Orders</h3>

          <nav>
            <ul>
              <li
                className={`${category === "all" ? "selected" : undefined}`}
                onClick={() => setCategory("all")}
              >
                All
              </li>

              <li
                className={`${category === "pending" ? "selected" : undefined}`}
                onClick={() => setCategory("pending")}
              >
                Active
              </li>

              <li
                className={`${
                  category === "collected" ? "selected" : undefined
                }`}
                onClick={() => setCategory("collected")}
              >
                Collected
              </li>

              <li
                className={`${category === "failed" ? "selected" : undefined}`}
                onClick={() => setCategory("failed")}
              >
                Failed
              </li>
            </ul>
          </nav>
        </aside>

        <table>
          <thead>
            <tr>
              <th>Order no</th>
              <th>Price</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Change Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.orderNo}>
                <td>{order.orderNo}</td>

                <td>R{order.totalPrice.toFixed(2)}</td>

                <td>{`${new Date(order.createdAt).getFullYear()}-${new Date(
                  order.createdAt
                )
                  .getMonth()
                  .toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}-${new Date(order.createdAt)
                  .getDay()
                  .toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}`}</td>

                <td>{order.payment}</td>

                <td>{order.status}</td>

                <td className="change-status-buttons">
                  <button onClick={() => collectOrder(order._id)}>
                    Collect
                  </button>
                  <button onClick={() => cancelOrder(order._id)}>Cancel</button>
                </td>

                <td>
                  <Link to={`/order/${order._id}`}>View Detals</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Orders;
