import { Hand } from "lucide-react";

const Loader2 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-waving-hand opacity-100 transform translate-y-0 duration-300">
        <Hand size={96} className="text-gray-700" />
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
        <p className="text-sm text-gray-500">We&apos;re preparing your content.</p>
      </div>
    </div>
  );
};

export default Loader2;
