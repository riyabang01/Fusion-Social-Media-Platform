import React from 'react';

export const imageShow = (src, theme) => {
  return (
    <img
      src={src}
      className="img-fluid rounded-3 shadow-sm"
      alt="Preview Asset"
      style={{ 
        filter: theme ? "invert(1)" : "invert(0)",
        objectFit: "cover",
        maxHeight: "160px",
        width: "100%"
      }}
    />
  );
};

export const videoShow = (src, theme) => {
  return (
    <video
      controls
      src={src}
      className="img-fluid rounded-3 shadow-sm bg-black"
      style={{ 
        filter: theme ? "invert(1)" : "invert(0)",
        maxHeight: "160px",
        width: "100%",
        objectFit: "contain"
      }}
    />
  );
};
