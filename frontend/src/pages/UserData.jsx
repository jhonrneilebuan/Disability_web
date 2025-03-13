import {
  Accessibility,
  Award,
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  Layers,
  Loader,
  Mail,
  Send,
  Undo2,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { chatStore } from "../stores/chatStore";
import { userStore } from "../stores/userStore";

const UserData = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bio");
  const { fetchUserData, profileData, isLoading, error } = userStore();
  const { setSelectedUser } = chatStore();

  const tabs = ["bio", "career Info", "Accessibility Info"];

  useEffect(() => {
    fetchUserData(userId);
  }, [userId, fetchUserData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const profilePicture = profileData?.profilePicture || "/avatar.png";
  const fullName = profileData?.fullName || "Unknown User";
  const bio = profileData?.bio || "No bio available.";

  const handleTabNavigation = (direction) => {
    const currentIndex = tabs.indexOf(activeTab);
    const newIndex =
      direction === "left"
        ? Math.max(0, currentIndex - 1)
        : Math.min(tabs.length - 1, currentIndex + 1);
    setActiveTab(tabs[newIndex]);
  };

  const handleMessageClick = () => {
    setSelectedUser(profileData);
    navigate("/messaging");
  };

  return (
    <div className="flex flex-col h-screen font-poppins">
      <div className="flex flex-1 h-[90vh]">
        <Sidebar />
        <div className="flex-1 p-8 bg-gray-50">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-black py-4 px-4"
          >
            <Undo2 className="w-5 h-5 mr-2" />
            Go Back
          </button>
          {error && (
            <div className="flex items-center justify-center flex-1">
              <p className="text-red-500 text-lg font-poppins">{error}</p>
            </div>
          )}
          <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden h-[80vh] flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 flex-1">
              <div className="flex flex-col items-center space-y-4 h-full">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-40 h-40 object-cover rounded-full border-2 border-gray-300 mx-auto"
                />

                <div className="flex space-x-4 mt-4">
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-full flex items-center"
                    onClick={handleMessageClick}
                  >
                    <Send size={18} className="mr-2" /> Message
                  </button>

                  <button className="bg-blue-600 text-white py-2 px-4 rounded-full flex items-center">
                    <Mail size={18} className="mr-2" /> Send Email
                  </button>
                </div>

                <hr className="w-full my-4 border-gray-300" />

                <div className="text-left text-gray-600 space-y-2 text-xl mt-4 ">
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {profileData?.email || "Email not specified"}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {profileData?.address || "Address not specified"}
                  </p>
                  <p>
                    <span className="font-semibold">Age:</span>{" "}
                    {profileData?.age || "Age not specified"}
                  </p>
                  <p>
                    <span className="font-semibold">Contact:</span>{" "}
                    {profileData?.contact || "Contact not specified"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <h1 className="text-3xl font-bold text-gray-800">{fullName}</h1>

                <nav className="flex space-x-4 mt-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      className={`py-2 px-4 flex items-center border-b-2 ${
                        activeTab === tab
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-500"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab === "bio" && <User className="mr-2" />}
                      {tab === "career Info" && <Briefcase className="mr-2" />}
                      {tab === "Accessibility Info" && (
                        <Accessibility className="mr-2" />
                      )}
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>

                <div className="mt-6 flex-1 relative">
                  <div className="absolute left-[-40px]  top-1/3 transform -translate-y-1/2">
                    {tabs.indexOf(activeTab) > 0 && (
                      <button
                        onClick={() => handleTabNavigation("left")}
                        className="text-black hover:text-red-800"
                        title="Previous Tab"
                      >
                        <ChevronLeft className="w-8 h-8" />
                      </button>
                    )}
                  </div>
                  <div className="absolute right-[-18px] top-1/3 transform -translate-y-1/2">
                    {tabs.indexOf(activeTab) < tabs.length - 1 && (
                      <button
                        onClick={() => handleTabNavigation("right")}
                        className="text-black hover:text-red-800"
                        title="Next Tab"
                      >
                        <ChevronRight className="w-8 h-8" />
                      </button>
                    )}
                  </div>

                  {activeTab === "bio" && (
                    <p className="text-gray-600 text-justify">{bio}</p>
                  )}
                  {activeTab === "career Info" && (
                    <div className="text-gray-600 space-y-4">
                      <p>
                        <Briefcase className="inline-block mr-2" />
                        <span className="font-bold">Field of Work:</span>{" "}
                        {profileData?.careerInformation?.fieldOfWork}
                      </p>
                      <p>
                        <Award className="inline-block mr-2" />
                        <span className="font-bold">Education:</span>{" "}
                        {profileData?.careerInformation?.education}
                      </p>
                      <p>
                        <Layers className="inline-block mr-2" />
                        <span className="font-bold">Work Experience:</span>{" "}
                        {profileData?.careerInformation?.workExperience}
                      </p>
                      <div className="mt-4">
                        <p className="text-gray-800 font-semibold mb-2">
                          Skills:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {profileData?.careerInformation?.skills?.map(
                            (skill, index) => (
                              <span
                                key={index}
                                className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full flex items-center"
                              >
                                <Check className="mr-2" />
                                {skill}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "Accessibility Info" && (
                    <div className="text-gray-600">
                      {profileData?.disabilityInformation && (
                        <div className="space-y-4">
                          {" "}
                          <p>
                            <span className="font-bold">
                              Disability Verified:
                            </span>{" "}
                            {profileData?.disabilityInformation.isIdVerified
                              ? "Yes"
                              : "No"}
                          </p>
                          <p>
                            <span className="font-bold">Disability Type:</span>{" "}
                            {profileData?.disabilityInformation
                              .disabilityType || "Not specified"}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;
