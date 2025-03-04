import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaBalanceScale,
  FaBook,
  FaBriefcase,
  FaBuilding,
  FaBullhorn,
  FaCheck,
  FaCode,
  FaDollarSign,
  FaFlask,
  FaHeadphones,
  FaHeart,
  FaMicrophone,
  FaPaintBrush,
  FaShoppingBag,
  FaTasks,
  FaUserCog,
  FaUsers,
  FaUserTie,
  FaWrench,
} from "react-icons/fa";
import Select from "react-select";

import { toast } from "react-toastify";
import ProgressBar from "../components/ProgressBar";

import { jobStore } from "../stores/jobStore";

const steps = [
  "Matching Jobs",
  "Matching Preferences",
  "Matching Categories & Salary",
  "Matching Location & Availability",
];

const UserProfilingPage = () => {
  const totalSteps = 9;
  const [step, setStep] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [preferences, setPreferences] = useState({
    expectedSalary: { minSalary: "", maxSalary: "" },
    jobTypes: [],
    jobQualifications: "",
    jobLevel: "",
    preferredDisability: [],
    preferredLocations: [],
    jobCategories: [],
  });
  const navigate = useNavigate();

  const { updateJobPreferences } = jobStore();
  const progressPercentage = (step / totalSteps) * 100;

  const handleArrayChange = (name, value, limit = null) => {
    setPreferences((prev) => {
      const currentValues = prev[name];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [name]: currentValues.filter((item) => item !== value),
        };
      } else if (!limit || currentValues.length < limit) {
        return { ...prev, [name]: [...currentValues, value] };
      }
      return prev;
    });
  };

  useEffect(() => {
    if (step === 9 && currentStep < steps.length && !isAnimating) {
      setIsAnimating(true);

      setTimeout(() => {
        setProgress((currentStep + 1) * 25);

        setTimeout(() => {
          setCurrentStep(currentStep + 1);
          setIsAnimating(false);
        }, 500);
      }, 1500);
    }
  }, [currentStep, step, isAnimating]);

  const handleSingleSelect = (name, value) => {
    setPreferences({ ...preferences, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      preferences.expectedSalary = {
        minSalary: Number(preferences.expectedSalary.minSalary),
        maxSalary: Number(preferences.expectedSalary.maxSalary),
      };

      await updateJobPreferences(preferences);
      toast.success("Job preferences updated successfully");
      setStep(9);
    } catch (error) {
      console.error("Error updating job preferences:", error);
      toast.error("Error updating job preferences");
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 2:
        return preferences.jobTypes.length > 0;
      case 3:
        return preferences.jobQualifications !== "";
      case 4:
        return preferences.jobLevel !== "";
      case 5:
        return preferences.preferredDisability.length > 0;
      case 6:
        return preferences.preferredLocations.length > 0;
      case 7:
        return preferences.jobCategories.length > 0;
      case 8:
        return (
          preferences.expectedSalary.minSalary !== "" &&
          preferences.expectedSalary.maxSalary !== ""
        );
      default:
        return true;
    }
  };

  const jobCategories = [
    "IT",
    "Finance",
    "Healthcare",
    "Education",
    "Design",
    "Management",
    "Marketing",
    "Sales",
    "Engineering",
    "HR",
    "Product",
    "Operations",
    "Research",
    "Legal",
    "Media",
    "Customer Support",
    "Construction",
    "Consulting",
  ];

  const categoryIcons = {
    IT: <FaCode className="w-4 h-4 mr-2 text-blue-500" />,
    Finance: <FaDollarSign className="w-4 h-4 mr-2 text-green-500" />,
    Healthcare: <FaHeart className="w-4 h-4 mr-2 text-red-500" />,
    Education: <FaBook className="w-4 h-4 mr-2 text-indigo-500" />,
    Design: <FaPaintBrush className="w-4 h-4 mr-2 text-pink-500" />,
    Management: <FaUserTie className="w-4 h-4 mr-2 text-gray-700" />,
    Marketing: <FaBullhorn className="w-4 h-4 mr-2 text-yellow-500" />,
    Sales: <FaShoppingBag className="w-4 h-4 mr-2 text-purple-500" />,
    Engineering: <FaWrench className="w-4 h-4 mr-2 text-orange-500" />,
    HR: <FaUsers className="w-4 h-4 mr-2 text-blue-600" />,
    Product: <FaBriefcase className="w-4 h-4 mr-2 text-teal-500" />,
    Operations: <FaTasks className="w-4 h-4 mr-2 text-gray-600" />,
    Research: <FaFlask className="w-4 h-4 mr-2 text-blue-400" />,
    Legal: <FaBalanceScale className="w-4 h-4 mr-2 text-brown-500" />,
    Media: <FaMicrophone className="w-4 h-4 mr-2 text-pink-600" />,
    CustomerSupport: <FaHeadphones className="w-4 h-4 mr-2 text-green-400" />,
    Construction: <FaBuilding className="w-4 h-4 mr-2 text-yellow-700" />,
    Consulting: <FaUserCog className="w-4 h-4 mr-2 text-blue-800" />,
  };

  const handleCategoryClick = (category) => {
    let updatedCategories = [...preferences.jobCategories];

    if (updatedCategories.includes(category)) {
      updatedCategories = updatedCategories.filter((item) => item !== category);
    } else if (updatedCategories.length < 3) {
      updatedCategories.push(category);
    }

    setPreferences({ ...preferences, jobCategories: updatedCategories });
  };

  const handleFinishProfiling = () => {
    navigate("/applicant");
  };

  const disabilities = [
    "Mobility Impairment",
    "Amputation",
    "Cerebral Palsy",
    "Muscular Dystrophy",
    "Spinal Cord Injury",
    "Multiple Sclerosis",
    "Arthritis",
    "Stroke-related Disability",
    "Visual Impairment",
    "Blindness",
    "Hearing Impairment",
    "Deafness",
    "Deafblindness",
    "Down Syndrome",
    "Autism Spectrum Disorder (ASD)",
    "Intellectual Disability",
    "Learning Disability (Dyslexia, Dyscalculia, Dysgraphia)",
    "ADHD (Attention Deficit Hyperactivity Disorder)",
    "Dyslexia",
    "Dyspraxia",
    "Tourette Syndrome",
    "Anxiety Disorder",
    "Depression",
    "Bipolar Disorder",
    "Schizophrenia",
    "Post-Traumatic Stress Disorder (PTSD)",
    "Obsessive-Compulsive Disorder (OCD)",
    "Epilepsy",
    "Chronic Fatigue Syndrome (CFS)",
    "Fibromyalgia",
    "Lupus",
    "Diabetes-related Disability",
    "Chronic Pain",
    "Speech Impairment (Stuttering, Apraxia)",
    "Nonverbal Communication Disabilities",
    "Rare Genetic Disorders",
    "Autoimmune Disorders affecting mobility or cognition",
    "Traumatic Brain Injury (TBI)",
    "Physical Disability",
  ].map((disability) => ({ value: disability, label: disability }));

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-white">
      <div className="w-full max-w-3xl relative flex flex-col items-start mb-6">
        <div className="flex items-center justify-between w-full mb-2 relative">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-gray-700 text-lg font-poppins"
            >
              <FaArrowLeft />
            </button>
          )}

          <img
            src="/sample-logo.png"
            alt="Logo"
            className="w-12 h-12 object-contain mx-auto"
          />

          <span className="text-sm font-medium text-gray-600 absolute right-0 font-poppins">
            {step}/{totalSteps}
          </span>
        </div>
        <ProgressBar value={progressPercentage} className="w-full" />
      </div>

      <div className="w-full max-w-3xl font-poppins text-center p-6 flex-grow ">
        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Welcome! Let&apos;s set up your job preferences.
            </h2>
            <p className="text-lg">Click Continue to start.</p>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 font-poppins">
              Select up to 3 employment options
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Full-Time",
                "Part-Time",
                "Freelance",
                "Contract",
                "Internship",
              ].map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 p-4 rounded-md border-2 transition-all cursor-pointer text-base font-poppins font-medium ${
                    preferences.jobTypes.includes(type)
                      ? "border-blue-500 shadow-md"
                      : "border-gray-100 shadow-sm"
                  }`}
                >
                  <input
                    type="checkbox"
                    onChange={() => handleArrayChange("jobTypes", type, 3)}
                    checked={preferences.jobTypes.includes(type)}
                    className="appearance-none w-6 h-6 border-2 rounded transition-all cursor-pointer 
                    border-gray-300 bg-gray-300
                    checked:border-blue-500 checked:bg-blue-500 
                    relative 
                    before:content-['✔'] before:absolute before:inset-0 before:flex before:items-center before:justify-center
                    before:text-transparent checked:before:text-white"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 font-poppins">
              Choose Your Highest Educational Qualification
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Bachelor's Degree",
                "High School Diploma",
                "Technical Training",
                "College Undergraduate",
                "Master's Degree",
                "Doctorate Degree",
              ].map((qualification) => (
                <label
                  key={qualification}
                  className={`flex items-center gap-2 p-4 rounded-md border-2 transition-all cursor-pointer text-base font-poppins font-medium ${
                    preferences.jobQualifications.includes(qualification)
                      ? "border-blue-500 shadow-md"
                      : "border-gray-100 shadow-sm"
                  }`}
                >
                  <input
                    type="radio"
                    name="jobQualifications"
                    onChange={() =>
                      handleSingleSelect("jobQualifications", qualification)
                    }
                    checked={preferences.jobQualifications === qualification}
                    className="mr-2 w-5 h-5"
                  />
                  {qualification}
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 font-poppins">
              Choose Your Career Level
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {["Entry", "Mid", "Senior", "Manager", "Officer", "Student"].map(
                (level) => (
                  <label
                    key={level}
                    className={`flex items-center gap-2 p-4 rounded-md border-2 transition-all cursor-pointer text-base font-poppins font-medium ${
                      preferences.jobLevel.includes(level)
                        ? "border-blue-500 shadow-md"
                        : "border-gray-100 shadow-md"
                    }`}
                  >
                    <input
                      type="radio"
                      name="jobLevel"
                      onChange={() => handleSingleSelect("jobLevel", level)}
                      checked={preferences.jobLevel === level}
                      className="appearance-none w-6 h-6 rounded-full transition-all cursor-pointer 
                   bg-gray-300 checked:bg-blue-500"
                    />
                    {level}
                  </label>
                )
              )}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 font-poppins">
              Specify Your Disability
            </h2>
            <img
              src="/disabilty.png"
              alt="Accessibility Illustration"
              className="w-48 h-auto m-auto"
            />

            <Select
              name="preferredDisability"
              placeholder="Select or Enter Your Disability"
              options={disabilities}
              value={disabilities.find(
                (option) => option.value === preferences.preferredDisability
              )}
              onChange={(selectedOption) =>
                setPreferences({
                  ...preferences,
                  preferredDisability: selectedOption
                    ? selectedOption.value
                    : "",
                })
              }
              className="w-full  p-2"
            />
          </div>
        )}

        {step === 6 && (
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
            <img
              src="/location.png"
              alt="Locations Illustration"
              className="w-40 h-auto mb-4"
            />

            <h2 className="text-2xl font-bold text-gray-800 mb-2 font-poppins">
              Specify Your Preferred Work Locations
            </h2>
            <p className="text-gray-600 text-sm mb-4 text-center">
              Enter the locations where you prefer to work.
            </p>

            <input
              type="text"
              placeholder="e.g., Davao City, Dagupan City, Manila"
              value={preferences.preferredLocations}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  preferredLocations: e.target.value,
                })
              }
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {step === 7 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 font-poppins">
              Select Job Categories (Up to 3)
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Choose up to three job categories that best match your skills and
              interests.
            </p>

            <div className="flex flex-wrap gap-2">
              {jobCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`flex items-center px-4 py-2 rounded-full border-2 text-sm font-medium transition-all 
            ${
              preferences.jobCategories.includes(category)
                ? "bg-blue-300 text-white border-blue-300 shadow-md"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
                >
                  {categoryIcons[category] || (
                    <FaBriefcase className="w-4 h-4 mr-2" />
                  )}
                  {category}
                </button>
              ))}
            </div>

            {preferences.jobCategories.length > 0 && (
              <div className="mt-4 ">
                <p className="text-gray-700 text-base font-poppins">
                  Selected:{" "}
                  <span className="font-semibold">
                    {preferences.jobCategories.join(", ")}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {step === 8 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 font-poppins">
              Expected Salary Range
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Specify your expected salary range.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₱</span>
                <input
                  type="number"
                  placeholder="Min Salary"
                  min="0"
                  value={preferences.expectedSalary.minSalary}
                  onChange={(e) => {
                    const minSalary = Number(e.target.value);
                    setPreferences((prev) => ({
                      ...prev,
                      expectedSalary: {
                        ...prev.expectedSalary,
                        minSalary,
                        maxSalary:
                          minSalary > prev.expectedSalary.maxSalary
                            ? minSalary
                            : prev.expectedSalary.maxSalary,
                      },
                    }));
                  }}
                  className="w-full border border-gray-300 rounded-lg p-3 pl-8 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₱</span>
                <input
                  type="number"
                  placeholder="Max Salary"
                  min={preferences.expectedSalary.minSalary}
                  value={preferences.expectedSalary.maxSalary}
                  onChange={(e) => {
                    const maxSalary = Number(e.target.value);
                    setPreferences((prev) => ({
                      ...prev,
                      expectedSalary: {
                        ...prev.expectedSalary,
                        maxSalary: Math.max(
                          prev.expectedSalary.minSalary,
                          maxSalary
                        ),
                      },
                    }));
                  }}
                  className="w-full border border-gray-300 rounded-lg p-3 pl-8 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {preferences.expectedSalary.maxSalary <
              preferences.expectedSalary.minSalary && (
              <p className="text-red-500 text-sm mt-2">
                Max salary cannot be lower than min salary.
              </p>
            )}

            {preferences.expectedSalary.minSalary &&
              preferences.expectedSalary.maxSalary && (
                <div className="mt-4 text-gray-700 text-center">
                  <p className="text-sm">
                    Your expected salary range:{" "}
                    <span className="font-semibold">
                      ₱{preferences.expectedSalary.minSalary} - ₱
                      {preferences.expectedSalary.maxSalary}
                    </span>
                  </p>
                </div>
              )}
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        {step === 8 ? (
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-black p-3 w-full rounded-md font-poppins font-semibold"
            disabled={
              !preferences.expectedSalary.minSalary ||
              !preferences.expectedSalary.maxSalary
            }
          >
            Submit
          </button>
        ) : (
          step !== 9 && (
            <button
              onClick={() => setStep(step + 1)}
              className={`bg-blue-500 text-black font-poppins font-semibold rounded p-2 py-3 w-full ${
                !isStepValid() ? "opacity-50 cursor-not-allowed bg-white" : ""
              }`}
              disabled={!isStepValid()}
            >
              Continue
            </button>
          )
        )}

        {step === 9 && (
          <div className="flex flex-col items-center justify-center h-screen p-6 bg-white">
            <h2 className="absolute top-6 mt-28 left-1/2 transform -translate-x-1/2 w-full text-center text-4xl font-extrabold font-poppins">
              Preparing Your Profile for the Best Job Recommendations
            </h2>

            <div className="w-full max-w-md relative ">
              <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden ">
                <motion.div
                  className="absolute h-full bg-blue-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </div>

              <motion.div
                className="absolute -top-10 transform -translate-x-1/2 flex flex-col items-center"
                initial={{ left: "0%" }}
                animate={{ left: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white  font-bold font-poppins text-xs shadow-md relative">
                  {progress}%
                  <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-blue-500"></div>
                </div>
              </motion.div>

              <div className="mt-6 space-y-4">
                {steps.map((label, index) => {
                  const isActive = currentStep > index;

                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 text-lg font-extrabold font-poppins"
                      initial={{ opacity: 0, y: -10 }}
                      animate={isActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: isActive ? 0.6 : 0 }}
                    >
                      <motion.div
                        className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-300"
                        }`}
                        initial={{ scale: 0 }}
                        animate={isActive ? { scale: 1.1 } : {}}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: isActive ? 0.8 : 0,
                        }}
                      >
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 1 }}
                          >
                            <FaCheck size={12} className="text-white" />{" "}
                          </motion.span>
                        )}
                      </motion.div>

                      <motion.span
                        initial={{ opacity: 0.3, color: "#9CA3AF" }}
                        animate={isActive ? { opacity: 1, color: "#000" } : {}}
                        transition={{
                          duration: 0.6,
                          delay: isActive ? 0.5 : 0,
                        }}
                      >
                        {label}
                      </motion.span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {progress === 100 && (
              <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] flex justify-center">
                <motion.button
                  onClick={handleFinishProfiling}
                  className="bg-blue-500 text-black font-poppins font-semibold rounded p-2 py-3 w-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Continue
                </motion.button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilingPage;
