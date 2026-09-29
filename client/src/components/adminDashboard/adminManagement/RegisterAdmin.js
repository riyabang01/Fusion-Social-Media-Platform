import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../../../redux/actions/authAction";

const RegisterAdmin = () => {
  const { auth, alert } = useSelector((state) => state);
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
  const { fullname, username, email, password, cf_password } = userData;

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
    userData.role = "admin";
    dispatch(registerAdmin(userData));
    setUserData(initialState);
  };

  return (
    <div className="auth_page container d-flex align-items-center justify-content-center px-3" style={{ minHeight: "calc(100vh - 140px)" }}>
      <div className="card w-100 border border-light-subtle rounded-4 shadow-lg bg-white p-4 p-md-5" style={{ maxWidth: "480px" }}>
        <form onSubmit={handleSubmit} className="text-start">
          <h3 className="fw-black text-center mb-4 tracking-wider text-uppercase text-primary" style={{ letterSpacing: "0.08em" }}>
            FUSION
          </h3>
          
          <div className="text-center mb-4 border-bottom pb-2 border-light-subtle">
            <h6 className="fw-bold text-secondary text-uppercase tracking-wider small m-0" style={{ fontSize: "0.78rem" }}>
              Administrative Account Provisioning
            </h6>
          </div>

          <div className="mb-3">
            <label htmlFor="fullname" className="form-label small fw-semibold text-secondary mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="form-control form-control-sm rounded-3 px-3 py-2"
              id="fullname"
              onChange={handleChangeInput}
              value={fullname}
              name="fullname"
              style={{ backgroundColor: alert.fullname ? "rgba(253, 45, 106, 0.08)" : "" }}
            />
            {alert.fullname && (
              <small className="form-text text-danger d-block mt-1 small fw-medium" style={{ fontSize: "0.78rem" }}>
                {alert.fullname}
              </small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label small fw-semibold text-secondary mb-1">
              User Name
            </label>
            <input
              type="text"
              className="form-control form-control-sm rounded-3 px-3 py-2"
              id="username"
              onChange={handleChangeInput}
              value={username.toLowerCase().replace(/ /g, "")}
              name="username"
              style={{ backgroundColor: alert.username ? "rgba(253, 45, 106, 0.08)" : "" }}
            />
            {alert.username && (
              <small className="form-text text-danger d-block mt-1 small fw-medium" style={{ fontSize: "0.78rem" }}>
                {alert.username}
              </small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label small fw-semibold text-secondary mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="form-control form-control-sm rounded-3 px-3 py-2"
              id="email"
              onChange={handleChangeInput}
              value={email}
              name="email"
              style={{ backgroundColor: alert.email ? "rgba(253, 45, 106, 0.08)" : "" }}
            />
            {alert.email && (
              <small className="form-text text-danger d-block mt-1 small fw-medium" style={{ fontSize: "0.78rem" }}>
                {alert.email}
              </small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label small fw-semibold text-secondary mb-1">
              Password
            </label>
            <div className="position-relative">
              <input
                type={typePass ? "text" : "password"}
                className="form-control form-control-sm rounded-3 px-3 py-2 pr-5"
                id="password"
                onChange={handleChangeInput}
                value={password}
                name="password"
                style={{ backgroundColor: alert.password ? "rgba(253, 45, 106, 0.08)" : "" }}
              />
              <small 
                onClick={() => setTypePass(!typePass)}
                className="position-absolute end-0 top-50 translate-middle-y me-3 text-primary fw-semibold cursor-pointer select-none"
                style={{ cursor: "pointer", fontSize: "0.8rem" }}
              >
                {typePass ? "Hide" : "Show"}
              </small>
            </div>
            {alert.password && (
              <small className="form-text text-danger d-block mt-1 small fw-medium" style={{ fontSize: "0.78rem" }}>
                {alert.password}
              </small>
            )}
          </div>

          <div className="mb-3.5">
            <label htmlFor="cf_password" className="form-label small fw-semibold text-secondary mb-1">
              Confirm Password
            </label>
            <div className="position-relative">
              <input
                type={typeCfPass ? "text" : "password"}
                className="form-control form-control-sm rounded-3 px-3 py-2 pr-5"
                id="cf_password"
                onChange={handleChangeInput}
                value={cf_password}
                name="cf_password"
                style={{ backgroundColor: alert.cf_password ? "rgba(253, 45, 106, 0.08)" : "" }}
              />
              <small 
                onClick={() => setTypeCfPass(!typeCfPass)}
                className="position-absolute end-0 top-50 translate-middle-y me-3 text-primary fw-semibold cursor-pointer select-none"
                style={{ cursor: "pointer", fontSize: "0.8rem" }}
              >
                {typeCfPass ? "Hide" : "Show"}
              </small>
            </div>
            {alert.cf_password && (
              <small className="form-text text-danger d-block mt-1 small fw-medium" style={{ fontSize: "0.78rem" }}>
                {alert.cf_password}
              </small>
            )}
          </div>

          <div className="d-flex justify-content-center gap-4 align-items-center mx-0 mb-4 border bg-light p-2 rounded-3">
            <div className="form-check d-flex align-items-center gap-1.5 mb-0">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                defaultChecked
                className="form-check-input"
                onChange={handleChangeInput}
                style={{ cursor: "pointer" }}
              />
              <label htmlFor="male" className="form-check-label small fw-medium text-dark mb-0" style={{ cursor: "pointer" }}>
                Male
              </label>
            </div>

            <div className="form-check d-flex align-items-center gap-1.5 mb-0">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                className="form-check-input"
                onChange={handleChangeInput}
                style={{ cursor: "pointer" }}
              />
              <label htmlFor="female" className="form-check-label small fw-medium text-dark mb-0" style={{ cursor: "pointer" }}>
                Female
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-sm btn-primary w-100 py-2.5 rounded-pill fw-bold shadow-sm text-uppercase tracking-wider fs-7"
          >
            Provision Admin Identity
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmin;
