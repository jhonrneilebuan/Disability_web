import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import NavbarEmployer from "../components/NavbarEmployer";
import { authStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

const EmployerProfilePage = () => {
  const { user } = authStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedCoverImg, setSelectedCoverImg] = useState(null);
  const navigate = useNavigate();

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
      isCoverPhoto
        ? setSelectedCoverImg(base64Image)
        : setSelectedImg(base64Image);
    };
  };

  const handleVerification = () => {
    navigate("/uploademployerId")
  };

  return (
    <div className="bg-gray-50 min-h-screen font-[Poppins]">
      <NavbarEmployer />
      <main className="flex items-center justify-center p-6 mt-5">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 pb-10 ">
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
                <p className="text-lg text-gray-700 mt-2">
                  <span className="font-semibold">Name:</span>{" "}
                  {user.fullName || "Employer"}
                </p>
                <p className="text-lg text-gray-700 mt-2">
                  <span className="font-semibold">Company:</span>{" "}
                  {user.employerInformation?.companyName || "N/A"}
                </p>
                <p className="text-lg text-gray-700 mt-2">
                  <span className="font-semibold">Email:</span>{" "}
                  {user.email || "N/A"}
                </p>
                <p className="text-lg text-gray-700 mt-2">
                  <span className="font-semibold">Contact:</span>{" "}
                  {user.contact || "N/A"}
                </p>
              </div>

              <div className="text-left flex flex-col h-full">
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Address:</span>{" "}
                  {user.employerInformation?.companyAddress || "N/A"}
                </p>
                <p className="text-lg text-gray-700 mt-2">
                  <span className="font-semibold">Age:</span>{" "}
                  {user.age || "N/A"}
                </p>
                <p className="text-lg text-gray-700 mt-2">
                  <span className="font-semibold">Position:</span>{" "}
                  {user.role || "N/A"}
                </p>

                {user.employerInformation?.isIdVerified ? (
                  <div className="flex items-center gap-2 text-green-600 font-medium mt-3">
                    <CheckCircle className="w-6 h-6" />
                    <span>Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600 font-medium mt-3">
                    <XCircle className="w-6 h-6" />
                    <span>Not Verified</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerProfilePage;
