const AppliedJobSkeleton = ({ rows = 5 }) => {
    return (
      <div className="space-y-6">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between mb-6 border-2 border-browny border-solid w-full overflow-auto animate-pulse"
          >
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="flex items-center space-x-2">
                <div className="h-5 bg-gray-300 rounded w-1/4"></div>
                <div className="h-5 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <div className="h-10 bg-gray-300 rounded w-24"></div>
              <div className="h-10 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default AppliedJobSkeleton;