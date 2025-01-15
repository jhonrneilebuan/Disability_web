
const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 ">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
          <div className="w-40 h-40 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center animate-waving-hand">
              <img 
                src="/chat.png" 
                alt="Message Icon" 
                className="w-36 h-36 object-contain" 
              />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold font-poppins">Let&apos;s Connect!</h2>
        <p className="text-base-content/60 font-poppins">
          Select a conversation from the sidebar to start messaging. Whether
          you&apos;re a job seeker or an employer, we&apos;re here to help you get
          started!
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
