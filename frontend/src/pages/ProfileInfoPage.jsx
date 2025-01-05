import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { authStore } from "../stores/authStore";
import { Camera, Phone, Calendar, Home, User } from "lucide-react";
import { formatDate } from "../lib/utils";

const ProfileInfoPage = () => {
  const { user, updateProfile } = authStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const birthdayDate = user.birthday ? formatDate(user.birthday) : "N/A";

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePicture: base64Image });
    };
  };

  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center h-[90vh] bg-gradient-to-b from-brown-100 to-brown-300 text-gray-800 p-6 bg-bg">
        <div className="flex flex-col md:flex-row w-full max-w-screen-xl gap-6">
          <div className="bg-white bg-opacity-65 shadow-lg rounded-lg p-8 md:w-1/4">
            <div className="relative mb-6">
              <div className="relative w-48 h-44 mx-auto">
                <img
                  src={selectedImg || user.profilePicture || "/avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full shadow-lg"
                />
                <label
                  htmlFor="file-upload"
                  className="absolute bottom-2 right-2 bg-transparent text-black p-2 rounded-full cursor-pointer shadow-lg"
                >
                  <Camera size={24} />
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            <h1 className="text-xl font-semibold text-center mb-4 text-textcolor">
              {user.fullName || "N/A"}
            </h1>
            <div className="text-base text-left font-poppins">
              <hr className="border-t-2 border-black my-6" />

              <div className="flex items-center mb-2">
                <Phone className="w-6 h-6 mr-0 text-gray-600" />
                <span className="pl-3">{user.contact || "N/A"}</span>
              </div>

              <div className="flex items-start mb-2">
                <Home className="w-6 h-6 mr-3 text-gray-600" />
                <span className="text-base break-words">
                  {user.address || "N/A"}
                </span>
              </div>

              <div className="flex items-center mb-2">
                <User className="w-6 h-6 mr-3 text-gray-600" />
                <span className="">{user.age || "N/A"}</span>
              </div>

              <div className="flex items-center mb-2">
                <Calendar className="w-6 h-6 mr-0 text-gray-600 " />
                <span className="pl-3">{birthdayDate || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white bg-opacity-65 shadow-lg rounded-lg p-8">
              <h1 className="font-poppins font-extrabold">Bio</h1>
              <p className="text-xs font-poppins text-justify ">{user.bio}</p>
              <p className="text-lg text-gray-600 text-center"></p>
            </div>
            <div className="bg-white bg-opacity-65 shadow-lg rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 text-left font-poppins">
                Career Information
              </h2>
              <ul className="text-lg text-gray-600 text-left space-y-2 font-poppins">
                <li>
                  <strong>Field of Work: </strong>
                  {user.careerInformation?.fieldOfWork || "N/A"}
                </li>
                <li>
                  <strong>Skills: </strong>
                </li>
                <ul className="list-disc ml-10 text-left font-poppins">
                  {user.careerInformation?.skills?.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  )) || <li>N/A</li>}
                </ul>
                <li>
                  <strong>Education: </strong>
                  {user.careerInformation?.education || "N/A"}
                </li>
                <li>
                  <strong>Work Experience: </strong>
                  {user.careerInformation?.workExperience || "N/A"}
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white bg-opacity-65 shadow-lg rounded-lg p-8 md:w-1/4">
            <div className="w-full h-48 bg-gray-300 rounded mb-6"></div>
            <h2 className="text-2xl font-semibold mb-4 text-center font-poppins">
              PWD ID
            </h2>

            <div className="flex justify-center items-center mb-4">
              <input
                type="checkbox"
                id="showPwd"
                checked={isPwdVisible}
                onChange={() => setIsPwdVisible((prev) => !prev)}
                className="mr-2"
              />
              <label htmlFor="showPwd" className="text-lg font-poppins">
                Show PWD ID Details
              </label>
            </div>

            {isPwdVisible && (
              <div>
                <div className="flex justify-start items-start">
                  <span className="font-medium w-24 text-left font-poppins text-lg">
                    Status:
                  </span>
                  <span className="break-words font-poppins text-lg">
                    {user.disabilityInformation?.isIdVerified
                      ? "Verified"
                      : "Not Verified"}
                  </span>
                </div>
                <div className="flex justify-start items-start">
                  <span className="font-medium w-24 text-left font-poppins text-base">
                    Disability Type:
                  </span>
                  <span className="break-words font-poppins text-lg">
                    {user.disabilityInformation?.disabilityType || "N/A"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileInfoPage;
