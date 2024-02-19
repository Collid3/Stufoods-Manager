import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyStores = () => {
  const navigate = useNavigate("");

  return (
    <div
      className="empty-store"
      style={{ flexGrow: 2, display: "grid", placeContent: "center" }}
    >
      <h3>No store found for this account</h3>
      <h3>
        <span onClick={() => navigate("/stores/create")}>Create a store</span>{" "}
        to start
      </h3>
    </div>
  );
};

export default EmptyStores;
