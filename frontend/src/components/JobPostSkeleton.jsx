const JobPostSkeleton = ({ rows }) => {
  return Array.from({ length: rows }).map((_, index) => (
    <div
      key={index}
      className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 animate-pulse"
    >
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-1"></div>
      <div className="h-4 bg-gray-300 rounded w-2/4 mb-2"></div>
      <div className="h-5 bg-gray-300 rounded w-full mb-6"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 mt-10"></div>
    </div>
  ));
};

export default JobPostSkeleton;
