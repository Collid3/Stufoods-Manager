import "../../styles/foods.css";
import React, { useContext, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { PiTrashSimpleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import { apiWithCred } from "../../api/api";

const Foods = () => {
  const { me, stores, selectedStore } = useContext(DataContext);

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate("");

  const handleDelete = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await apiWithCred(me.accessToken).delete(`foods/${id}`);
      if (!response) return setError("Something went wrong. Try again");

      setFoods((prev) => {
        return prev.filter((item) => item._id !== id);
      });

      return setLoading(false);
    } catch (err) {
      setError("Something went wrong. Try again");
      return setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedStore) {
      return setFoods([]);
    }
    setLoading(true);

    async function fetchFoods() {
      try {
        const response = await apiWithCred(me.accessToken).get(
          `/foods/store/${selectedStore._id}`
        );
        setFoods(response.data.foods);
        return setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }

    fetchFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStore]);

  return (
    <div className="foods-container">
      <section>
        <h2>Foods</h2>

        <button onClick={() => navigate("/foods/create")}>
          <BiPlus /> Create new
        </button>
      </section>

      {loading ? (
        <h4>Loading...</h4>
      ) : foods.filter((product) =>
          product.name.toLowerCase().includes(search.toLocaleLowerCase())
        ).length > 0 ? (
        <div>
          <div className="search-container">
            <input
              type="search"
              placeholder="Search product"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <ul>
            {foods
              .filter((product) =>
                product.name.toLowerCase().includes(search.toLocaleLowerCase())
              )
              .map((product) => (
                <li className="product" key={product._id}>
                  <img src={product.image.url} alt="Kota" width={200} />

                  <div>
                    <p>{product.name}</p>
                    <h4>R{product.price.toFixed(2)}</h4>
                  </div>

                  <div className="buttons">
                    <button onClick={() => navigate(`/foods/${product._id}`)}>
                      <MdEdit /> Edit
                    </button>

                    <button onClick={() => handleDelete(product._id)}>
                      <PiTrashSimpleFill /> Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ) : search.length > 0 ? (
        <p>Search for '{search}' not found</p>
      ) : (
        <p>
          There is no product in this store.{" "}
          <span
            onClick={() => navigate("/foods/create")}
            style={{
              color: "rgb(0, 101, 184)",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Create
          </span>{" "}
          a new product
        </p>
      )}
    </div>
  );
};

export default Foods;
