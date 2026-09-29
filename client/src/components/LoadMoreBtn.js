import React from 'react'

const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {
  return (
    <>
      {result < 9 * (page - 1)
        ? ""
        : !load && (
            <button
              type="button"
              className="btn btn-sm btn-light border border-light-subtle text-secondary px-4 py-2 rounded-pill fw-semibold shadow-sm mx-auto d-block my-4 transition-all"
              onClick={handleLoadMore}
              style={{ fontSize: "0.85rem", trackingSpacing: "0.02em" }}
            >
              Load More Content
            </button>
          )}
    </>
  );
};

export default LoadMoreBtn;
