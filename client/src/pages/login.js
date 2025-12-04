import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { adminLogin, login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const [userType, setUserType] = useState(false);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userType) dispatch(login(userData));
    else dispatch(adminLogin(userData));
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center fw-bold auth-heading">FUSION</h2>

        <div className="mb-3">
          <label className="form-label fw-semibold">Email Address</label>
          <div className="form-input-wrap p-2 outer-shadow">
            <input
              type="email"
              className="w-100"
              onChange={handleChangeInput}
              value={email}
              name="email"
              required
            />
          </div>
        </div>

        <div className="mb-3 pass">
          <label className="form-label fw-semibold">Password</label>
          <div className="form-input-wrap p-2 outer-shadow">
            <input
              type={typePass ? "text" : "password"}
              className="w-100"
              onChange={handleChangeInput}
              value={password}
              name="password"
              required
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
        </div>

        <div className="d-flex justify-content-evenly mx-0 mb-3">
          <label>
            User:
            <input
              type="radio"
              name="role"
              defaultChecked
              onClick={() => setUserType(false)}
              className="ms-1"
            />
          </label>
          <label>
            Admin:
            <input
              type="radio"
              name="role"
              onClick={() => setUserType(true)}
              className="ms-1"
            />
          </label>
        </div>

        <button
          type="submit"
          className="auth-btn w-100 fw-bold"
          disabled={!email || !password}
        >
          Login
        </button>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="fw-bold text-decoration-none" style={{ color: "var(--violet)" }}>
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
