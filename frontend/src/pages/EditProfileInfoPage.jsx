import { Loader, LogOut } from "lucide-react";
import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { authStore } from "../stores/authStore";
const EditProfileInfoPage = () => {
  const { user, userProfileInfo, isUpdatingProfileInfo } = authStore();
  const navigate = useNavigate();

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
      setFormData((prev) => ({
        ...prev,
        birthday: value,
        age: calculateAge(value),
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
      navigate("/profile-info");
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
            <h2 className="text-xl font-bold text-gray-800 mb-6 font-poppins">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2 font-poppins">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full border border-gray-300 bg-gray-200 font-poppins font-medium rounded-2xl shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 font-poppins">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 bg-gray-200 font-poppins font-medium rounded-2xl shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2 font-poppins">
                  Birthday
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="w-full border border-gray-300 bg-gray-200 font-poppins font-medium rounded-2xl shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 font-poppins">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  readOnly
                  className="w-full border border-gray-300 bg-gray-200 font-poppins font-medium rounded-2xl shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 font-poppins">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full border text-justify border-gray-300 bg-gray-200 font-poppins font-medium rounded-2xl shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden overflow-y-scroll no-scrollbar"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 font-poppins">
              Career Information
            </h2>
            <div>
              <label className="block text-gray-700 font-medium font-poppins">
                Field of Work
              </label>
              <input
                type="text"
                name="careerInformation.fieldOfWork"
                value={formData.careerInformation.fieldOfWork}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-gray-200 font-poppins font-medium rounded-2xl shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium font-poppins">
                Skills [Type a skill and press comma]
              </label>
              <input
                name="careerInformation.skills"
                value={formData.careerInformation.skills}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 bg-gray-200 font-poppins font-medium rounded-2xl shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium font-poppins">
                Education
              </label>
              <input
                type="text"
                name="careerInformation.education"
                value={formData.careerInformation.education}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-gray-200 font-poppins font-medium rounded-2xl shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium font-poppins">
                Work Experience
              </label>
              <textarea
                name="careerInformation.workExperience"
                value={formData.careerInformation.workExperience}
                onChange={handleChange}
                rows={2}
                className="w-full border border-gray-300 bg-gray-200 font-poppins font-medium rounded-2xl shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 font-poppins">
              Disability Information
            </h2>
            <div>
              <label className="block text-gray-700 font-medium font-poppins">
                Disability Type
              </label>
              <select
                name="disabilityInformation.disabilityType"
                value={formData.disabilityInformation.disabilityType}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-gray-200 font-poppins font-medium rounded-2xl shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              >
                <option value="">Select Disability Type</option>
                <option value="Visual Impairment">Visual Impairment</option>
                <option value="Mobility Impairment">Mobility Impairment</option>
                <option value="Physical Disability">Physical Disability</option>
                <option value="Intellectual Disability">
                  Intellectual Disability
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium font-poppins">
                Accessibility Needs
              </label>
              <input
                type="text"
                name="disabilityInformation.accessibilityNeeds"
                value={formData.disabilityInformation.accessibilityNeeds}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-gray-200 font-poppins font-medium rounded-2xl shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-200">
      <Navbar />
      <main className="relative flex lg:flex-row items-stretch m-5 ">
        <div className="sticky top-0 lg:h-[570px] bg-blue-600 text-white p-6 rounded-tl-lg rounded-bl-lg z-10 flex flex-col justify-start">
          <div className="flex-grow">
            <h2 className="text-lg font-semibold mb-4 font-poppins">
              Progress
            </h2>
            <ul className="space-y-4">
              {steps.map((stepTitle, index) => {
                const isCurrent = index + 1 === step;
                const isCompleted = index + 1 < step;

                return (
                  <li
                    key={index}
                    className={`flex items-center space-x-3 font-poppins ${
                      isCurrent
                        ? "font-bold"
                        : isCompleted
                        ? "opacity-70"
                        : "opacity-50"
                    }`}
                  >
                    <span
                      className={`h-8 w-8 flex items-center justify-center rounded-full text-sm font-medium border-2 ${
                        isCurrent
                          ? "bg-blue-200 text-blue-800 border-blue-400"
                          : isCompleted
                          ? "bg-green-200 text-green-800 border-green-400"
                          : "bg-gray-300 text-gray-700 border-gray-400"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span>{stepTitle}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-auto flex items-center space-x-2">
            <button className="flex items-center justify-center px-4 py-2 text-white font-poppins font-medium rounded-lg shadow-sm" onClick={() => navigate(-1)}>
              <LogOut className="w-5 h-5 mr-2" />
              Exit
            </button>
          </div>
        </div>

        <div className="flex-grow w-full lg:w-3/4 lg:h-[570px] bg-white rounded-lg shadow-lg p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 h-full flex flex-col justify-between"
          >
            {renderStep()}
            <div className="flex justify-between">
              <div>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="bg-gray-300 text-gray-700 font-poppins  w-40 px-6 py-3 rounded-2xl shadow-sm hover:bg-gray-400 focus:ring focus:ring-gray-400 transition-all duration-200"
                  >
                    Go Back
                  </button>
                )}
              </div>
              <div className="flex space-x-4">
                {step < steps.length && (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="bg-blue-500 text-white font-poppins w-40 px-6 py-3 rounded-2xl shadow-sm hover:bg-blue-600 focus:ring focus:ring-blue-400 transition-all duration-200"
                  >
                    Proceed
                  </button>
                )}
                {step === steps.length && (
                  <button
                    type="submit"
                    className={`bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 focus:ring focus:ring-green-400 transition-all duration-200 font-poppins ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isUpdatingProfileInfo}
                  >
                    {isUpdatingProfileInfo ? (
                      <Loader className="w-6 h-6 animate-spin mx-auto" />
                    ) : (
                      "Complete"
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProfileInfoPage;
