import "../../styles/store.css";
import React, { useContext, useState } from "react";
import DataContext from "../../context/DataContext";
import Store from "../../components/Store";
import { useNavigate } from "react-router-dom";

const Stores = () => {
  const { stores, setStores, me } = useContext(DataContext);
  const navigate = useNavigate("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!stores) return;

  return (
    <div className="stores-container">
      <h2>My Stores</h2>

      <section>
        <input type="search" placeholder="Search store" />
        <button onClick={() => navigate("/stores/create")}>Create Store</button>
      </section>

      {loading && <h2>Deleting store...</h2>}
      {!loading && error && <h2>{error}</h2>}

      <ul>
        {stores.map((store) => (
          <Store
            key={store._id}
            store={store}
            setStores={setStores}
            me={me}
            setError={setError}
            setLoading={setLoading}
          />
        ))}
      </ul>
    </div>
  );
};

export default Stores;
