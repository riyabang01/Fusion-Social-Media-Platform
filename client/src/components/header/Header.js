import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import Search from "./Search";
import { getPosts } from '../../redux/actions/postAction';
import { getSuggestions } from '../../redux/actions/suggestionsAction';

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleRefreshHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
    }
  };

  return (
    <div 
      className="header sticky-top w-100 bg-white border-bottom border-light-subtle shadow-sm py-2"
      style={{ 
        zIndex: 1040, 
        backdropFilter: "blur(8px)", 
        background: theme ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 255, 255, 0.95)" 
      }}
    >
      <nav className="navbar navbar-expand-lg p-0 bg-transparent">
        <div className="container px-3 px-md-4 d-flex align-items-center justify-content-between gap-3 w-100">
          <div className="flex-shrink-0">
            <Link to="/" className="logo text-decoration-none d-flex align-items-center" onClick={handleRefreshHome}>
              <h4 
                className="m-0 fw-black text-primary tracking-wider text-uppercase" 
                style={{ 
                  letterSpacing: "0.08em",
                  background: "linear-gradient(45deg, #0d6efd, #0dcaf0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                FUSION
              </h4>
            </Link>
          </div>

          <div className="flex-grow-1 max-w-md d-none d-sm-block">
            <Search />
          </div>

          <div className="flex-shrink-0">
            <Menu />
          </div>
        </div>
      </nav>
      
      <div className="container d-block d-sm-none px-3 mt-2">
        <Search />
      </div>
    </div>
  );
};

export default Header;
