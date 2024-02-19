import "../../styles/auth.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import DataContext from "../../context/DataContext";

const Login = () => {
  const { setMe } = useContext(DataContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputs = {
    email: useRef(""),
    password: useRef(""),
  };
  const navigate = useNavigate("");

  const handleLogin = async () => {
    setLoading(true);
    if (
      inputs.email.current.value === "" ||
      inputs.password.current.value === ""
    ) {
      setLoading(false);
      return setError("Email and password required");
    }

    if (inputs.password.current.value.length < 6) {
      setLoading(false);
      return setError("Incorrect email address or password");
    }

    setError("");
    try {
      const response = await api.post("/auth", {
        email: inputs.email.current.value,
        password: inputs.password.current.value,
      });

      if (!response.data.user.accessToken) {
        return setError("Incorrect email or password. Try agian");
      }

      setMe({
        ...response.data.user.info,
        accessToken: response.data.user.accessToken,
      });

      inputs.email.current.value = "";
      inputs.password.current.value = "";
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.error);
      setLoading(false);
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
      <h2>Login</h2>

      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        {error && !loading && (
          <p
            style={{
              backgroundColor: "red",
              padding: "5px",
              textAlign: "center",
              borderRadius: "10px",
              transition: "ease-in .5s",
              color: "white",
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
              color: "white",
            }}
          >
            Loading...
          </p>
        )}

        <input
          required
          type="text"
          placeholder="Email address or phone number"
          ref={inputs.email}
        />

        <section>
          <input
            required
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Password"
            ref={inputs.password}
          />
          <BsEyeFill
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            title="Hide/show password"
          />
        </section>

        <button type="submit" onClick={handleLogin}>
          Login
        </button>

        <button>Forgot Password</button>

        <p>
          Dont have an account?{" "}
          <span>
            <Link to="/register">Create account</Link>{" "}
          </span>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
