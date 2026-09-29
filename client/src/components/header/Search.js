import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";
import LoadIcon from "../../images/loading.gif";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      setLoad(true);
      const res = await getDataAPI(`user/search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      setLoad(false);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response?.data?.msg || err.message },
      });
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <form className="d-flex position-relative align-items-center w-100 max-w-md mx-auto search_form" onSubmit={handleSearch}>
      <div className="position-relative w-100 d-flex align-items-center bg-light border border-light-subtle rounded-pill px-3 py-1.5 shadow-sm">
        <i className="fas fa-search text-muted me-2 small" />
        <input
          type="text"
          className="form-control form-control-sm border-0 bg-transparent p-0 flex-fill outline-none text-dark"
          placeholder="Search creators or channels..."
          title="Press Enter to Search"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value.toLowerCase().replace(/ /g, " "))
          }
          style={{ boxShadow: "none" }}
        />

        {search && !load && (
          <button
            type="button"
            className="btn p-0 border-0 bg-transparent text-secondary fs-5 ms-2 d-flex align-items-center justify-content-center"
            onClick={handleClose}
            style={{ outline: "none", lineHeight: "1" }}
          >
            &times;
          </button>
        )}

        {load && (
          <div className="ms-2 d-flex align-items-center justify-content-center">
            <img
              src={LoadIcon}
              alt="Loading"
              width="18"
              height="18"
            />
          </div>
        )}
      </div>

      <button type="submit" className="d-none">Search</button>

      {users.length > 0 && (
        <div 
          className="dropdown-menu show w-100 mt-2 p-2 shadow-lg border border-light-subtle rounded-4 overflow-y-auto text-start bg-white"
          style={{ position: "absolute", top: "100%", left: 0, zIndex: 1050, maxHeight: "320px" }}
        >
          <div className="px-2 py-1 mb-1 border-bottom border-light-subtle">
            <small className="text-muted text-uppercase tracking-wider fw-bold style-heading" style={{ fontSize: "0.72rem" }}>
              Search Results ({users.length})
            </small>
          </div>
          <div className="d-flex flex-column gap-1">
            {users.map((user) => (
              <div key={user._id} className="rounded-3 hover-bg-light transition-all p-0.5">
                <UserCard
                  user={user}
                  border="border-0"
                  handleClose={handleClose}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
};

export default Search;
