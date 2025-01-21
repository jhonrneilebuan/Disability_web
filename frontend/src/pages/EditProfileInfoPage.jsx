import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { authStore } from "../stores/authStore";

const EditProfileInfoPage = () => {
  const { user, userProfileInfo, isUpdatingProfileInfo } = authStore();

  const [formData, setFormData] = useState({
    contact: "",
    address: "",
    age: "",
    birthday: "",
    bio: "",
    careerInformation: {
      fieldOfWork: "",
      skills: [],
      education: "",
      workExperience: "",
    },
    disabilityInformation: {
      disabilityType: "",
      accessibilityNeeds: "",
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        contact: user.contact || "",
        address: user.address || "",
        age: user.age || "",
        birthday: user.birthday || "",
        bio: user.bio || "",
        careerInformation: {
          fieldOfWork: user.careerInformation?.fieldOfWork || "",
          skills: user.careerInformation?.skills || [],
          education: user.careerInformation?.education || "",
          workExperience: user.careerInformation?.workExperience || "",
        },
        disabilityInformation: {
          disabilityType: user.disabilityInformation?.disabilityType || "",
          accessibilityNeeds:
            user.disabilityInformation?.accessibilityNeeds || "",
        },
      });
    }
  }, [user]);

  const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: name === "careerInformation.skills" ? value : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      careerInformation: {
        ...formData.careerInformation,
        skills:
          typeof formData.careerInformation.skills === "string"
            ? formData.careerInformation.skills
                .split(",")
                .map((skill) => skill.trim())
            : formData.careerInformation.skills,
      },
    };

    try {
      await userProfileInfo(updatedFormData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const loading = isUpdatingProfileInfo;

  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="flex flex-col w-full max-w-3xl bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Edit Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Contact Number
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Birthday
              </label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={(e) => {
                  handleChange(e);
                  setFormData((prev) => ({
                    ...prev,
                    age: calculateAge(e.target.value),
                  }));
                }}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Age
              </label>
              <input
                type="text"
                name="age"
                value={formData.age}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">
              Career Information
            </h2>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Field of Work
              </label>
              <input
                type="text"
                name="careerInformation.fieldOfWork"
                value={formData.careerInformation.fieldOfWork}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Education
              </label>
              <input
                type="text"
                name="careerInformation.education"
                value={formData.careerInformation.education}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Work Experience
              </label>
              <textarea
                name="careerInformation.workExperience"
                value={formData.careerInformation.workExperience}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              type="text"
              name="careerInformation.skills"
              value={
                Array.isArray(formData.careerInformation.skills)
                  ? formData.careerInformation.skills.join(", ")
                  : formData.careerInformation.skills
              }
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">
              Disability Information
            </h2>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Disability Type
              </label>
              <input
                type="text"
                name="disabilityInformation.disabilityType"
                value={formData.disabilityInformation.disabilityType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Accessibility Needs
              </label>
              <input
                type="text"
                name="disabilityInformation.accessibilityNeeds"
                value={formData.disabilityInformation.accessibilityNeeds}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default EditProfileInfoPage;
