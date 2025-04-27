import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md border border-gray-200">
        
     
        <img 
          src="/imgs/notFound.jpg"  
          alt="404 - Page Not Found" 
          className="mx-auto mb-6 w-32 h-32 object-cover rounded-full"
        />
        
     
        <h1 className="text-6xl font-extrabold text-red-600">404</h1>
        <p className="text-xl font-medium text-gray-600 mt-4">Page Not Found</p>
        <p className="text-sm text-gray-500 mt-2">The page you're looking for doesn't exist or has been moved.</p>
        
     
        <div className="mt-6">
          <a
            href="/"
            className="inline-block px-6 py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-400 transition"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
