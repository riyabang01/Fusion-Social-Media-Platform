import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Info from '../../components/profile/Info';
import Posts from '../../components/profile/Posts';
import { useSelector, useDispatch } from "react-redux";
import LoadIcon  from "../../images/loading.gif";
import { getProfileUsers } from "../../redux/actions/profileAction";
import Saved from '../../components/profile/Saved';

const Profile = () => {
  const { profile, auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [saveTab, setSaveTab] = useState(false);

  useEffect(() => {
    if(profile.ids.every(item => item !== id )){
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [id, auth, dispatch, profile.ids]);

  if (profile.loading) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: "80vh" }}>
        <img src={LoadIcon} alt="Loading" width="45" />
      </div>
    );
  }

  return (
    <div className="profile_page container-fluid py-4 px-3 px-md-4">
      <div className="card bg-white border border-light-subtle rounded-4 shadow-sm p-3 p-md-4 mb-4">
        <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      </div>

      {auth?.user?._id === id && (
        <div className="profile_tab d-flex justify-content-center bg-white border border-light-subtle rounded-4 p-2 mb-4 shadow-sm">
          <div className="nav nav-pills gap-2 w-100 max-w-xs">
            <button
              className={`nav-link flex-fill text-capitalize fw-semibold rounded-3 py-2 ${!saveTab ? "active bg-primary text-white" : "bg-transparent text-secondary"}`}
              onClick={() => setSaveTab(false)}
              style={{ fontSize: "0.9rem", transition: "all 0.2s ease" }}
            >
              <i className="fas fa-th me-2"></i> Posts
            </button>
            <button
              className={`nav-link flex-fill text-capitalize fw-semibold rounded-3 py-2 ${saveTab ? "active bg-primary text-white" : "bg-transparent text-secondary"}`}
              onClick={() => setSaveTab(true)}
              style={{ fontSize: "0.9rem", transition: "all 0.2s ease" }}
            >
              <i className="far fa-bookmark me-2"></i> Saved
            </button>
          </div>
        </div>
      )}

      <div className="profile_content_container bg-transparent border-0">
        {saveTab ? (
          <Saved auth={auth} dispatch={dispatch} />
        ) : (
          <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
        )}
      </div>
    </div>
  );
}

export default Profile;
