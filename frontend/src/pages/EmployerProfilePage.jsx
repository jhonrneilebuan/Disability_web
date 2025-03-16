import { CheckCircle, ChevronLeft, XCircle } from "lucide-react";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import NavbarEmployer from "../components/NavbarEmployer";
import { authStore } from "../stores/authStore";

const EmployerProfilePage = () => {
  const { user, updateProfile, updateCoverPhoto } = authStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedCoverImg, setSelectedCoverImg] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = async (e, isCoverPhoto = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;

      if (isCoverPhoto) {
        setSelectedCoverImg(base64Image);
        try {
          await updateCoverPhoto({ coverPhoto: base64Image });
        } catch (error) {
          console.error("Failed to upload cover photo:", error);
        }
      } else {
        setSelectedImg(base64Image);
        try {
          await updateProfile({ profilePicture: base64Image });
        } catch (error) {
          console.error("Failed to upload profile picture:", error);
        }
      }
    };
  };

  const handleVerification = () => {
    navigate("/uploademployerId");
  };

  const handleBackToDashboard = () => {
    navigate("/employer");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavbarEmployer />
      <div className="flex items-center justify-start p-6">
        <button
          onClick={handleBackToDashboard}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-lg font-medium font-poppins">
            Back to Dashboard
          </span>
        </button>
      </div>
      <main className="flex items-center justify-center mb-4">
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 pb-10 ">
          <div className="relative h-64 bg-gray-200 ">
            <img
              src={selectedCoverImg || user.coverPhoto || "/Background-3.png"}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <label
              htmlFor="cover-upload"
              className="absolute bottom-4 right-4 bg-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-gray-100 transition"
            >
              <FaCamera size={18} className="text-gray-700" />
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, true)}
              />
            </label>
          </div>

          <div className="flex flex-col items-center -mt-20 px-6">
            <div className="relative w-40 h-40">
              <img
                src={selectedImg || user.profilePicture || "/avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow hover:bg-blue-500 transition"
              >
                <FaCamera size={18} />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, false)}
                />
              </label>
            </div>

            {!user.employerInformation?.isIdVerified && (
              <button
                className="bg-blue-600 text-white text-xs font-medium px-4 py-2 mt-4 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 font-poppins"
                onClick={handleVerification}
              >
                Get Verified
              </button>
            )}

            <div className="grid grid-cols-2 gap-6 w-full mt-6 px-8 items-start h-full">
              <div className="text-left flex flex-col h-full">
                {user.fullName && (
                  <p className="text-lg text-gray-700 mt-2 font-poppins">
                    <span className="font-semibold font-poppins">Name:</span>{" "}
                    {user.fullName}
                  </p>
                )}
                {user.role && (
                  <p className="text-lg text-gray-700 mt-2 font-poppins">
                    <span className="font-semibold font-poppins">
                      Position:
                    </span>{" "}
                    {user.role}
                  </p>
                )}

                {user.employerInformation?.companyAddress && (
                  <p className="text-lg text-gray-700 font-poppins">
                    <span className="font-semibold font-poppins">Address:</span>{" "}
                    {user.employerInformation.companyAddress}
                  </p>
                )}
                {user.contact && (
                  <p className="text-lg text-gray-700 mt-2 font-poppins">
                    <span className="font-semibold font-poppins">Contact:</span>{" "}
                    {user.contact}
                  </p>
                )}
              </div>

              <div className="text-left flex flex-col h-full">
                {user.email && (
                  <p className="text-lg text-gray-700 mt-2 font-poppins">
                    <span className="font-semibold font-poppins">Email:</span>{" "}
                    {user.email}
                  </p>
                )}
                {user.employerInformation?.companyName && (
                  <p className="text-lg text-gray-700 mt-2 font-poppins">
                    <span className="font-semibold font-poppins">Company:</span>{" "}
                    {user.employerInformation.companyName}
                  </p>
                )}
                {user.age && (
                  <p className="text-lg text-gray-700 mt-2 font-poppins">
                    <span className="font-semibold font-poppins">Age:</span>{" "}
                    {user.age}
                  </p>
                )}

                {user.employerInformation?.isIdVerified ? (
                  <div className="flex items-center gap-2 text-green-600 font-medium mt-3">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-poppins">Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600 font-medium mt-3">
                    <XCircle className="w-6 h-6" />
                    <span>Not Verified</span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex px-8">
              <Link
                to="/edit-employerProfile"
                className="block w-full mt-4 font-poppins bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 shadow-md text-center"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerProfilePage;
