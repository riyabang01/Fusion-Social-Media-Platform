import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from '../redux/actions/authAction';

const Login = () => {
  const { auth, alert } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth.token, navigate]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow-lg border-0 p-4" style={{ width: "100%", maxWidth: "420px", borderRadius: "15px" }}>
        <form onSubmit={handleSubmit} className="needs-validation">
          <h2 className="text-center fw-bold mb-4 text-primary tracking-wide">FUSION</h2>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold text-secondary">Email address</label>
            <input 
              type="email" 
              className={`form-control py-2 ${alert.email ? 'is-invalid' : ''}`}
              id="email" 
              onChange={handleChangeInput} 
              value={email} 
              name="email" 
              placeholder="name@example.com"
              style={{ background: alert.email ? "#fd2d6a14" : "" }}
            />
            {alert.email && (
              <div className="invalid-feedback">
                {alert.email}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold text-secondary">Password</label>
            <div className="input-group">
              <input 
                type={typePass ? "text" : "password"} 
                className={`form-control py-2 ${alert.password ? 'is-invalid' : ''}`}
                id="password" 
                onChange={handleChangeInput} 
                value={password} 
                name="password" 
                placeholder="••••••••"
                style={{ background: alert.password ? "#fd2d6a14" : "" }}
              />
              <button 
                type="button" 
                className="btn btn-outline-secondary px-3" 
                onClick={() => setTypePass(!typePass)}
              >
                {typePass ? "Hide" : "Show"}
              </button>
              {alert.password && (
                <div className="invalid-feedback d-block">
                  {alert.password}
                </div>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 py-2 fw-bold mb-3 shadow-sm text-uppercase" 
            disabled={!email || !password}
            style={{ borderRadius: "8px" }}
          >
            Login
          </button>

          <p className="text-center text-muted mb-0 small">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary fw-semibold text-decoration-none">Register Now.</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
