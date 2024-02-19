import { useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
import React, { useContext, useEffect, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { BsBagCheck, BsCart3 } from "react-icons/bs";
import { ImStatsBars } from "react-icons/im";
import { MdOutlineRateReview } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { FaStoreAlt } from "react-icons/fa";
import DataContext from "../context/DataContext";

const Sidebar = () => {
  const { stores, selectedStore, setSelectedStore } = useContext(DataContext);

  const sidebarNavigation = [
    { name: "Dashboard", icon: <RxDashboard />, route: "/" },
    { name: "Foods", icon: <BsBagCheck />, route: "/foods" },
    { name: "Orders", icon: <BsCart3 />, route: "/orders" },
    { name: "Statistics", icon: <ImStatsBars />, route: "/statistics" },
    { name: "Reviews", icon: <MdOutlineRateReview />, route: "/reviews" },
    { name: "Transactions", icon: <GrTransaction />, route: "/transactions" },
    { name: "Stores", icon: <FaStoreAlt />, route: "/stores" },
    { name: "Settings", icon: <IoSettingsSharp />, route: "/profile" },
  ];
  const [selectStoreMenu, setSelectStoreMenu] = useState(false);
  const navigate = useNavigate("");

  useEffect(() => {
    if (!stores) return;
    setSelectedStore(stores[0]);
  }, [stores]);

  if (!stores || stores.length === 0) {
    return (
      <div className="sidebar-container">
        <button
          className="create-store-button"
          onClick={() => navigate("/stores/create")}
        >
          Create Store
        </button>
      </div>
    );
  }

  if (!selectedStore) return;

  return (
    <div className="sidebar-container">
      <ul className="sidebar-navigations">
        <div className="select-store">
          <p
            onClick={() => setSelectStoreMenu(!selectStoreMenu)}
            className={`${selectStoreMenu ? "menu-open" : undefined}`}
          >
            {selectedStore.name}{" "}
            <span>
              {selectStoreMenu ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </span>
          </p>

          <section className={`${selectStoreMenu ? "menu" : undefined}`}>
            {stores
              .filter((store) => store._id !== selectedStore._id)
              .map((store, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setSelectedStore(store);
                    setSelectStoreMenu(false);
                  }}
                >
                  {store.name}
                </p>
              ))}
          </section>
        </div>

        {sidebarNavigation.map((navigation, index) => (
          <li
            className={`sidebar-navigation ${
              window.location.pathname === navigation.route && "selected"
            }`}
            key={index}
            onClick={() => {
              setSelectStoreMenu(false);
              navigate(navigation.route);
            }}
          >
            {navigation.icon}
            {navigation.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
