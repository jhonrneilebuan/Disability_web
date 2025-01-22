import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { authStore } from "../stores/authStore";

const EditProfileInfoPage = () => {
  const { user, userProfileInfo, isUpdatingProfileInfo } = authStore();

  const [step, setStep] = useState(1);
  const steps = [
    "Personal Information",
    "Career Information",
    "Disability Information",
  ];

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

    if (name === "birthday") {
      // Update the birthday and calculate age
      setFormData((prev) => ({
        ...prev,
        birthday: value,
        age: calculateAge(value), // Calculate age based on the new birthday
      }));
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Personal Information
            </h2>
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
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
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
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
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
                Skills
              </label>
              <textarea
                name="careerInformation.skills"
                value={formData.careerInformation.skills}
                onChange={handleChange}
                rows={3}
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
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Disability Information
            </h2>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Disability Type
              </label>
              <select
                name="disabilityInformation.disabilityType"
                value={formData.disabilityInformation.disabilityType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Disability Type</option>
                <option value="Visual Impairment">Visual Impairment</option>
                <option value="Hearing Impairment">Hearing Impairment</option>
                <option value="Physical Disability">Physical Disability</option>
                <option value="Intellectual Disability">
                  Intellectual Disability
                </option>
                <option value="Other">Other</option>
              </select>
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
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col lg:flex-row items-start justify-center min-h-screen bg-gray-100 p-6">
        <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Progress</h2>
          <ul className="space-y-4">
            {steps.map((stepTitle, index) => {
              const isCurrent = index + 1 === step;
              const isCompleted = index + 1 < step;

              return (
                <li
                  key={index}
                  className={`flex items-center space-x-3 ${
                    isCurrent
                      ? "text-blue-600 font-bold"
                      : isCompleted
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  <span
                    className={`h-8 w-8 flex items-center justify-center rounded-full text-sm font-medium shadow-md ${
                      isCurrent
                        ? "bg-blue-100 text-blue-600 border-blue-500 border"
                        : isCompleted
                        ? "bg-green-100 text-green-500 border-green-400 border"
                        : "bg-gray-200 text-gray-500 border-gray-300 border"
                    }`}
                    title={
                      isCompleted
                        ? "Completed"
                        : isCurrent
                        ? "Current Step"
                        : "Upcoming"
                    }
                  >
                    {index + 1}
                  </span>
                  <span>{stepTitle}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex-grow w-full lg:w-3/4 bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStep()}
            <div className="flex justify-between mt-8">
              <div>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow-sm hover:bg-gray-300 focus:ring focus:ring-gray-400 transition-all duration-200"
                  >
                    Back
                  </button>
                )}
              </div>
              <div className="flex space-x-4">
                {step < steps.length && (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-sm hover:bg-blue-600 focus:ring focus:ring-blue-400 transition-all duration-200"
                  >
                    Next
                  </button>
                )}
                {step === steps.length && (
                  <button
                    type="submit"
                    className={`bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 focus:ring focus:ring-green-400 transition-all duration-200 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center space-x-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
                          ></path>
                        </svg>
                        <span>Saving...</span>
                      </span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default EditProfileInfoPage;
