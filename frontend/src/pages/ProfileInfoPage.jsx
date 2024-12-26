import Navbar from "../components/Navbar";
import { authStore } from "../stores/authStore";
import { Camera } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../lib/utils";
const ProfileInfoPage = () => {
  const { logout, user, updateProfile } = authStore();
  const [selectedImg, setSelectedImg] = useState(null);
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

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-pastelBlueGray min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-col md:flex-row flex-grow mt-7 ml-10">
        <aside className="w-full md:w-1/4 bg-white shadow-md p-6 md:h-screen overflow-y-auto mt-6 rounded-xl">
          <ul className="space-y-4">
            <li className="text-blue-500 text-4xl font-bold cursor-pointer">
              Profile
            </li>
            <li className="text-gray-600 text-4xl font-bold cursor-pointer">
              Edit Profile
            </li>
            <li className="text-gray-600 text-4xl font-bold cursor-pointer">
              FAQ
            </li>
            <li
              onClick={handleLogout}
              className="text-gray-600 cursor-pointer text-4xl font-bold "
            >
              Log Out
            </li>
          </ul>
        </aside>

        <main className="flex-grow bg-pastelBlueGray mx-4 md:mx-6 p-6 rounded-lg overflow-y-auto">
          <div className="relative bg-darkLight h-52 rounded-t-lg pt-36">
            <div className="absolute -bottom-10 left-6 flex flex-col items-center">
              <div className="relative w-52 h-52 bg-gray-200 rounded-full flex justify-center items-center">
                <img
                  src={selectedImg || user.profilePicture || "/avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
                <span className="text-gray-400"></span>

                <label
                  htmlFor="file-upload"
                  className="absolute bottom-2 right-2 bg-gray-700 text-white p-2 rounded-full cursor-pointer "
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
            </div>
          </div>

          <section className="border-b pb-4 bg-white shadow-md p-6 mt-0 rounded-b-lg">
            <div className="mt-4 text-left">
              <h1 className="text-2xl font-bold">{user.fullName || "N/A"}</h1>
            </div>
            <h2 className="text-lg font-semibold mt-4">Candidate Detail</h2>
            <div className="mt-2 text-gray-700 space-y-2">
              <p>
                <strong>Contact: </strong> {user.contact || "N/A"}
              </p>
              <p>
                <strong>Address: </strong> {user.address || "N/A"}
              </p>
              <p>
                <strong>Email: </strong> {user.email || "N/A"}
              </p>
              <p>
                <strong>Age: </strong> {user.age || "N/A"}
              </p>
              <p>
                <strong>Birthday: </strong> {birthdayDate}
              </p>
            </div>
          </section>

          <section className="mt-5 border-b pb-4 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold">Career Information</h2>
            <div className="mt-2 text-gray-700 space-y-2">
              <p>
                <strong>Field of Work: </strong>
                {user.careerInformation?.fieldOfWork || "N/A"}
              </p>
              <p>
                <strong>Skills/Talents: </strong>
              </p>
              <ul className="list-disc ml-6">
                {user.careerInformation?.skills?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                )) || <li>N/A</li>}
              </ul>
              <p className="mt-2">
                <strong>Education: </strong>
                {user.careerInformation?.education || "N/A"}
              </p>
              <p className="mt-2">
                <strong>Work Experience: </strong>
                {user.careerInformation?.workExperience || "N/A"}
              </p>
            </div>
          </section>

          <section className="mt-5 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold">Disability Information</h2>
            <div className="mt-2 text-gray-700">
              <p>
                <strong>PWD Status: </strong>
                {user.disabilityInformation?.isIdVerified
                  ? "Verified"
                  : "Not Verified"}
              </p>
              <p>
                <strong>Disability Type/Category: </strong>
                {user.disabilityInformation?.disabilityType || "N/A"}
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfileInfoPage;
