import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      {/* Loader Text */}
      <p className="mt-4 text-blue-600 text-lg font-semibold">Loading...</p>
    </div>
  );
};

export default Loader;
