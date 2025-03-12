import React, { useState, useEffect } from "react";
import { authStore } from "../stores/authStore";
import { FaCamera } from "react-icons/fa";
import AdminProfileSkeletonLoader from "../components/AdminProfileSkeletonLoader";

const AdminProfilePage = () => {
  const { user, updateAdminProfile } = authStore();
  const [loading, setLoading] = useState(true); // Start with loading true
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedCoverImg, setSelectedCoverImg] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    contact: user.contact || "",
  });

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
      } else {
        setSelectedImg(base64Image);
      }
    };
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAdminProfile({
        fullName: formData.fullName,
        contact: formData.contact,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  useEffect(() => {
    const startTime = Date.now();
    const delay = 2000;
    const elapsed = Date.now() - startTime;
    const remaining = delay - elapsed;
    if (remaining > 0) {
      const timer = setTimeout(() => setLoading(false), remaining);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <AdminProfileSkeletonLoader />;
  }

  return (
    <main className="flex items-center justify-center h-[80vh] bg-white p-6">
      <div className="flex flex-col w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden pb-10">
        <div className="relative h-64">
          <img
            src={selectedCoverImg || user.coverPhoto || "/default-cover.jpg"}
            alt="Cover"
            className="w-full h-full object-cover rounded-t-xl"
          />
          <label
            htmlFor="cover-upload"
            className="absolute top-4 right-4 bg-gray-900 text-white p-3 rounded-full cursor-pointer shadow-md hover:bg-gray-700 transition duration-300 flex items-center justify-center"
          >
            <FaCamera size={18} />
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, true)}
            />
          </label>
        </div>

        <div className="flex flex-col items-center -mt-16">
          <div className="relative w-32 h-32">
            <img
              src={selectedImg || user.profilePicture || "/avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
            />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-2 right-2 bg-blue-600 text-white p-3 rounded-full cursor-pointer shadow-md hover:bg-blue-500 transition duration-300 flex items-center justify-center"
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

          {isEditing ? (
            <form
              className="mt-4 text-center space-y-4 w-full max-w-sm"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg font-poppins"
                placeholder="Full Name"
                required
              />
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg font-poppins"
                placeholder="Contact"
                required
              />
              <div className="flex space-x-10 items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-16 py-2 rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-16 py-2 rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold text-gray-800 font-poppins">
                {user.fullName || "Admin"}
              </h2>
              <p className="text-gray-600 text-lg font-poppins">{user.email}</p>
              <p className="text-gray-600 text-lg font-poppins">
                {user.contact}
              </p>

              <button
                className="mt-4 bg-blue-600 text-white px-6 py-2 mb-10 rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminProfilePage;
