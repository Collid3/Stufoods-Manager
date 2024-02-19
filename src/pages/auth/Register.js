import "../../styles/auth.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { BsEyeFill } from "react-icons/bs";
import DataContext from "../../context/DataContext";

const Register = () => {
  const { setMe } = useContext(DataContext);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputs = {
    email: useRef(""),
    password: useRef(""),
    phoneNumber: useRef(""),
  };
  const navigate = useNavigate("");

  function displayError(message) {
    setError(message);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (
      inputs.email.current.value === "" ||
      inputs.password.current.value === "" ||
      inputs.phoneNumber.current.value === ""
    ) {
      setLoading(false);
      return displayError("All fields are required");
    }

    if (inputs.password.current.value.length < 6) {
      setLoading(false);
      return displayError(
        "Password too short. Must be a minimum of 6 characters"
      );
    }

    try {
      const response = await api.post("/users/manager", {
        email: inputs.email.current.value,
        password: inputs.password.current.value,
        phoneNumber: inputs.phoneNumber.current.value,
      });

      const response2 = await api.post("/auth", {
        email: inputs.email.current.value,
        password: inputs.password.current.value,
      });

      if (!response) return displayError("Something went wrong. Try again");

      setMe({
        ...response2.data.user.info,
        accessToken: response2.data.user.accessToken,
      });
      navigate("/");
      return setLoading(false);
    } catch (err) {
      displayError(err?.response?.data?.error);
      return setLoading(false);
    }
  };

  useEffect(() => {
    if (inputs.password?.current?.value.length < 1) return;

    const end = inputs.password.current.value.length;
    inputs.password.current.setSelectionRange(end, end);
    inputs.password.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPassword]);

  return (
    <div className="auth-container">
      <h2>Register</h2>

      <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
        {error && !loading && (
          <p
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "5px",
              textAlign: "center",
              borderRadius: "10px",
              transition: "ease-in .5s",
            }}
          >
            {error}
          </p>
        )}

        {loading && (
          <p
            style={{
              backgroundColor: "orange",
              padding: "5px",
              textAlign: "center",
              borderRadius: "10px",
              transition: "ease-in .5s",
            }}
          >
            Loading...
          </p>
        )}

        <input
          autocomplete="off"
          type="email"
          placeholder="Email Address"
          ref={inputs.email}
          spellCheck={false}
        />

        <input
          autocomplete="off"
          type="text"
          placeholder="Phone number"
          ref={inputs.phoneNumber}
          spellCheck={false}
        />

        <section>
          <BsEyeFill
            onClick={() => setShowPassword(!showPassword)}
            title="Hide/show password"
          />
          <input
            autocomplete="off"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Password"
            ref={inputs.password}
          />
        </section>

        <button type="submit">Create Account</button>

        <p>
          Already have an account?{" "}
          <span>
            <Link to="/login">Login</Link>{" "}
          </span>{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;
