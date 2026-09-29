import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../../redux/actions/authAction";

const ChangePassword = ({ setChangePassword }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cnfNewPassword, setCnfNewPassword] = useState("");
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = e => {
      e.preventDefault();
      dispatch(changePassword({ oldPassword, newPassword, cnfNewPassword, auth }));
  };

  return (
    <div className="change_password_modal d-flex align-items-center justify-content-center position-fixed top-0 start-0 w-100 h-100" style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", zIndex: 99999 }}>
      <div className="bg-white rounded-4 shadow-lg border border-light-subtle p-4 position-relative w-100 overflow-hidden" style={{ maxWidth: "440px" }}>
        
        <div className="change_password_header d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
          <h6 className="m-0 fw-bold text-dark text-uppercase tracking-wider small">Security Management</h6>
          <span 
            className="fs-4 text-secondary cursor-pointer close_btn_layer" 
            onClick={() => setChangePassword(false)}
            style={{ cursor: "pointer", userSelect: "none", lineHeight: "1" }}
          >
            &times;
          </span>
        </div>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div className="form-group text-start">
            <label htmlFor="oldPassword" className="form-label small fw-semibold text-secondary mb-1">Current Password</label>
            <input
              type="password"
              className="form-control form-control-sm rounded-3 px-3 py-2"
              id="oldPassword"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="form-group text-start">
            <label htmlFor="newPassword" className="form-label small fw-semibold text-secondary mb-1">New Password</label>
            <input
              type="password"
              className="form-control form-control-sm rounded-3 px-3 py-2"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-group text-start mb-2">
            <label htmlFor="cnfNewPassword" className="form-label small fw-semibold text-secondary mb-1">Confirm New Password</label>
            <input
              type="password"
              className="form-control form-control-sm rounded-3 px-3 py-2"
              id="cnfNewPassword"
              name="cnfNewPassword"
              value={cnfNewPassword}
              onChange={(e) => setCnfNewPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-sm btn-primary w-100 py-2 rounded-pill fw-semibold shadow-sm text-uppercase tracking-wider fs-7 mt-1" type="submit">
            Update Security Credentials
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
