import React from "react";

const OverLayLoader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 text-green-400 w-screen h-screen z-50 overflow-hidden bg-gray-800 opacity-80 flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-green-500 h-12 w-12 mb-4"></div>
      <h2 className="text-center  text-xl font-semibold">
        Loading...
      </h2>
      <p className="w-full text-center">
        This may take a few seconds, please don&apos;t close this page.
      </p>
    </div>
  );
};

export default OverLayLoader;
