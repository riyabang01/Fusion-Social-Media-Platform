import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfileUser } from "../../redux/actions/profileAction";
import { checkImage } from "../../utils/imageUpload";

const EditProfile = ({ setOnEdit }) => {
  const initialState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, mobile, address, website, story, gender } = userData;
  const [avatar, SetAvatar] = useState("");
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err) {
      return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    }
    SetAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = e => {
      e.preventDefault();
      dispatch(updateProfileUser( {userData, avatar, auth} ) );
  };

  return (
    <div className="edit_profile_modal d-flex align-items-center justify-content-center position-fixed top-0 start-0 w-100 h-100" style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", zIndex: 99999 }}>
      <div className="bg-white rounded-4 shadow-lg border border-light-subtle p-4 position-relative w-100 overflow-hidden" style={{ maxWidth: "500px", maxHeight: "90vh" }}>
        
        <div className="edit_profile_header d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
          <h6 className="m-0 fw-bold text-dark text-uppercase tracking-wider small">Account Configurations</h6>
          <span 
            className="fs-4 text-secondary cursor-pointer close_btn_layer" 
            onClick={() => setOnEdit(false)}
            style={{ cursor: "pointer", userSelect: "none", lineHeight: "1" }}
          >
            &times;
          </span>
        </div>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 overflow-y-auto px-1" style={{ maxHeight: "calc(90vh - 100px)" }}>
          <div className="d-flex justify-content-center my-2">
            <div className="info_avatar position-relative border border-light-subtle rounded-circle p-1 bg-white shadow-sm overflow-hidden" style={{ width: "120px", height: "120px" }}>
              <img
                alt="Profile Viewport"
                src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                style={{ filter: theme ? "invert(1)" : "invert(0)", objectFit: "cover" }}
                className="w-100 h-100 rounded-circle"
              />
              <span className="position-absolute start-0 top-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center opacity-0 hover-opacity-100 transition-all text-white bg-dark bg-opacity-60 text-center" style={{ cursor: "pointer" }}>
                <i className="fas fa-camera mb-1" />
                <p className="m-0 small fw-medium">Modify</p>
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  accept="image/*"
                  onChange={changeAvatar}
                  style={{ position: "absolute", left: 0, top: 0, opacity: 0, width: "100%", height: "100%", cursor: "pointer" }}
                />
              </span>
            </div>
          </div>

          <div className="form-group text-start">
            <label htmlFor="fullname" className="form-label small fw-semibold text-secondary mb-1">Full Name</label>
            <div className="position-relative">
              <input
                type="text"
                className="form-control form-control-sm rounded-3 pr-5"
                id="fullname"
                name="fullname"
                value={fullname}
                onChange={handleInput}
              />
              <small
                className="text-muted position-absolute end-0 top-50 translate-middle-y me-2"
                style={{ fontSize: "0.75rem" }}
              >
                {fullname.length}/25
              </small>
            </div>
          </div>

          <div className="form-group text-start">
            <label htmlFor="mobile" className="form-label small fw-semibold text-secondary mb-1">Mobile Contact</label>
            <input
              type="text"
              className="form-control form-control-sm rounded-3"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={handleInput}
            />
          </div>

          <div className="form-group text-start">
            <label htmlFor="address" className="form-label small fw-semibold text-secondary mb-1">Location Address</label>
            <input
              type="text"
              className="form-control form-control-sm rounded-3"
              id="address"
              name="address"
              value={address}
              onChange={handleInput}
            />
          </div>

          <div className="form-group text-start">
            <label htmlFor="website" className="form-label small fw-semibold text-secondary mb-1">Website URL</label>
            <input
              type="text"
              className="form-control form-control-sm rounded-3"
              id="website"
              name="website"
              value={website}
              onChange={handleInput}
            />
          </div>

          <div className="form-group text-start">
            <label htmlFor="story" className="form-label small fw-semibold text-secondary mb-1">Biography Story</label>
            <textarea
              rows="3"
              className="form-control form-control-sm rounded-3"
              id="story"
              name="story"
              value={story}
              onChange={handleInput}
              style={{ resize: "none" }}
            />
            <small className="text-muted d-block text-end mt-1" style={{ fontSize: "0.75rem" }}>
              {story.length}/200
            </small>
          </div>

          <div className="form-group text-start mb-2">
            <label htmlFor="gender" className="form-label small fw-semibold text-secondary mb-1">Gender Identification</label>
            <select
              className="form-select form-select-sm text-capitalize rounded-3"
              name="gender"
              id="gender"
              onChange={handleInput}
              value={gender}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button className="btn btn-sm btn-primary w-100 py-2 rounded-pill fw-semibold shadow-sm text-uppercase tracking-wider fs-7 mt-2" type="submit">
            Apply Configuration Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
