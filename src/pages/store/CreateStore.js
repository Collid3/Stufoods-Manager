import "../../styles/createstore.css";
import React, { useContext, useRef, useState } from "react";
import { apiWithCred } from "../../api/api";
import DataContext from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import StoreHours from "../../components/StoreHours";

const CreateStore = () => {
  const { me, setStores, stores } = useContext(DataContext);
  const [newStore, setNewStore] = useState({
    name: "",
    address: {
      city: "",
      suburb: "",
      address1: "",
      address2: "",
      landMark: "",
    },
    image: "",
    foodTypes: "",
    hours: {
      min: "5am",
      max: "5am",
    },
  });
  const imageRef = useRef("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImage = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewStore((prev) => ({ ...prev, image: reader.result }));
    };
  };

  const createStore = async () => {
    setError(false);
    setLoading(true);
    if (
      newStore.name === "" ||
      newStore.address.city === "" ||
      newStore.address.suburb === "" ||
      newStore.address.address1 === "" ||
      newStore.foodTypes === "" ||
      newStore.image === ""
    ) {
      setLoading(false);
      return setError("All fields are required");
    }

    try {
      const response = await apiWithCred(me.accessToken).post("/store", {
        ...newStore,
        owner: me._id,
      });

      if (stores.length === 0) {
        setStores([response.data.store]);
      } else {
        setStores((prev) => {
          return [...prev, response.data.store];
        });
      }

      navigate(-1);
      return setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err?.response?.data?.error) {
        setError(err?.response?.data?.error);
      } else {
        setError(err.message);
      }
      return setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div className="create-store-container">
      <h2>Create Store</h2>

      {error && (
        <p className="error">
          {error ? error : "Something went wrong. Try again"}
        </p>
      )}
      {loading && !error && <p className="loader">Creating Store...</p>}

      <form onSubmit={(e) => e.preventDefault()}>
        <label>Image</label>

        <input
          required
          type="file"
          accept="image/*"
          className={newStore.image ? "image-input" : undefined}
          ref={imageRef}
          onChange={(e) => handleImage(e.target.files[0])}
        />

        {newStore.image && (
          <div className="preview-image-container">
            <img src={newStore.image} alt="" />

            <div>
              <button onClick={() => imageRef.current.click()}>Change</button>

              <button
                onClick={() => {
                  console.log(imageRef.current.value);
                  imageRef.current.value = "";
                  setNewStore((prev) => {
                    return { ...prev, image: "" };
                  });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}

        <input
          required
          type="text"
          placeholder="Store name"
          value={newStore.name}
          onChange={(e) =>
            setNewStore((prev) => {
              return { ...prev, name: e.target.value };
            })
          }
        />

        <input
          required
          type="text"
          placeholder="City"
          value={newStore.address.city}
          onChange={(e) =>
            setNewStore((prev) => {
              return {
                ...prev,
                address: { ...prev.address, city: e.target.value },
              };
            })
          }
        />

        <input
          required
          type="text"
          placeholder="Suburb"
          value={newStore.address.suburb}
          onChange={(e) =>
            setNewStore((prev) => {
              return {
                ...prev,
                address: { ...prev.address, suburb: e.target.value },
              };
            })
          }
        />

        <input
          required
          type="text"
          placeholder="Address 2"
          value={newStore.address.address1}
          onChange={(e) =>
            setNewStore((prev) => {
              return {
                ...prev,
                address: { ...prev.address, address1: e.target.value },
              };
            })
          }
        />

        <input
          required
          type="text"
          placeholder="Address 2"
          value={newStore.address.address2}
          onChange={(e) =>
            setNewStore((prev) => {
              return {
                ...prev,
                address: { ...prev.address, address2: e.target.value },
              };
            })
          }
        />

        <input
          required
          type="text"
          placeholder="LandMark"
          value={newStore.address.landMark}
          onChange={(e) =>
            setNewStore((prev) => {
              return {
                ...prev,
                address: { ...prev.address, landMark: e.target.value },
              };
            })
          }
        />

        <label>Food Types</label>

        <select
          required
          value={newStore.foodTypes}
          onChange={(e) =>
            setNewStore((prev) => {
              return { ...prev, foodTypes: e.target.value };
            })
          }
        >
          <option value="">Select Food Type</option>
          <option value={"kota and chips"}>Kota and Chips</option>
          <option value={"pap and meat"}>Pap and Meat</option>
        </select>

        <label>Hours</label>

        <StoreHours setNewStore={setNewStore} newStore={newStore} />

        <button onClick={createStore}>Create Store</button>
      </form>
    </div>
  );
};

export default CreateStore;
