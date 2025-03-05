import { Bell } from "lucide-react";

const Avatar = ({ src, alt, fallback }) => {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-white font-bold">{fallback}</span>
      )}
    </div>
  );
};

const AvatarFallback = ({ children }) => <>{children}</>;

const AvatarImage = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-full h-full object-cover" />
);

const AdminHeader = () => {
  return (
    <header className="flex justify-end items-center p-4 bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-md">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/profile.jpg" alt="Admin Profile" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>

        <Bell className="w-6 h-6 cursor-pointer" />
      </div>
    </header>
  );
};

export default AdminHeader;
