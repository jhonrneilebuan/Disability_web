import { chatStore } from "../stores/chatStore";
import ChatContainer from "../components/chatContainer";
import NoChatSelected from "../components/NoChatSelected";
import ChatSidebar from "../components/chatSidebar";
import Navbar from "../components/Navbar";
import NavbarEmployer from "../components/NavbarEmployer";
import { authStore } from "../stores/authStore";
const HomePage = () => {
  const { selectedUser } = chatStore();
  const { user } = authStore();

  return (
    <div> 
      {user.role === "Applicant" ? <Navbar /> : <NavbarEmployer /> }
      <div className="flex items-stretch justify-center h-[89vh] overflow-hidden"> 
        <div className="bg-white shadow-cl w-full ">
          <div className="flex h-full rounded-lg overflow-hidden">
            <ChatSidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
