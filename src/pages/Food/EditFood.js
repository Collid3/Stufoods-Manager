import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api, { apiWithCred } from "../../api/api";
import DataContext from "../../context/DataContext";

const EditProduct = () => {
  const { me } = useContext(DataContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState(null);
  const [newFood, setNewFood] = useState(null);
  const [success, setSuccess] = useState(false);
  const { productId } = useParams();
  const imageRef = useRef("");

  useEffect(() => {
    const getFood = async () => {
      try {
        const response = await api.get(`/foods/${productId}`);
        setFood(response.data.food);
        setNewFood(response.data.food);

        // setLoadingFood(false);
      } catch (err) {
        if (err?.response?.data?.error) {
          setError(err?.response?.data?.error);
        } else {
          setError(err.message);
        }
      }
    };

    getFood();
  }, [productId]);

  const handleImage = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewFood((prev) => ({ ...prev, newImage: reader.result }));
    };
  };

  const handleUpdate = async () => {
    setLoading(true);
    if (JSON.stringify(food) === JSON.stringify(newFood)) {
      return setLoading(false);
    }

    try {
      const response = await apiWithCred(me.accessToken).put(
        `/foods/${productId}`,
        newFood
      );

      setFood(response.data.food);
      setNewFood(response.data.food);
      setLoading(false);
      setSuccess(true);

      return setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      return setLoading(false);
    }
  };

  return (
    <div className="create-food-container">
      <h2>Edit Product</h2>

      {!food || !newFood ? (
        <p className="loader">Loading Food...</p>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          {error && (
            <p className="error">
              {error ? error : "Something went wrong. Try again"}
            </p>
          )}

          {loading && !error && <p className="loader">Updating Food...</p>}
          {!loading && !error && success && (
            <p className="loader">Updated successfully</p>
          )}

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
                <img
                  src={newFood.newImage ? newFood.newImage : newFood.image.url}
                  alt=""
                />

                <div>
                  <button onClick={() => imageRef.current.click()}>
                    Change
                  </button>

                  <button
                    onClick={() => {
                      if (imageRef.current?.files[0]) {
                        imageRef.current.value = "";
                      }
                      setNewFood((prev) => {
                        return { ...prev, newImage: null };
                      });
                    }}
                  >
                    Reset
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

          <div
            className="buttons"
            style={{ flexDirection: "row", maxWidth: "400px" }}
          >
            <button
              type="submit"
              onClick={handleUpdate}
              style={{
                width: "100%",
                backgroundColor: "green",
                color: "white",
                padding: "1rem",
                borderRadius: "5px",
              }}
            >
              Submit
            </button>
            <button
              onClick={() => setNewFood(food)}
              style={{
                width: "100%",
                backgroundColor: "red",
                color: "white",
                padding: "1rem",
                borderRadius: "5px",
              }}
            >
              Reset
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
