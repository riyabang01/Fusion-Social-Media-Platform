import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import LoadIcon from "../../images/loading.gif";
import { getSuggestions } from "../../redux/actions/suggestionsAction";

const RightSideBar = () => {
    const auth = useSelector((state) => state.auth);
    const suggestions = useSelector((state) => state.suggestions);
    const dispatch = useDispatch();

    useEffect(() => {
      if (auth.token && (!suggestions?.users || suggestions?.users?.length === 0) && !suggestions?.loading) {
        dispatch(getSuggestions(auth.token));
      }
    }, [dispatch, auth.token, suggestions?.users, suggestions?.loading]);

    const isLoading = suggestions?.loading === true;
    const hasUsers = suggestions?.users && suggestions?.users?.length > 0;

    return (
      <div className="my-4 d-flex flex-column gap-4">
        <div className="p-3 bg-white border border-light-subtle rounded-4 shadow-sm">
          <UserCard user={auth.user} />
        </div>

        <div className="p-4 bg-white border border-light-subtle rounded-4 shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="m-0 fw-bold text-secondary text-uppercase tracking-wider small">
              Suggested Channels
            </h6>
            {!isLoading && (
              <button 
                type="button"
                className="btn btn-sm btn-light border border-light-subtle rounded-3 p-2 d-flex align-items-center justify-content-center transition-all"
                onClick={() => dispatch(getSuggestions(auth.token))}
                style={{ width: "32px", height: "32px" }}
              >
                <i className="fas fa-redo text-muted fs-6" />
              </button>
            )}
          </div>

          {isLoading && !hasUsers ? (
            <div className="d-flex justify-content-center my-4">
              <img
                src={LoadIcon}
                alt="Loading..."
                width="35"
              />
            </div>
          ) : (
            <div className="suggestions-list d-flex flex-column gap-2">
              {hasUsers ? (
                suggestions.users.map((user) => (
                  <div
                    key={user._id}
                    className="p-2 border border-light-subtle rounded-3 hover-bg-light transition-all"
                  >
                    <UserCard user={user}>
                      <FollowBtn user={user} />
                    </UserCard>
                  </div>
                ))
              ) : (
                <small className="text-muted text-center d-block py-2">No suggestions available</small>
              )}
            </div>
          )}
        </div>
      </div>
    );
}

export default RightSideBar;
