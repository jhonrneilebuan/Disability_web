import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { authStore } from "../stores/authStore";
import { Camera, Phone, Calendar, Home, User, CheckCircle } from "lucide-react";
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
      <main className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="flex flex-col w-full max-w-screen-xl gap-6">
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-8 gap-6">
            <div className="flex flex-col items-start md:w-1/3">
              <div className="relative w-28 h-28">
                <img
                  src={selectedImg || user.profilePicture || "/avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full shadow-lg"
                />
                <label
                  htmlFor="file-upload"
                  className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full cursor-pointer shadow-md"
                >
                  <Camera size={20} />
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div className="flex items-center mt-4">
                <h1 className="text-2xl font-bold">{user.fullName || "N/A"}</h1>
                <CheckCircle className="text-green-500 w-5 h-5 ml-2" />
              </div>
              
              <div className="w-full mt-6">
                <h2 className="text-xl font-semibold mb-4 text-left">
                  Candidate Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-600 mr-3" />
                    <span>{user.contact || "N/A"}</span>
                  </div>
                  <div className="flex items-start">
                    <Home className="w-5 h-5 text-gray-600 mr-3" />
                    <span>{user.address || "N/A"}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-600 mr-3" />
                    <span>{user.age || "N/A"}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-600 mr-3" />
                    <span>{birthdayDate || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Career Information</h2>
            <div className="space-y-2">
              <p>
                <strong>Field of Work: </strong>
                {user.careerInformation?.fieldOfWork || "N/A"}
              </p>
              <p>
                <strong>Skills: </strong>
                {user.careerInformation?.skills?.length
                  ? user.careerInformation.skills.map((skill, index) => (
                      <li key={index} className="list-disc ml-5">
                        {skill}
                      </li>
                    ))
                  : "N/A"}
              </p>
              <p>
                <strong>Education: </strong>
                {user.careerInformation?.education || "N/A"}
              </p>
              <p>
                <strong>Work Experience: </strong>
                {user.careerInformation?.workExperience || "N/A"}
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">PWD Information</h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Status: </span>
                {user.disabilityInformation?.isIdVerified ? "Verified" : "Not Verified"}
              </div>
              <div>
                <span className="font-medium">Disability Type: </span>
                {user.disabilityInformation?.disabilityType || "N/A"}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileInfoPage;
