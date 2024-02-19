import "./styles/App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Foods from "./pages/Food/Foods";
import EditProduct from "./pages/Food/EditFood";
import Orders from "./pages/Orders";
import Statistics from "./pages/Statistics";
import Reviews from "./pages/Reviews";
import Transactions from "./pages/Transactions";
import CreateFood from "./pages/Food/CreateFood";
import Stores from "./pages/store/Stores";
import CreateStore from "./pages/store/CreateStore";
import EditStore from "./pages/store/EditStore";
import Profile from "./pages/Profile";
import EmptyStores from "./pages/EmptyStores";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  const { me, loading, stores } = useContext(DataContext);

  if (loading) {
    return (
      <h1
        style={{
          height: "100vh",
          display: "grid",
          placeContent: "center",
          fontSize: "1.6rem",
          fontFamily: "Roboto",
        }}
      >
        Loading...
      </h1>
    );
  }

  return (
    <div className="App">
      <Header />

      {!me ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <section>
          <Sidebar />

          <main>
            <Routes>
              {stores && stores.length > 0 ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/foods" element={<Foods />} />
                  <Route path="/foods/:productId" element={<EditProduct />} />
                  <Route path="/foods/create" element={<CreateFood />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/statistics" element={<Statistics />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/stores" element={<Stores />} />
                  <Route path="/stores/edit/:storeId" element={<EditStore />} />
                </>
              ) : (
                <Route path="/*" element={<EmptyStores />} />
              )}
              <Route path="/stores/create" element={<CreateStore />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </section>
      )}
    </div>
  );
}

export default App;
