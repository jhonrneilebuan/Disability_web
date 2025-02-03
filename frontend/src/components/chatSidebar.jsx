import { useEffect, useState } from "react";
import { chatStore } from "../stores/chatStore";
import SideBarSkeleton from "./SidebarSkeleton";
import { Menu, Video } from "lucide-react";
import { authStore } from "../stores/authStore";

const ChatSidebar = () => {
  const { getUsersForSidebar, users, selectedUser, setSelectedUser, isUserLoading, startPolling, stopPolling } = chatStore();
  const { onlineUsers, user } = authStore();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); 
  const isEmployer = user.role === 'Employer';


  useEffect(() => {
    getUsersForSidebar();
    startPolling(); 

    return () => {
      stopPolling(); 
    };
  }, [getUsersForSidebar, startPolling, stopPolling]);

  if (isUserLoading) return <SideBarSkeleton />;

  const handleCreateRoom = () => {
    window.open("/videoRoom", "_blank", "width=800,height=600,resizable=yes,scrollbars=yes");
  };

  


  return (
    <aside
      className={`h-full transition-all duration-200 ${
        isSidebarCollapsed ? "w-20" : "w-72"
      } border-r border-base-300 flex flex-col`}
    >
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Menu
            className="size-6 cursor-pointer"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
          />
          <span
            className={`font-medium ${isSidebarCollapsed ? "hidden" : "block"}`}
          >
            Messages
          </span>
        </div>
        {!isSidebarCollapsed && isEmployer && (
         <button className="bg-blue-600 text-white py-2 px-4 mt-2 rounded-md flex items-center" onClick={handleCreateRoom}>
         <Video size={18} className="mr-2" /> Create Room
       </button>
        )}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
              selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePicture || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {!isSidebarCollapsed && (
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            )}
          </button>
        ))}

        {users.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
