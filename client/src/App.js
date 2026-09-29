import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import io from 'socket.io-client';

import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import AdminDashboard from "./pages/adminDashboard";
import Profile from "./pages/profile/[id]";

import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import StatusModal from "./components/StatusModal";
import SocketClient from "./SocketClient";

import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";
import { getNotifies } from "./redux/actions/notifyAction";
import { GLOBALTYPES } from "./redux/actions/globalTypes";

function App() {
  const { auth, status, modal, userType, socket: socketState } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loadingApp, setLoadingApp] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      if (localStorage.getItem('firstLogin')) {
        await dispatch(refreshToken());
      }
      setLoadingApp(false);
    };
    checkToken();
  }, [dispatch]);

  useEffect(() => {
    if (!auth.token) return;

    const socketUrl = window.location.hostname === "localhost" 
      ? "http://localhost:8080" 
      : "https://fusion-social-media-platform.onrender.com";

    const socket = io(socketUrl, { 
      transports: ['websocket'],
      secure: true
    });
    
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });

    return () => {
      socket.close();
      dispatch({ type: GLOBALTYPES.SOCKET, payload: null });
    };
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("Notifications not supported");
    } else if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, []);

  if (loadingApp) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Session...</span>
        </div>
      </div>
    );
  }

  return (
    <Router 
      future={{ 
        v7_startTransition: true, 
        v7_relativeSplatPath: true 
      }}
    >
      <Alert />
      <input type="checkbox" id="theme" style={{ display: 'none' }} />
      <div className={`App ${(status || modal) ? "mode" : ""}`}>
        <div className="main">
          {(userType === "user" || auth.user?.role === "user") && auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && socketState && <SocketClient />}

          <Routes>
            <Route 
              path="/" 
              element={
                !auth.token 
                  ? <Login /> 
                  : (userType === "admin" || auth.user?.role === "admin") 
                    ? <Navigate to="/admin" replace /> 
                    : <Home />
              } 
            />
            <Route path="/register" element={<Register />} />
            
            <Route element={<PrivateRouter />}>
              <Route path="/admin" element={(userType === "admin" || auth.user?.role === "admin") ? <AdminDashboard /> : <Navigate to="/" replace />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/:page" element={<PageRender />} />
              <Route path="/:page/:id" element={<PageRender />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
