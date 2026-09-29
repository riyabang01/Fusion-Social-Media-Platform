import React, { useState, useEffect} from 'react';
import Avatar from '../Avatar';
import EditProfile from './EditProfile';
import FollowBtn from '../FollowBtn';
import Following from './Following';
import Followers from './Followers';
import ChangePassword from './ChangePassword';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const Info = ({id, auth, profile, dispatch}) => {
    const [userData, setUserData] = useState([]);
    const [onEdit, setOnEdit] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    useEffect(() => {
      if (!profile || !profile.users) return;

      if (id === auth?.user?._id) {
        const myData = profile.users.find(user => user && user._id === id);
        setUserData(myData ? [myData] : auth?.user ? [auth.user] : []);
      } else {
        const newData = profile.users.filter(user => user && user._id === id);
        setUserData(newData);
      }
    }, [id, auth?.user, profile]);

    useEffect(() => {
      if (showFollowers || showFollowing || onEdit) {
        dispatch({ type: GLOBALTYPES.MODAL, payload: true });
      } else {
        dispatch({ type: GLOBALTYPES.MODAL, payload: false });
      }
    }, [showFollowers, showFollowing, onEdit, dispatch]);

    if (!userData || userData.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center w-100 py-5">
                <div className="text-secondary fw-medium">Loading profile metrics...</div>
            </div>
        );
    }

    return (
      <div className="info_section p-2 bg-transparent border-0">
        {userData.map((user) => (
          user && (
            <div key={user._id} className="info_container row align-items-center g-4 text-start">
              <div className="col-12 col-md-4 d-flex justify-content-center">
                <div
                  className="border border-light-subtle rounded-circle p-1 bg-white shadow d-flex align-items-center justify-content-center overflow-hidden"
                  style={{ height: "160px", width: "160px" }}
                >
                  <Avatar src={user.avatar} size="supper-avatar" />
                </div>
              </div>

              <div className="col-12 col-md-8 info_content">
                <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                  <h3 className="fw-bold text-dark m-0 tracking-tight">{user.username}</h3>
                  <div className="d-flex gap-2">
                    {user._id === auth?.user?._id ? (
                      <>
                        <button
                          className="btn btn-sm btn-light border border-light-subtle rounded-3 text-secondary px-3 py-1.5 fw-semibold shadow-sm transition-all"
                          onClick={() => setOnEdit(true)}
                          style={{ fontSize: "0.85rem" }}
                        >
                          Edit Profile
                        </button>
                        <button
                          className="btn btn-sm btn-light border border-light-subtle rounded-3 text-secondary px-3 py-1.5 fw-semibold shadow-sm transition-all"
                          onClick={() => setChangePassword(true)}
                          style={{ fontSize: "0.85rem" }}
                        >
                          Change Password
                        </button>
                      </>
                    ) : (
                      <FollowBtn user={user} />
                    )}
                  </div>
                </div>

                <div className="d-flex align-items-center gap-4 my-3 text-dark border-top border-bottom py-2 border-light-subtle">
                  <span className="fw-semibold cursor-pointer text-slate-700 transition-all hover-opacity-75" onClick={() => setShowFollowers(true)} style={{ cursor: "pointer", fontSize: "0.9rem" }}>
                    <strong className="text-dark me-1">{user.followers?.length || 0}</strong> Followers
                  </span>
                  <span className="fw-semibold cursor-pointer text-slate-700 transition-all hover-opacity-75" onClick={() => setShowFollowing(true)} style={{ cursor: "pointer", fontSize: "0.9rem" }}>
                    <strong className="text-dark me-1">{user.following?.length || 0}</strong> Following
                  </span>
                </div>

                <div className="bio_metadata d-flex flex-column gap-1.5 mt-2">
                  <h6 className="m-0 fw-bold text-slate-800" style={{ fontSize: "0.95rem" }}>
                    {user.fullname} <span className="text-primary small fw-semibold ms-2">{user.mobile}</span>
                  </h6>
                  {user.address && <p className="m-0 text-secondary small"><i className="fas fa-map-marker-alt me-1.5 text-muted" />{user.address}</p>}
                  <small className="text-muted d-block">{user.email}</small>
                  
                  {user.website && (
                    <a
                      className="text-primary text-decoration-none small fw-medium mt-1 d-inline-flex align-items-center gap-1.5"
                      href={user.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fas fa-link text-muted" style={{ fontSize: "0.75rem" }} /> {user.website}
                    </a>
                  )}
                  {user.story && <p className="mt-2 text-slate-700 bg-light p-2.5 rounded-3 border-start border-primary border-3" style={{ fontSize: "0.88rem", lineHeight: "1.5" }}>{user.story}</p>}
                </div>
              </div>

              {onEdit && <EditProfile setOnEdit={setOnEdit} />}
              {changePassword && <ChangePassword setChangePassword={setChangePassword} />}

              {showFollowers && (
                <Followers
                  users={user.followers || []}
                  setShowFollowers={setShowFollowers}
                />
              )}
              {showFollowing && (
                <Following
                  users={user.following || []}
                  setShowFollowing={setShowFollowing}
                />
              )}
            </div>
          )
        ))}
      </div>
    );
}

export default Info;
