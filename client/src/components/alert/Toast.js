import React from 'react'

const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div
      className={`toast show position-fixed border-0 text-light ${bgColor} shadow-lg rounded-3`}
      style={{ top: "20px", right: "20px", minWidth: "260px", zIndex: 99999 }}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className={`toast-header text-light ${bgColor} border-bottom border-white border-opacity-10 d-flex justify-content-between align-items-center px-3 py-2.5 rounded-top-3`}>
        <strong className="me-auto fw-bold tracking-wide" style={{ fontSize: "0.9rem" }}>
          {msg.title}
        </strong>
        <button
          type="button"
          className="btn-close btn-close-white ms-auto shadow-none"
          onClick={handleShow}
          style={{ width: "0.75rem", height: "0.75rem" }}
          aria-label="Close"
        />
      </div>
      <div className="toast-body p-3 text-wrap" style={{ fontSize: "0.88rem", lineHeight: "1.4" }}>
        {msg.body}
      </div>
    </div>
  );
};

export default Toast;
