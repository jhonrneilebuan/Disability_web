const JobPostSkeleton2 = ({ rows }) => {
    return Array.from({ length: rows }).map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-lg border-2 border-browny shadow-md p-4 animate-pulse"
      >
        <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
        <div className="flex flex-nowrap gap-4 mt-3">
          <div className="h-6 bg-gray-300 rounded w-16"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    ));
  };
  
  export default JobPostSkeleton2;
  