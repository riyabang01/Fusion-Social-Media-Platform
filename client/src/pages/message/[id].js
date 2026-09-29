import React from "react";
import LeftSide from "../../components/message/LeftSide";
import RightSide from "../../components/message/RightSide";

const Conversation = () => {
  return (
    <div className="conversation_page container-fluid py-4 px-3 px-md-4">
      <div className="card border border-light-subtle rounded-4 shadow-sm bg-white overflow-hidden w-100 d-flex flex-row" style={{ height: "calc(100vh - 140px)" }}>
        <div className="col-12 col-md-5 col-lg-4 px-0 bg-white border-end border-light-subtle h-100 overflow-y-auto">
          <LeftSide />
        </div>

        <div className="d-none d-md-block col-md-7 col-lg-8 px-0 h-100 bg-light-subtle">
          <RightSide /> 
        </div>
      </div>
    </div>
  );
};

export default Conversation;
