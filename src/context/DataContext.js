import { createContext, useEffect, useState } from "react";
import api, { apiWithCred } from "../api/api";
import Cookies from "js-cookie";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [me, setMe] = useState(null);
  const [selectedPage, setSelectedPage] = useState("/");
  const [stores, setStores] = useState(null);
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalError, setGlobalError] = useState(null);
  const [selectedStore, setSelectedStore] = useState(
    stores?.length > 0 ? stores[0] : null
  );

  // persist login
  useEffect(() => {
    if (Cookies.get("jwt")) {
      async function refreshToken() {
        try {
          const response = await api.get("/refresh");
          setMe({
            ...response.data.user.info,
            accessToken: response.data.user.accessToken,
          });
        } catch (err) {
          console.log(err.message);
        }
      }

      refreshToken();

      setTimeout(() => {
        refreshToken();
      }, 3600000);
    } else return setLoading(false);
  }, []);

  // fetch stores
  useEffect(() => {
    const fetchStoresAndOrders = async () => {
      if (!me) return;

      try {
        const response = await apiWithCred(me.accessToken).get(
          `/store/${me._id}`
        );

        if (response.data.stores.length === 0) {
          return setLoading(false);
        }

        setStores(response.data.stores);

        const response2 = await apiWithCred(me.accessToken).get("/order");
        setOrders(response2.data.orders);

        return setLoading(false);
      } catch (err) {
        console.log(err);
        if (err?.response?.data?.error) {
          setGlobalError(err?.response?.data?.error);
        } else {
          setGlobalError("Something went wrong. Try agian");
        }
        return setLoading(false);
      }
    };

    fetchStoresAndOrders();
  }, [me]);

  return (
    <DataContext.Provider
      value={{
        me,
        setMe,
        selectedPage,
        setSelectedPage,
        stores,
        setStores,
        loading,
        selectedStore,
        setSelectedStore,
        orders,
        setOrders,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
