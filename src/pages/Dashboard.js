import "../styles/dashboard.css";
import React from "react";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <section className="stats">
        <div className="total-sales">
          <h4>Total Sales</h4>

          <p>R100 000.52</p>
        </div>

        <div className="total-orders">
          <h4>Total Orders</h4>

          <p>436</p>
        </div>

        <div className="total-products">
          <h4>Total Products</h4>
          <p>259</p>
        </div>

        <div className="sales-statistics">Bar Graph</div>

        <div className="visitors-statistics">stats here</div>
      </section>

      <section className="latest-orders">
        <h3>Latest Orders</h3>

        <ul>
          <li>
            <p>2023</p>

            <div className="order-name-email">
              <p>Seroba Masola</p>

              <p>seroba@gmail.com </p>
            </div>

            <p>R400</p>

            <p className="delivered">Delivered</p>

            <p>19.02.2020</p>

            <p>Menu</p>
          </li>

          <li>
            <p>2023</p>

            <div className="order-name-email">
              <p>Seroba Masola</p>

              <p>seroba@gmail.com </p>
            </div>

            <p>R200</p>

            <p className="delivered">Delivered</p>

            <p>19.02.2020</p>

            <p>menu</p>
          </li>

          <li>
            <p>2023</p>

            <div className="order-name-email">
              <p>Seroba Masola</p>

              <p>seroba@gmail.com </p>
            </div>

            <p>R150</p>

            <p className="cancelled">Cancelled</p>

            <p>19.02.2020</p>
            <p>menu</p>
          </li>

          <li>
            <p>2023</p>

            <div className="order-name-email">
              <p>Seroba Masola</p>

              <p>seroba@gmail.com </p>
            </div>

            <p>R700</p>

            <p className="pending">Pending</p>

            <p>19.02.2020</p>
            <p>menu</p>
          </li>

          <li>
            <p>2023</p>

            <div className="order-name-email">
              <p>Seroba Masola</p>

              <p>seroba@gmail.com </p>
            </div>

            <p>R700</p>

            <p className="delivered">Delivered</p>

            <p>19.02.2020</p>
            <p>menu</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
