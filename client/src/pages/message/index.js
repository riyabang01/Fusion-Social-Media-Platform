import React from 'react'
import LeftSide from '../../components/message/LeftSide'

const Message = () => {
    return (
      <div className="message_page container-fluid py-4 px-3 px-md-4">
        <div className="card border border-light-subtle rounded-4 shadow-sm bg-white overflow-hidden w-100 min-vh-75 d-flex flex-row" style={{ height: "calc(100vh - 140px)" }}>
          <div className="col-12 col-md-5 col-lg-4 px-0 bg-white border-end border-light-subtle h-100 overflow-y-auto">
            <LeftSide />
          </div>

          <div className="d-none d-md-flex col-md-7 col-lg-8 px-0 h-100 bg-light-subtle">
            <div className="d-flex justify-content-center align-items-center flex-column h-100 w-100 p-4 text-center">
              <div className="bg-white border border-light-subtle shadow-sm rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center transition-all hover-scale" style={{ width: "100px", height: "100px" }}>
                <i className="fa-solid fa-paper-plane text-primary fs-1" />
              </div>
              <h5 className="fw-bold text-dark m-0 tracking-tight">Direct Messaging Workspace</h5>
              <p className="text-muted small m-0 mt-1 max-w-xs">Select a secure conversational channel from the roster list to initiate real-time streaming transmission</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Message;
