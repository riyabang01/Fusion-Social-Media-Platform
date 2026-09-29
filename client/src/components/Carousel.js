import React from "react";
import { useSelector } from "react-redux";

const Carousel = ({ images, id }) => {
  const { theme } = useSelector(state => state);
  const isActive = index => index === 0 ? "active" : "";

 
  const CAROUSEL_STYLE = {
    width: "100%",
    maxWidth: "500px", 
    margin: "0 auto"
  };

  const MEDIA_STYLE = {
    filter: theme ? "invert(1)" : "invert(0)",
    objectFit: "contain",
    maxHeight: "400px", 
    width: "100%",      
    height: "auto"
  };

  return (
    <div id={`image${id}`} className="carousel slide" data-bs-ride="false" style={CAROUSEL_STYLE}>
      <div className="carousel-indicators">
        {images.map((img, index) => (
          <button 
            key={index} 
            type="button" 
            data-bs-target={`#image${id}`} 
            data-bs-slide-to={index} 
            className={isActive(index)} 
            aria-current={index === 0 ? "true" : "false"} 
          />
        ))}
      </div>
      
      <div className="carousel-inner bg-transparent rounded-3" style={{ height: "400px", width: "100%" }}>
        {images.map((img, index) => (
          <div key={index} className={`carousel-item h-100 ${isActive(index)}`}>
            <div className="d-flex align-items-center justify-content-center bg-transparent w-100 h-100">
              {img.url.match(/video/i) ? (
                <video 
                  controls 
                  style={MEDIA_STYLE} 
                  src={img.url} 
                  className="d-block" 
                  alt={img.url} 
                />
              ) : (
                <img 
                  style={MEDIA_STYLE} 
                  src={img.url} 
                  className="d-block" 
                  alt={img.url} 
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button className="carousel-control-prev" type="button" data-bs-target={`#image${id}`} data-bs-slide="prev" style={{ width: "8%" }}>
            <span className="carousel-control-prev-icon bg-dark rounded-circle p-2" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target={`#image${id}`} data-bs-slide="next" style={{ width: "8%" }}>
            <span className="carousel-control-next-icon bg-dark rounded-circle p-2" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
