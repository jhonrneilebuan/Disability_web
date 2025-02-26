import { Loader, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { authStore } from "../stores/authStore";

const EditProfileInfoPage = () => {
  const { user, userProfileInfo, isUpdatingProfileInfo } = authStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
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
      skills: "",
      education: "",
      workExperience: "",
    },
    disabilityInformation: {
      disabilityType: "",
      accessibilityNeeds: "",
    },
  });

  const [errors, setErrors] = useState({
    contact: "",
    address: "",
    bio: "",
    fieldOfWork: "",
    skills: "",
    education: "",
    workExperience: "",
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
          skills: user.careerInformation?.skills || "",
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

  const Modal = ({ show, onClose, message }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-lg font-semibold text-red-600">Invalid Data</h2>
          <p className="text-gray-700 my-4">{message}</p>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            OK
          </button>
        </div>
      </div>
    );
  };

  const calculateAge = (birthday) => {
    if (!birthday) return ""; // Prevent errors for empty values

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

  const validateContact = (contact) => {
    if (!contact) return "Contact number is required.";
    if (!/^\d{11}$/.test(contact))
      return "Contact number must be exactly 11 digits.";
    return "";
  };

  const validateAddress = (address) => {
    if (!address) return "Address is required.";
    if (/[^a-zA-Z0-9\s,#-]/.test(address))
      return "Address contains invalid characters.";
    return "";
  };

  const validateBio = (bio) => {
    if (!bio) return "Bio is required.";
    if (/\d/.test(bio)) return "Bio should not contain numbers."; // ❌ Prevents numbers
    return "";
  };

  const validateFieldOfWork = (fieldOfWork) => {
    if (!fieldOfWork) return "Field of Work is required.";
    if (/\d/.test(fieldOfWork))
      return "Field of Work should not contain numbers."; // ❌ Prevents numbers
    return "";
  };

  const validateSkills = (skills) => {
    if (!skills || (Array.isArray(skills) && skills.length === 0)) {
      return "At least one skill is required.";
    }

    const skillsString = Array.isArray(skills) ? skills.join(", ") : skills; // Convert array to string
    if (skillsString.trim() === "") {
      return "At least one skill is required.";
    }

    if (/\d/.test(skillsString)) {
      return "Skills should not contain numbers.";
    }

    return "";
  };

  const validateEducation = (education) => {
    if (!education) return "Education is required.";
    if (/\d/.test(education))
      return "Education field should not contain numbers."; // ❌ Prevents numbers
    return "";
  };

  const validateWorkExperience = (workExperience) => {
    return null; // ✅ No validation needed
  };

  const validateAge = (age) => {
    if (!age) return "Age is required.";
    if (!/^\d+$/.test(age)) return "Age should only contain numbers."; // ❌ Prevents letters
    if (parseInt(age) < 18) return "Age must be at least 18."; // ⏳ Prevents underage entries
    return "";
  };

  const handleBirthdayChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      birthday: value,
      age: calculateAge(value), // Auto-update age
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const keys = name.split(".");
      if (keys.length === 2) {
        return {
          ...prevData,
          [keys[0]]: {
            ...prevData[keys[0]],
            [keys[1]]: value,
          },
        };
      }
      return { ...prevData, [name]: value };
    });

    // ✅ Reset errors immediately when input becomes valid
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleNextStep = () => {
    setFormData((prev) => ({ ...prev })); // Ensure React detects changes

    let newErrors = {};

    if (step === 2) {
      // Validate all fields including "Skills"
      newErrors = {
        fieldOfWork:
          validateFieldOfWork(formData.careerInformation.fieldOfWork) || "",
        skills: validateSkills(formData.careerInformation.skills) || "",
        education:
          validateEducation(formData.careerInformation.education) || "",
        workExperience:
          validateWorkExperience(formData.careerInformation.workExperience) ||
          "",
      };
    }

    console.log("Validation Errors Before Set:", newErrors);

    // Check if any actual errors exist before updating state
    const hasErrors = Object.values(newErrors).some((error) => !!error);

    if (hasErrors) {
      setErrors(newErrors); // Only set errors if they exist
      console.log("Blocked due to errors:", newErrors);
      return;
    }

    console.log("Proceeding to Step:", step + 1);
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting Form:", formData);

    const newErrors = {
      contact: validateContact(formData.contact),
      address: validateAddress(formData.address),
      bio: validateBio(formData.bio),
      fieldOfWork: validateFieldOfWork(formData.careerInformation.fieldOfWork),
      skills: validateSkills(formData.careerInformation.skills),
      education: validateEducation(formData.careerInformation.education),
      workExperience: validateWorkExperience(
        formData.careerInformation.workExperience
      ),
      age: validateAge(formData.age),
    };

    console.log("Validation Errors Before Submit:", newErrors);

    const hasErrors = Object.values(newErrors).some((error) => !!error);

    if (hasErrors) {
      setErrors(newErrors);

      setModalMessage("Please check again for the errors before submitting.");
      setShowModal(true);

      console.log("Blocked due to validation errors.");
      return;
    }

    console.log("No Errors, Proceeding to API...");

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
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
                )}
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
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Birthday Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 font-poppins">
                  Birthday
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleBirthdayChange} // Correct function
                  className="w-full border border-gray-300 bg-gray-200 font-poppins font-medium rounded-2xl shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Age Input (Auto-filled) */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 font-poppins">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  readOnly // No onChange, since age is auto-calculated
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
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
              )}
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
              {errors.fieldOfWork && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fieldOfWork}
                </p>
              )}
            </div>
            <label className="block text-gray-700 font-medium font-poppins">
              Skills
            </label>
            <input
              type="text"
              name="careerInformation.skills"
              value={formData.careerInformation.skills || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-gray-200 font-poppins font-medium rounded-2xl shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              placeholder="e.g., JavaScript, React, Node.js"
            />

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
              {errors.education && (
                <p className="text-red-500 text-sm mt-1">{errors.education}</p>
              )}
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
              {errors.workExperience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.workExperience}
                </p>
              )}
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
                <option value="Mobility Impairment">Mobility Impairment</option>
                <option value="Amputation">Amputation</option>
                <option value="Cerebral Palsy">Cerebral Palsy</option>
                <option value="Muscular Dystrophy">Muscular Dystrophy</option>
                <option value="Spinal Cord Injury">Spinal Cord Injury</option>
                <option value="Multiple Sclerosis">Multiple Sclerosis</option>
                <option value="Arthritis">Arthritis</option>
                <option value="Stroke-related Disability">Stroke-related Disability</option>
                <option value="Visual Impairment">Visual Impairment</option>
                <option value="Blindness">Blindness</option>
                <option value="Hearing Impairment">Hearing Impairment</option>
                <option value="Deafness">Deafness</option>
                <option value="Deafblindness">Deafblindness</option>
                <option value="Down Syndrome">Down Syndrome</option>
                <option value="Autism Spectrum Disorder (ASD)">Autism Spectrum Disorder (ASD)</option>
                <option value="Intellectual Disability">Intellectual Disability</option>
                <option value="Learning Disability (Dyslexia, Dyscalculia, Dysgraphia)">Learning Disability (Dyslexia, Dyscalculia, Dysgraphia)</option>
                <option value="ADHD (Attention Deficit Hyperactivity Disorder)">ADHD (Attention Deficit Hyperactivity Disorder)</option>
                <option value="Dyslexia">Dyslexia</option>
                <option value="Dyspraxia">Dyspraxia</option>
                <option value="Tourette Syndrome">Tourette Syndrome</option>
                <option value="Anxiety Disorder">Anxiety Disorder</option>
                <option value="Depression">Depression</option>
                <option value="Bipolar Disorder">Bipolar Disorder</option>
                <option value="Schizophrenia">Schizophrenia</option>
                <option value="Post-Traumatic Stress Disorder (PTSD)">Post-Traumatic Stress Disorder (PTSD)</option>
                <option value="Obsessive-Compulsive Disorder (OCD)">Obsessive-Compulsive Disorder (OCD)</option>
                <option value="Epilepsy">Epilepsy</option>
                <option value="Chronic Fatigue Syndrome (CFS)">Chronic Fatigue Syndrome (CFS)</option>
                <option value="Fibromyalgia">Fibromyalgia</option>
                <option value="Lupus">Lupus</option>
                <option value="Diabetes-related Disability">Diabetes-related Disability</option>
                <option value="Chronic Pain">Chronic Pain</option>
                <option value="Speech Impairment (Stuttering, Apraxia)">Speech Impairment (Stuttering, Apraxia)</option> 
                <option value="Nonverbal Communication Disabilities">Nonverbal Communication Disabilities</option>
                <option value="Rare Genetic Disorders">Rare Genetic Disorders</option>
                <option value="Autoimmune Disorders affecting mobility or cognition">Autoimmune Disorders affecting mobility or cognition</option>
                <option value="Traumatic Brain Injury (TBI)">Traumatic Brain Injury (TBI)</option>
                <option value="Physical Disability">Physical Disability</option>
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

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
      />

      <main className="relative flex lg:flex-row items-stretch m-5">
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
            <button
              className="flex items-center justify-center px-4 py-2 text-white font-poppins font-medium rounded-lg shadow-sm"
              onClick={() => navigate(-1)}
            >
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
                    onClick={handleNextStep}
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
                    onClick={() =>
                      console.log("Submit Clicked:", isUpdatingProfileInfo)
                    }
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
