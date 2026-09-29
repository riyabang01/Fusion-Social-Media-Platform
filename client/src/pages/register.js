import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from '../redux/actions/authAction';

const Register = () => {
  const { auth, alert } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = { 
    fullname: "", 
    username: "", 
    email: "", 
    password: "", 
    cf_password: "", 
    gender: "male" 
  };

  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cf_password, gender } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth.token, navigate]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow-lg border-0 p-4 my-4" style={{ width: "100%", maxWidth: "450px", borderRadius: "15px" }}>
        <form onSubmit={handleSubmit} className="needs-validation">
          <h2 className="text-center fw-bold mb-4 text-primary tracking-wide">FUSION</h2>

          <div className="mb-3">
            <label htmlFor="fullname" className="form-label fw-semibold text-secondary">Full name</label>
            <input 
              type="text" 
              className={`form-control py-2 ${alert.fullname ? 'is-invalid' : ''}`}
              id="fullname" 
              onChange={handleChangeInput} 
              value={fullname} 
              name="fullname" 
              placeholder="John Doe"
              style={{ background: alert.fullname ? "#fd2d6a14" : "" }} 
            />
            {alert.fullname && (
              <div className="invalid-feedback">
                {alert.fullname}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold text-secondary">User name</label>
            <input 
              type="text" 
              className={`form-control py-2 ${alert.username ? 'is-invalid' : ''}`}
              id="username" 
              onChange={handleChangeInput} 
              value={username.toLowerCase().replace(/ /g, "")} 
              name="username" 
              placeholder="johndoe"
              style={{ background: alert.username ? "#fd2d6a14" : "" }} 
            />
            {alert.username && (
              <div className="invalid-feedback">
                {alert.username}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold text-secondary">Email address</label>
            <input 
              type="email" 
              className={`form-control py-2 ${alert.email ? 'is-invalid' : ''}`}
              id="email" 
              onChange={handleChangeInput} 
              value={email} 
              name="email" 
              placeholder="example@mail.com"
              style={{ background: alert.email ? "#fd2d6a14" : "" }} 
            />
            {alert.email && (
              <div className="invalid-feedback">
                {alert.email}
              </div>
            )}
          </div>

          <div className="mb-3">
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

          <div className="mb-4">
            <label htmlFor="cf_password" className="form-label fw-semibold text-secondary">Confirm Password</label>
            <div className="input-group">
              <input 
                type={typeCfPass ? "text" : "password"} 
                className={`form-control py-2 ${alert.cf_password ? 'is-invalid' : ''}`}
                id="cf_password" 
                onChange={handleChangeInput} 
                value={cf_password} 
                name="cf_password" 
                placeholder="••••••••"
                style={{ background: alert.cf_password ? "#fd2d6a14" : "" }} 
              />
              <button 
                type="button" 
                className="btn btn-outline-secondary px-3" 
                onClick={() => setTypeCfPass(!typeCfPass)}
              >
                {typeCfPass ? "Hide" : "Show"}
              </button>
              {alert.cf_password && (
                <div className="invalid-feedback d-block">
                  {alert.cf_password}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4 d-flex gap-4 justify-content-center">
            <div className="form-check">
              <input 
                className="form-check-input"
                type="radio" 
                id="male" 
                name="gender" 
                value="male" 
                checked={gender === "male"} 
                onChange={handleChangeInput} 
              />
              <label htmlFor="male" className="form-check-label fw-medium text-secondary">
                Male
              </label>
            </div>
            <div className="form-check">
              <input 
                className="form-check-input"
                type="radio" 
                id="female" 
                name="gender" 
                value="female" 
                checked={gender === "female"} 
                onChange={handleChangeInput} 
              />
              <label htmlFor="female" className="form-check-label fw-medium text-secondary">
                Female
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 py-2 fw-bold mb-3 shadow-sm text-uppercase"
            style={{ borderRadius: "8px" }}
          >
            Register
          </button>

          <p className="text-center text-muted mb-0 small">
            Already have an account?{" "}
            <Link to="/" className="text-primary fw-semibold text-decoration-none">Login Now.</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
