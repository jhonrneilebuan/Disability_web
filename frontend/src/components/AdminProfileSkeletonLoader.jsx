import React from "react";

const AdminProfileSkeletonLoader = () => {
  return (
    <main className="flex items-center justify-center h-[80vh] bg-white p-6 animate-pulse">
      <div className="flex flex-col w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden pb-10">
        {/* Cover Photo Skeleton */}
        <div className="relative h-64 bg-gray-300"></div>
        {/* Profile Section Skeleton */}
        <div className="flex flex-col items-center -mt-16">
          {/* Profile Picture Skeleton */}
          <div className="relative w-32 h-32 bg-gray-300 rounded-full border-4 border-white shadow-lg"></div>
          {/* Text Skeletons for Name, Email, Contact */}
          <div className="mt-4 text-center space-y-2 w-full max-w-sm">
            <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
          {/* Button Skeleton */}
          <div className="mt-4">
            <div className="h-10 bg-gray-300 rounded-lg w-40 mx-auto"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminProfileSkeletonLoader;
