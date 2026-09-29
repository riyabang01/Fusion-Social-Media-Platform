import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/authAction";

const Sidebar = ({ adminMenu, setAdminMenu }) => {
  const dispatch = useDispatch();

  return (
    <div className="d-flex flex-column h-100 justify-content-between p-3 bg-white text-start">
      <div className="w-100">
        <div className="d-flex align-items-center justify-content-between border-bottom border-light-subtle pb-3 mb-4 px-2">
          <h4 
            className="m-0 fw-black text-primary tracking-wider text-uppercase" 
            style={{ 
              letterSpacing: "0.06em",
              background: "linear-gradient(45deg, #0d6efd, #0dcaf0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            FUSION
          </h4>
          <button type="button" className="btn p-0 d-md-none text-secondary border-0" id="sidebarIcon">
            <i className="fa fa-times fs-5" aria-hidden="true" />
          </button>
        </div>

        <div className="d-flex flex-column gap-1 w-100">
          <button
            type="button"
            className={`btn w-100 d-flex align-items-center gap-3 px-3 py-2.5 border-0 rounded-3 text-start transition-all fw-semibold ${adminMenu === 1 ? "bg-primary text-white shadow-sm" : "bg-transparent text-secondary hover-bg-light"}`}
            onClick={() => setAdminMenu(1)}
            style={{ fontSize: "0.88rem" }}
          >
            <i className="fa fa-th fs-6" />
            <span>Dashboard</span>
          </button>

          <small className="text-uppercase text-muted fw-bold tracking-widest px-3 mt-4 mb-2 d-block" style={{ fontSize: "0.68rem" }}>
            Admin Control
          </small>

          <button
            type="button"
            className={`btn w-100 d-flex align-items-center gap-3 px-3 py-2.5 border-0 rounded-3 text-start transition-all fw-semibold ${adminMenu === 2 ? "bg-primary text-white shadow-sm" : "bg-transparent text-secondary hover-bg-light"}`}
            onClick={() => setAdminMenu(2)}
            style={{ fontSize: "0.88rem" }}
          >
            <i className="fa fa-lock fs-6" />
            <span>Admin Management</span>
          </button>

          <button
            type="button"
            className={`btn w-100 d-flex align-items-center gap-3 px-3 py-2.5 border-0 rounded-3 text-start transition-all fw-semibold ${adminMenu === 3 ? "bg-primary text-white shadow-sm" : "bg-transparent text-secondary hover-bg-light"}`}
            onClick={() => setAdminMenu(3)}
            style={{ fontSize: "0.88rem" }}
          >
            <i className="fa fa-ban fs-6" />
            <span>Spams Management</span>
          </button>

          <button
            type="button"
            className={`btn w-100 d-flex align-items-center gap-3 px-3 py-2.5 border-0 rounded-3 text-start transition-all fw-semibold ${adminMenu === 4 ? "bg-primary text-white shadow-sm" : "bg-transparent text-secondary hover-bg-light"}`}
            onClick={() => setAdminMenu(4)}
            style={{ fontSize: "0.88rem" }}
          >
            <i className="fa fa-wrench fs-6" />
            <span>Users Management</span>
          </button>
        </div>
      </div>

      <div className="border-top border-light-subtle pt-3 w-100 mt-5 px-1">
        <Link 
          to="/" 
          onClick={() => dispatch(logout())}
          className="d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 text-danger fw-bold text-decoration-none transition-all hover-bg-danger-subtle"
          style={{ fontSize: "0.88rem" }}
        >
          <i className="fa fa-power-off fs-6" />
          <span>Log Out</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
