import { useEffect, useState } from "react";
import Select from "react-select";
import { jobStore } from "../stores/jobStore";
import { locationOptions } from "../utils/options";

const jobCategories = [
  "DESIGN",
  "DEVELOPMENT",
  "MARKETING",
  "SALES",
  "ENGINEERING",
  "HR",
  "FINANCE",
  "MANAGEMENT",
  "PRODUCT",
  "CUSTOMER_SUPPORT",
  "OPERATIONS",
  "RESEARCH",
  "EDUCATION",
  "ADMINISTRATION",
  "IT",
  "CONSULTING",
  "HEALTHCARE",
  "CONSTRUCTION",
  "LEGAL",
  "ART",
  "MEDIA",
].map((category) => ({ value: category, label: category }));

const jobTypes = [
  "Full-Time",
  "Part-Time",
  "Freelance",
  "Contract",
  "Internship",
].map((type) => ({ value: type, label: type }));

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
  "ADHD",
  "Anxiety Disorder",
  "Depression",
  "Bipolar Disorder",
  "Schizophrenia",
].map((disability) => ({ value: disability, label: disability }));

const jobLevels = [
  "Entry",
  "Mid",
  "Senior",
  "Manager",
  "Officer",
  "Student",
].map((level) => ({ value: level, label: level }));

const jobQualificationsOptions = [
  "Bachelor's Degree",
  "High School Diploma",
  "Technical Training",
  "College Undergraduate",
  "Master's Degree",
  "Doctorate Degree",
].map((qual) => ({ value: qual, label: qual }));

