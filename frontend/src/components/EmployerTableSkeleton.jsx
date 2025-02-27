const EmployerTableSkeleton = ({ rows = 5 }) => {
  return Array.from({ length: rows }).map((_, index) => (
    <tr key={index} className="border-b border-gray-300 animate-pulse">
      <td className="px-4 py-2 text-sm text-gray-700 text-center font-poppins">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
      </td>
      <td className="px-4 py-2 text-sm text-gray-700 text-center font-poppins">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </td>
      <td className="px-4 py-2 text-sm text-gray-700 text-center font-poppins">
        <div className="h-6 bg-gray-200 rounded-full w-16 mx-auto"></div>
      </td>
      <td className="px-4 py-2 text-sm text-gray-700 text-center font-poppins">
        <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
      </td>
      <td className="px-4 py-2 text-sm">
        <div className="flex justify-center space-x-3">
          <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
          <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </td>
    </tr>
  ));
};

export default EmployerTableSkeleton;
