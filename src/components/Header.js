import { useNavigate } from "react-router-dom";
import "../styles/header.css";
import React, { useContext } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import DataContext from "../context/DataContext";
import { AiOutlinePoweroff } from "react-icons/ai";
import api from "../api/api";

const Header = () => {
  const { me, setMe } = useContext(DataContext);
  const navigate = useNavigate("");

  const handleLogout = async () => {
    try {
      const response = await api.get("/auth");
      if (!response.data.success) {
        return;
      }
      setMe(null);
      return navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <h1>STUFOODS</h1>

      <nav>
        <p>
          {window.matchMedia("(prefers-color-scheme: light)").matches ? (
            <MdDarkMode title="Go Dark Mode" />
          ) : (
            <MdLightMode title="Go Light Mode" />
          )}
        </p>

        {me && (
          <>
            <p>
              <IoNotificationsOutline />
            </p>

            <button onClick={handleLogout}>
              Logout <AiOutlinePoweroff />
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
