import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import NotifyModal from "../NotifyModal";
import HomeIcon from '@material-ui/icons/Home';
import NearMeIcon from '@material-ui/icons/NearMe';
import ExploreIcon from '@material-ui/icons/Explore';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Menu = () => {
  const { auth, theme, notify } = useSelector((state) => state);
  
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Home", icon: <HomeIcon style={{ color: theme ? "#ffffff" : "#1e293b" }} />, path: "/" },
    { label: "Message", icon: <NearMeIcon style={{ color: theme ? "#ffffff" : "#1e293b" }} />, path: "/message" },
    { label: "Discover", icon: <ExploreIcon style={{ color: theme ? "#ffffff" : "#1e293b" }} />, path: "/discover" },
  ];

  const isActive = (pn) => {
    return pn === pathname ? "active bg-primary bg-opacity-10 rounded-pill fw-semibold" : "";
  };

  const handleThemeChange = () => {
    const nextTheme = !theme;
    dispatch({ type: GLOBALTYPES.THEME, payload: nextTheme });
    if (nextTheme) {
      document.body.classList.add("dark-theme-active");
      document.body.style.backgroundColor = "#0f172a";
      document.body.style.color = "#ffffff";
    } else {
      document.body.classList.remove("dark-theme-active");
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
    }
  };

  const hasUnread = notify?.data && notify.data.filter(item => !item.isRead).length > 0;
  const unreadCount = notify?.data ? notify.data.filter(item => !item.isRead).length : 0;

  return (
    <div className="menu_navigation_panel">
      <ul className="navbar-nav d-flex flex-row align-items-center mb-0 gap-3">
        {navLinks.map((link, index) => (
          <li className={`nav-item ${isActive(link.path)} transition-all`} key={index}>
            <Link className="nav-link d-flex align-items-center justify-content-center p-2.5" to={link.path} title={link.label}>
              {link.icon}
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown">
          <span
            className="nav-link position-relative d-flex align-items-center justify-content-center p-2.5 transition-all hover-scale"
            id="navbarDropdownNotify"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            <NotificationsIcon 
              style={{ color: hasUnread ? "#0d6efd" : (theme ? "#ffffff" : "#64748b") }} 
            />
            {unreadCount > 0 && (
              <span 
                className="position-absolute translate-middle badge rounded-circle bg-danger d-flex align-items-center justify-content-center fw-bold shadow-sm"
                style={{ top: "8px", left: "28px", fontSize: "0.68rem", minWidth: "16px", height: "16px", padding: "2px" }}
              >
                {unreadCount}
              </span>
            )}
          </span>

          <div 
            className="dropdown-menu dropdown-menu-end shadow-lg border border-light-subtle rounded-4 p-0 mt-2 overflow-hidden bg-white animation-fade-in" 
            aria-labelledby="navbarDropdownNotify"
            style={{ zIndex: 1060 }}
          >
            <NotifyModal />
          </div>
        </li>

        <li className="nav-item dropdown">
          <span
            className="nav-link dropdown-toggle d-flex align-items-center p-0.5 border border-light-subtle rounded-circle bg-white shadow-sm transition-all hover-scale"
            id="navbarDropdownUser"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            <Avatar src={auth?.user?.avatar} size="medium-avatar" />
          </span>
          
          <ul 
            className="dropdown-menu dropdown-menu-end shadow-lg border border-light-subtle rounded-4 bg-white mt-2 py-2 text-start" 
            aria-labelledby="navbarDropdownUser"
            style={{ minWidth: "190px", zIndex: 1060 }}
          >
            <li>
              <Link
                className="dropdown-item py-2.5 px-3 fw-semibold text-secondary d-flex align-items-center gap-2.5 hover-bg-light transition-all"
                to={`/profile/${auth?.user?._id}`}
              >
                <AccountCircleIcon style={{ fontSize: "20px", color: "#64748b" }} />
                <span style={{ fontSize: "0.88rem" }}>View Profile</span>
              </Link>
            </li>
            
            <li>
              <div
                className="dropdown-item py-2.5 px-3 fw-semibold text-secondary mb-0 d-flex align-items-center gap-2.5 hover-bg-light transition-all cursor-pointer"
                style={{ cursor: "pointer", userSelect: "none" }}
                onClick={handleThemeChange}
              >
                {theme ? (
                  <Brightness7Icon style={{ fontSize: "20px", color: "#ffb703" }} />
                ) : (
                  <Brightness4Icon style={{ fontSize: "20px", color: "#64748b" }} />
                )}
                <span style={{ fontSize: "0.88rem" }}>{theme ? "Light Display" : "Dark Display"}</span>
              </div>
            </li>
            
            <li>
              <hr className="dropdown-divider my-1.5 border-light-subtle" />
            </li>
            
            <li>
              <Link
                className="dropdown-item py-2.5 px-3 fw-bold text-danger d-flex align-items-center gap-2.5 hover-bg-danger-subtle transition-all"
                to="/"
                onClick={() => dispatch(logout())}
              >
                <ExitToAppIcon style={{ fontSize: "20px", color: "#dc3545" }} />
                <span style={{ fontSize: "0.88rem" }}>Logout</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
