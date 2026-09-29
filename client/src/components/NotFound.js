import React from 'react'
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not_found_page container d-flex align-items-center justify-content-center px-4" style={{ minHeight: "calc(100vh - 140px)" }}>
            <div className="text-center p-5 bg-white border border-light-subtle rounded-4 shadow-sm max-w-sm w-100">
                <div className="bg-light text-secondary rounded-circle d-inline-flex align-items-center justify-content-center shadow-inner mb-4" style={{ width: "90px", height: "90px" }}>
                    <i className="fa-solid fa-compass-slash fs-1 text-muted" />
                </div>
                
                <h1 className="fw-extrabold text-dark tracking-tight m-0" style={{ fontSize: "3.2rem", lineHeight: "1" }}>404</h1>
                <h6 className="fw-bold text-secondary text-uppercase tracking-wider mt-2 mb-3" style={{ fontSize: "0.85rem" }}>
                    Route Segment Absent
                </h6>
                
                <p className="text-muted small m-0 mb-4 px-2">
                    The direct publishing matrix channel or profile context location template you requested does not exist on this cluster namespace
                </p>
                
                <Link to="/" className="btn btn-sm btn-primary px-4 py-2 rounded-pill fw-semibold shadow-sm text-uppercase tracking-wider fs-7">
                    Return to Feed
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
