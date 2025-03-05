const AdminListSkeletonLoader = () => {
  return (
    <div className="p-6 bg--100 min-h-screen">
      <div className="animate-pulse">
        <div className="mb-4">
          <div className="h-6 bg-gray-300 rounded w-1/5"></div>
        </div>

        <div className="mb-10 flex space-x-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/6"></div>
        </div>

        {/* Table skeleton */}
        <div className="bg-white p-4 shadow rounded-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-center">
                {["Full Name", "Email", "Banned", "Actions"].map((_, index) => (
                  <th key={index} className="p-2 border">
                    <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[...Array(4)].map((_, colIndex) => (
                    <td key={colIndex} className="p-2 border">
                      <div className="h-6 bg-gray-300 rounded"></div>
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

export default AdminListSkeletonLoader;
