import React from "react";

const Loading = () => {
  return (
    <div
      className="position-fixed w-100 h-100 d-flex align-items-center justify-content-center loading_overlay"
      style={{
        background: "rgba(15, 23, 42, 0.4)",
        backdropFilter: "blur(6px)",
        top: 0,
        left: 0,
        zIndex: 99999,
      }}
    >
      <div className="text-center d-flex flex-column align-items-center gap-3">
        <svg width="60" height="60" viewBox="0 0 40 50">
          <polygon
            stroke="#ffffff"
            strokeWidth="2.5"
            fill="none"
            points="20,1 40,40 1,40"
            style={{
              strokeDasharray: "120",
              animation: "dash 2s linear infinite"
            }}
          />
        </svg>
        <span 
          className="text-white fw-semibold small text-uppercase tracking-widest mt-1 animate-pulse"
          style={{ fontSize: "0.78rem", letterSpacing: "0.15em" }}
        >
          Loading Cluster...
        </span>
      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -240;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
