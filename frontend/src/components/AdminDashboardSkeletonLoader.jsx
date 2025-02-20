const AdminDashboardSkeletonLoader = () => {
    return (
      <div className="animate-pulse bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-lg shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-300 p-6 rounded-lg shadow-md h-24"></div>
          ))}
        </div>
  
        <div className="h-64 md:h-96 bg-gray-300 rounded-lg shadow-lg mb-8"></div>
        <div className="h-64 md:h-96 bg-gray-300 rounded-lg shadow-lg mb-8"></div>
  
        <div className="flex justify-between gap-8">
          <div className="flex-1 bg-gray-300 rounded-lg shadow-lg h-96"></div>
          <div className="flex-1 bg-gray-300 rounded-lg shadow-lg h-96"></div>
        </div>
      </div>
    );
  };
  
  export default AdminDashboardSkeletonLoader;
  