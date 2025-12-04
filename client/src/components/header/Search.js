import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";
import LoadIcon from "../../images/loading.gif";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <form className="d-flex position-relative search_form" onSubmit={handleSearch}>
      
      <input
        type="text"
        className="form-control form-control-sm me-2"
        placeholder="Search users..."
        title="Enter to Search"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, " "))
        }
      />

      {/* Clear button */}
      {search && (
        <button
          type="button"
          className="btn btn-sm btn-outline-light ms-1"
          onClick={handleClose}
        >
          ×
        </button>
      )}

      {/* Hidden submit button */}
      <button type="submit" className="btn btn-sm btn-light d-none">
        Search
      </button>

      {/* Loading */}
      {load && (
        <img
          src={LoadIcon}
          alt="Loading"
          width="25"
          height="25"
          className="position-absolute top-50 end-0 translate-middle-y me-2"
        />
      )}

      {/* Search Results Dropdown */}
      {users.length > 0 && (
        <div className="dropdown-menu show w-100 mt-2 p-2 users_result">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              border="border"
              handleClose={handleClose}
            />
          ))}
        </div>
      )}
    </form>
  );
};

export default Search;
