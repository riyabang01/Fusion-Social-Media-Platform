import React from 'react'
import Avatar from '../Avatar';
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Status = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
      <div className="status my-4 p-4 bg-white border border-light-subtle rounded-4 d-flex flex-column gap-3 shadow-sm hover-in-shadow">
        <div className="d-flex align-items-center gap-3 w-100">
          <div className="d-flex align-items-center justify-content-center flex-shrink-0">
            <Avatar src={auth?.user?.avatar} size="big-avatar" />
          </div>
          
          <button
            onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
            className="statusBtn btn btn-light border text-start flex-fill text-secondary py-2.5 px-4 rounded-pill transition-all fs-6"
          >
            <span>
              {auth?.user?.username || 'Creator'}, draft or schedule a cross-platform post...
            </span>
          </button>
        </div>

        <div className="d-flex align-items-center justify-content-between border-top pt-3 border-light-subtle small text-muted">
          <div className="d-flex align-items-center gap-3">
            <span className="d-flex align-items-center gap-1"><i className="fas fa-image text-success"></i> Media</span>
            <span className="d-flex align-items-center gap-1"><i className="fas fa-video text-danger"></i> Video</span>
            <span className="d-flex align-items-center gap-1"><i className="fas fa-calendar-alt text-primary"></i> Scheduler</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <i className="fab fa-instagram text-danger opacity-75"></i>
            <i className="fab fa-x-twitter text-dark opacity-75"></i>
            <i className="fab fa-linkedin text-primary opacity-75"></i>
          </div>
        </div>
      </div>
    );
}

export default Status;
