import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full w-full p-10">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 bg-orange-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loader;
