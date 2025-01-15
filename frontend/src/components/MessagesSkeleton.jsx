const MessagesSkeleton = () => {
    const skeletonMessages = Array(4).fill(null); 
  
    return (
      <div className="flex flex-col space-y-6 p-4">
        {skeletonMessages.map((_, index) => (
          <div
            key={index}
            className={`flex ${index % 2 === 0 ? "items-start" : "justify-end items-start"} space-x-3`}
          >
            {index % 2 === 0 ? (
              <>
                <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="flex flex-col space-y-2">
                  <div className="w-20 h-4 bg-gray-300 rounded-lg animate-pulse"></div> 
                  <div className="w-64 h-16 bg-gray-300 rounded-lg animate-pulse"></div> 
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col space-y-2 text-right ">
                  <div className="w-20 h-4 bg-gray-300 rounded-lg animate-pulse self-end"></div> 
                  <div className="w-64 h-16 bg-gray-300 rounded-lg animate-pulse"></div> 
                </div>
                <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default MessagesSkeleton;
  