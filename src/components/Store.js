import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiWithCred } from "../api/api";

const Store = ({ store, setStores, me, setError, setLoading }) => {
  const navigate = useNavigate("");

  const handleDelete = async (id) => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiWithCred(me.accessToken).delete(
        `/store/${store._id}/${me._id}`
      );
      if (!response.data.success) {
        return;
      }

      setStores((prev) => {
        return prev.filter((Store) => Store._id !== id);
      });
      return setLoading(false);
    } catch (err) {
      setLoading(false);
      if (!err?.response?.data?.error) {
        setError("Something went wrong, try again later");
      } else {
        setError(err?.response?.data?.error);
      }

      return setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <li>
      <img src={store.image.url} alt="store" />

      <h3>{store.name}</h3>

      <div className="store-details">
        <small>{store.address.city}</small>
        <small>{store.address.suburb}</small>
        <small>{store.address.location}</small>
        <small>Hours {`${store.hours.min} - ${store.hours.max}`}</small>
        <small>Food Types: {store.foodTypes}</small>
      </div>

      <div className="buttons">
        <button onClick={() => navigate(`/stores/edit/${store._id}`)}>
          Edit
        </button>
        <button onClick={() => handleDelete(store._id)}>Delete</button>
      </div>
    </li>
  );
};

export default Store;
