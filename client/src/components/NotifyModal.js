import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import moment from 'moment';
import { deleteAllNotifies, isReadNotify, NOTIFY_TYPES } from '../redux/actions/notifyAction';

const NotifyModal = () => {
    const auth = useSelector((state) => state.auth);
    const notify = useSelector((state) => state.notify);
    const dispatch = useDispatch();

    const handleIsRead = (msg) => {
      dispatch(isReadNotify({msg, auth}));
    };

    const handleDeleteAll = () => {
      const newArr = notify.data.filter(item => item.isRead === false)
      if(newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))

      if(window.confirm(`You have ${newArr.length} unread notifications. Do you want to delete all notifications?`)){
        return dispatch(deleteAllNotifies(auth.token))
      }
    };

    const handleSound = () => {
      dispatch({type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound });
    };

    return (
      <div
        className="notify_modal p-3 bg-white border border-light-subtle rounded-4 shadow-lg mt-2"
        style={{ minWidth: "320px", maxWidth: "360px" }}
      >
        <div className="d-flex justify-content-between align-items-center pb-2 mb-2 border-bottom border-light-subtle">
          <h6 className="m-0 fw-bold text-dark text-uppercase tracking-wider">Notifications</h6>
          <div className="d-flex align-items-center">
            {notify.sound ? (
              <i
                className="fas fa-bell text-primary fs-5"
                style={{ cursor: "pointer" }}
                onClick={handleSound}
              />
            ) : (
              <i
                className="fas fa-bell-slash text-secondary fs-5"
                style={{ cursor: "pointer" }}
                onClick={handleSound}
              />
            )}
          </div>
        </div>

        {notify.data.length === 0 && (
          <div className="text-center py-4 text-muted small">
            <i className="far fa-bell-slash d-block fs-3 mb-2 opacity-50"></i>
            No new notifications
          </div>
        )}

        <div className="d-flex flex-column gap-2" style={{ maxHeight: "380px", overflowY: "auto" }}>
          {notify.data.map((msg, index) => (
            <div className={`p-2 rounded-3 border border-transparent transition-all ${!msg.isRead ? 'bg-light-subtle border-light-subtle shadow-sm' : ''}`} key={index}>
              <Link
                to={`${msg.url}`}
                className="d-flex text-dark align-items-start text-decoration-none gap-2"
                onClick={() => handleIsRead(msg)}
              >
                <div className="flex-shrink-0 mt-0.5 border border-light rounded-circle bg-white shadow-sm p-0.5 d-flex align-items-center justify-content-center">
                  <Avatar src={msg.user.avatar} size="big-avatar" />
                </div>

                <div className="flex-grow-1 text-start overflow-hidden">
                  <div className="small text-dark" style={{ lineHeight: "1.4" }}>
                    <strong className="me-1 text-slate-800">{msg.user.username}</strong>
                    <span className="text-secondary">{msg.text}</span>
                  </div>
                  {msg.content && (
                    <small className="d-block text-muted text-truncate mt-0.5 bg-light px-1.5 py-0.5 rounded" style={{ fontSize: "0.78rem" }}>
                      {msg.content.slice(0, 24)}...
                    </small>
                  )}
                  <small className="text-muted d-flex align-items-center gap-1.5 mt-1" style={{ fontSize: "0.75rem" }}>
                    {moment(msg.createdAt).fromNow()}
                  </small>
                </div>

                {msg.image && (
                  <div className="flex-shrink-0 border rounded overflow-hidden shadow-inner bg-light" style={{ width: "36px", height: "36px" }}>
                    <img src={msg.image} alt="Notification Asset" className="w-100 h-100" style={{ objectFit: "cover" }} />
                  </div>
                )}
                
                {!msg.isRead && (
                  <div className="flex-shrink-0 ms-1 align-self-center">
                    <i className="fas fa-circle text-primary" style={{ fontSize: "0.55rem" }} />
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>

        {notify.data.length > 0 && (
          <div className="border-top border-light-subtle pt-2 mt-2 d-flex justify-content-end">
            <button 
              type="button" 
              className="btn btn-link btn-sm text-danger text-decoration-none fw-semibold p-0 fs-7 text-uppercase tracking-wider"
              onClick={handleDeleteAll}
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    );
}

export default NotifyModal;
