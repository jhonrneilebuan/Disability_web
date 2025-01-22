import { useState } from "react";
import Navbar from "../components/Navbar";
import { authStore } from "../stores/authStore";
import { Camera, Phone, Calendar, Home, User, CheckCircle } from "lucide-react";
import { formatDate } from "../lib/utils";

const ProfileInfoPage = () => {
  const { user, updateProfile, updateCoverPhoto } = authStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedCoverImg, setSelectedCoverImg] = useState(null);
  const birthdayDate = user.birthday ? formatDate(user.birthday) : "N/A";

  const handleImageUpload = async (e, isCoverPhoto = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a JPEG or PNG image.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;

      if (isCoverPhoto) {
        setSelectedCoverImg(base64Image); // Update cover image state
        try {
          await updateCoverPhoto({ coverPhoto: base64Image });
        } catch (error) {
          console.error("Failed to upload cover photo:", error);
          alert("Failed to upload cover photo. Please try again.");
        }
      } else {
        setSelectedImg(base64Image); // Update profile image state
        try {
          await updateProfile({ profilePicture: base64Image });
        } catch (error) {
          console.error("Failed to upload profile picture:", error);
          alert("Failed to upload profile picture. Please try again.");
        }
      }
    };
  };

  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="flex flex-col w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Cover Photo */}
          <div className="relative h-48 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200">
            <img
              src={selectedCoverImg || user.coverPhoto || "/default-cover.jpg"}
              alt="Cover"
              className="w-full h-full object-cover rounded-t-xl"
            />
            <label
              htmlFor="cover-upload"
              className="absolute top-4 right-4 bg-gray-800 text-white p-3 rounded-md cursor-pointer shadow-lg hover:bg-gray-700 transition duration-300"
            >
              <Camera size={20} />
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, true)} // true for cover photo
              />
            </label>
          </div>

          {/* Profile Info */}
          <div className="flex flex-col md:flex-row items-center p-8 gap-6">
            <div className="relative w-32 h-32">
              <img
                src={selectedImg || user.profilePicture || "/avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full cursor-pointer shadow-md hover:bg-gray-300 transition duration-300"
              >
                <Camera size={20} />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, false)} // false for profile picture
                />
              </label>
            </div>

            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <h1 className="text-3xl font-bold">{user.fullName || "N/A"}</h1>
                <CheckCircle className="text-green-500 w-6 h-6 ml-2" />
              </div>
              <p className="text-gray-600 mt-2">{user.email || "N/A"}</p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white rounded-lg p-8">
              <h1 className="font-poppins font-extrabold">Bio</h1>
              <p className="text-xs font-poppins text-justify">
                {user.bio || "N/A"}
              </p>
            </div>
          </div>

          {/* Candidate Details */}
          <div className="border-t p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Candidate Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Phone, label: user.contact || "N/A" },
                { icon: Home, label: user.address || "N/A" },
                { icon: User, label: user.age || "N/A" },
                { icon: Calendar, label: birthdayDate || "N/A" },
              ].map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <detail.icon className="w-6 h-6 text-gray-600 mr-3" />
                  <span className="text-gray-700">{detail.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Career Information */}
          <div className="border-t p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Career Information
            </h2>
            <div className="space-y-4">
              {[
                {
                  label: "Field of Work",
                  value: user.careerInformation?.fieldOfWork || "N/A",
                },
                {
                  label: "Skills",
                  value: user.careerInformation?.skills?.length ? (
                    <ul className="flex flex-wrap gap-4">
                      {user.careerInformation.skills.map((skill, index) => (
                        <li
                          key={index}
                          className="text-lg text-black bg-gray-200 px-4 py-2 rounded-full"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "N/A"
                  ),
                },
                {
                  label: "Education",
                  value: user.careerInformation?.education || "N/A",
                },
                {
                  label: "Work Experience",
                  value: user.careerInformation?.workExperience || "N/A",
                },
              ].map((info, index) => (
                <div key={index} className="flex">
                  <span className="font-medium w-48 text-gray-700">
                    {info.label}
                  </span>
                  <span className="text-gray-600">: {info.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PWD Information */}
          <div className="border-t p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              PWD Information
            </h2>
            <div className="space-y-4">
              {[
                {
                  label: "Status",
                  value: user.disabilityInformation?.isIdVerified
                    ? "Verified"
                    : "Not Verified",
                },
                {
                  label: "Disability Type",
                  value: user.disabilityInformation?.disabilityType || "N/A",
                },
                {
                  label: "Accessibility Needs",
                  value:
                    user.disabilityInformation?.accessibilityNeeds || "N/A",
                },
              ].map((info, index) => (
                <div key={index} className="flex">
                  <span className="font-medium w-48 text-gray-700">
                    {info.label}
                  </span>
                  <span className="text-gray-600">: {info.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileInfoPage;
