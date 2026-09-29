import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "../components/NotFound";

const generatePage = (pageName) => {
  try {
    const component = require(`../pages/${pageName}`).default;
    return React.createElement(component);
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  const { auth } = useSelector((state) => state);

  if (!auth.token) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100 py-5" style={{ minHeight: "50vh" }}>
        <div className="text-secondary fw-medium">Verifying authentication...</div>
      </div>
    );
  }

  let pageName = id ? `${page}/[id]` : `${page}`;

  return generatePage(pageName);
};

export default PageRender;