const JobPreferencesModal = ({ isOpen, onClose }) => {
  const {
    jobPreferences,
    getJobPreferences,
    updateJobPreferences,
    isJobPreferencesLoading,
  } = jobStore();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    jobCategories: [],
    jobTypes: [],
    preferredLocations: null,
    preferredDisability: null,
    expectedSalary: { minSalary: "", maxSalary: "" },
    jobQualifications: null,
    jobLevel: null,
  });

  useEffect(() => {
    if (isOpen) {
      getJobPreferences();
    }
  }, [isOpen, getJobPreferences]);

  useEffect(() => {
    if (jobPreferences) {
      setFormData({
        jobCategories:
          jobPreferences.jobCategories?.map((c) =>
            jobCategories.find((item) => item.value === c)
          ) || [],
        jobTypes:
          jobPreferences.jobTypes?.map((t) =>
            jobTypes.find((item) => item.value === t)
          ) || [],
        preferredLocations: jobPreferences.preferredLocations || "",
        preferredDisability:
          disabilities.find(
            (d) => d.value === jobPreferences.preferredDisability
          ) || null,
        jobLevel:
          jobLevels.find((l) => l.value === jobPreferences.jobLevel) || null,
        jobQualifications: jobPreferences.jobQualifications || "",
        expectedSalary: jobPreferences.expectedSalary || {
          minSalary: "",
          maxSalary: "",
        },
      });
    }
  }, [jobPreferences]);

  const handleChange = (selectedOption, { name }) => {
    setFormData({ ...formData, [name]: selectedOption });
  };

  const handleMultiChange = (selectedOptions, { name }) => {
    setFormData({ ...formData, [name]: selectedOptions || [] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "minSalary" || name === "maxSalary") {
      setFormData((prevData) => ({
        ...prevData,
        expectedSalary: { ...prevData.expectedSalary, [name]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const preparedData = {
      jobCategories: formData.jobCategories?.map((c) => c.value) || [],
      jobTypes: formData.jobTypes?.map((t) => t.value) || [],
      preferredLocations: formData.preferredLocations?.value || "",
      preferredDisability: formData.preferredDisability?.value || "",
      expectedSalary: {
        minSalary: Number(formData.expectedSalary.minSalary) || 0,
        maxSalary: Number(formData.expectedSalary.maxSalary) || 0,
      },
      jobQualifications: formData.jobQualifications?.value || "",
      jobLevel: formData.jobLevel?.value || "",
    };

    await updateJobPreferences(preparedData);
    onClose();
    window.location.reload();
  };

  if (!isOpen) return null;

  const validateForm = () => {
    let newErrors = {};

    if (!formData.preferredLocations || !formData.preferredLocations.value) {
      newErrors.preferredLocations = "Location is required.";
    }

    if (!formData.jobQualifications || !formData.jobQualifications.value) {
      newErrors.jobQualifications = "Qualifications are required.";
    }

    const minSalary =
      formData.expectedSalary.minSalary.trim() === ""
        ? NaN
        : Number(formData.expectedSalary.minSalary);
    const maxSalary =
      formData.expectedSalary.maxSalary.trim() === ""
        ? NaN
        : Number(formData.expectedSalary.maxSalary);

    if (isNaN(minSalary) || isNaN(maxSalary)) {
      newErrors.expectedSalary = "Salary values must be numbers.";
    } else if (minSalary < 0 || maxSalary < 0) {
      newErrors.expectedSalary = "Salary values cannot be negative.";
    } else if (minSalary > maxSalary) {
      newErrors.expectedSalary =
        "Min salary cannot be greater than max salary.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: state.isFocused ? "#007bff" : "#ccc",
      color: "black",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 123, 255, 0.2)" : "none",
      "&:hover": {
        borderColor: "#007bff",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#007bff"
        : state.isFocused
        ? "#cce5ff"
        : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "#cce5ff",
      },
    }),
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-10 rounded-lg w-2/3 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-black font-poppins">
          Edit Job Preferences
        </h2>

        {isJobPreferencesLoading ? (
          <p className="font-poppins">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2 w-full">
              <Select
                name="jobCategories"
                options={jobCategories}
                onChange={handleMultiChange}
                value={formData.jobCategories}
                placeholder="Select Job Categories"
                className="w-full flex-1 text-black font-poppins"
                styles={customStyles}
                isMulti
              />
              <Select
                name="jobTypes"
                options={jobTypes}
                onChange={handleMultiChange}
                value={formData.jobTypes}
                placeholder="Select Job Types"
                className="w-full flex-1 text-black font-poppins"
                styles={customStyles}
                isMulti
              />
            </div>

            <Select
              name="preferredLocations"
              options={locationOptions}
              onChange={handleChange}
              value={formData.preferredLocations}
              placeholder="Select Preferred Location"
              styles={customStyles}
              className=" text-black font-poppins"
            />
            {errors.preferredLocations && (
              <p className="text-red-500 text-center font-poppins">
                {errors.preferredLocations}
              </p>
            )}

            <Select
              name="preferredDisability"
              options={disabilities}
              onChange={handleChange}
              value={formData.preferredDisability}
              placeholder="Select Preferred Disability"
              styles={customStyles}
              className=" text-black font-poppins"
            />

            <Select
              name="jobLevel"
              options={jobLevels}
              onChange={handleChange}
              value={formData.jobLevel}
              placeholder="Select Job Level"
              className=" text-black font-poppins"
            />

            <Select
              name="jobQualifications"
              options={jobQualificationsOptions}
              onChange={handleChange}
              value={formData.jobQualifications}
              placeholder="Select Job Qualifications"
              styles={customStyles}
              className=" text-black font-poppins"
            />

            <div className="flex space-x-2">
              <input
                type="number"
                name="minSalary"
                placeholder="Min Salary"
                value={formData.expectedSalary.minSalary}
                onChange={handleInputChange}
                className="w-1/2 border p-2 rounded text-black font-poppins  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]"
              />
              <input
                type="number"
                name="maxSalary"
                placeholder="Max Salary"
                value={formData.expectedSalary.maxSalary}
                onChange={handleInputChange}
                className="w-1/2 border p-2 rounded  text-black font-poppins  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]"
              />
            </div>
            {errors.expectedSalary && (
              <p className="text-red-500 text-center font-poppins">
                {errors.expectedSalary}
              </p>
            )}

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 w-full bg-gray-700 text-white rounded font-poppins"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 w-full bg-blue-600 text-white rounded font-poppins"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobPreferencesModal;
