import { useNavigate } from "react-router-dom";
import { apiWithCred } from "../../api/api";
import DataContext from "../../context/DataContext";
import "../../styles/createfood.css";
import React, { useContext, useRef, useState } from "react";

const CreateFood = () => {
  const { selectedStore, me } = useContext(DataContext);

  const [newFood, setNewFood] = useState({
    name: "",
    price: "",
    image: "",
    ingredients: "",
    timeToMake: "",
  });
  const imageRef = useRef("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImage = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewFood((prev) => ({ ...prev, image: reader.result }));
    };
  };

  const createFood = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (
      newFood.name === "" ||
      newFood.image === "" ||
      newFood.ingredients === "" ||
      newFood.price === "" ||
      newFood.timeToMake === ""
    ) {
      setLoading(false);
      return setError("All fields are required");
    }

    try {
      const response = await apiWithCred(me.accessToken).post("/foods", {
        ...newFood,
        store: { _id: selectedStore._id, name: selectedStore.name },
      });

      console.log(response.data.food);

      navigate("/foods");
    } catch (err) {
      setLoading(false);
      if (err?.response?.data?.error) {
        setError(err?.response?.data?.error);
      } else {
        setError(err.message);
      }

      return setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <div className="create-food-container">
      <h2>Create Product</h2>

      <form onSubmit={(e) => createFood(e)}>
        {error && (
          <p className="error">
            {error ? error : "Something went wrong. Try again"}
          </p>
        )}
        {loading && !error && <p className="loader">Creating Food...</p>}

        <div>
          <label>Food Image</label>
          <input
            required
            type="file"
            accept="image/*"
            className={newFood.image ? "image-input" : undefined}
            ref={imageRef}
            onChange={(e) => handleImage(e.target.files[0])}
          />

          {newFood.image && (
            <div className="preview-image-container">
              <img src={newFood.image} alt="" />

              <div>
                <button onClick={() => imageRef.current.click()}>Change</button>

                <button
                  onClick={() => {
                    imageRef.current.value = "";
                    setNewFood((prev) => {
                      return { ...prev, image: "" };
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="">Name</label>
          <input
            required
            type="text"
            placeholder="Food name"
            value={newFood.name}
            onChange={(e) =>
              setNewFood((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
          />
        </div>

        <div>
          <label htmlFor="">Price</label>
          <input
            required
            type="number"
            placeholder="R100"
            value={newFood.price}
            onChange={(e) =>
              setNewFood((prev) => {
                return { ...prev, price: parseInt(e.target.value) };
              })
            }
          />
        </div>

        <div>
          <label htmlFor="">Ingredients</label>
          <input
            required
            type="text"
            placeholder="Bread, polony, cheese, etc..."
            value={newFood.ingredients}
            onChange={(e) =>
              setNewFood((prev) => {
                return { ...prev, ingredients: e.target.value };
              })
            }
          />
        </div>

        <div>
          <label htmlFor="">Time to make (in mins)</label>
          <input
            required
            type="number"
            placeholder="10 mins"
            value={newFood.timeToMake}
            onChange={(e) =>
              setNewFood((prev) => {
                return { ...prev, timeToMake: parseInt(e.target.value) };
              })
            }
          />
        </div>

        <button type="submit">Create Food</button>
      </form>
    </div>
  );
};

export default CreateFood;
