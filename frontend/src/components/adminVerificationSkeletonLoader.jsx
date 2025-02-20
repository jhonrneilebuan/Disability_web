import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="animate-pulse">
        {/* Title skeleton (centered) */}
        <div className="mb-4">
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        {/* Table skeleton */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                {[
                  "User ID",
                  "Full Name",
                  "Verification ID",
                  "Status",
                  "Actions",
                ].map((_, index) => (
                  <th key={index} className="py-3 px-4 border-b text-left">
                    <div className="h-7 bg-gray-200 rounded w-24 mx-auto"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50 transition">
                  {[...Array(5)].map((_, colIndex) => (
                    <td key={colIndex} className="py-3 px-4 border-b">
                      <div className="h-5 bg-gray-200 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
