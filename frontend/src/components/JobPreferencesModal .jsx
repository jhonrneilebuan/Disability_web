import { useEffect, useState } from "react";
import Select from "react-select";
import { jobStore } from "../stores/jobStore";
import { locationOptions } from "../utils/options";
const jobCategories = [
  "ALL",
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
  "Any",
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

const JobPreferencesModal = ({ isOpen, onClose }) => {
  const {
    jobPreferences,
    getJobPreferences,
    updateJobPreferences,
    isJobPreferencesLoading,
  } = jobStore();

  const [formData, setFormData] = useState({
    jobCategories: [],
    jobTypes: [],
    preferredLocations: "",
    preferredDisability: null,
    expectedSalary: { minSalary: "", maxSalary: "" },
    jobQualifications: "",
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

    const preparedData = {
      jobCategories: formData.jobCategories?.map((c) => c.value) || [],
      jobTypes: formData.jobTypes?.map((t) => t.value) || [],
      preferredLocations: formData.preferredLocations,
      preferredDisability: formData.preferredDisability?.value || "",
      expectedSalary: {
        minSalary: Number(formData.expectedSalary.minSalary) || 0,
        maxSalary: Number(formData.expectedSalary.maxSalary) || 0,
      },
      jobQualifications: formData.jobQualifications,
      jobLevel: formData.jobLevel?.value || "",
    };

    await updateJobPreferences(preparedData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Edit Job Preferences
        </h2>

        {isJobPreferencesLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <Select
                name="jobCategories"
                options={jobCategories}
                onChange={handleMultiChange}
                value={formData.jobCategories}
                placeholder="Select up to 3 Job Categories"
                className="w-full"
                isMulti
                closeMenuOnSelect={false}
                isOptionDisabled={() => formData.jobCategories.length >= 3}
              />

              <Select
                name="jobTypes"
                options={jobTypes}
                onChange={handleMultiChange}
                value={formData.jobTypes}
                placeholder="Select up to 3 Job Types"
                className="w-full"
                isMulti
                closeMenuOnSelect={false}
                isOptionDisabled={() => formData.jobTypes.length >= 3}
              />

              <Select
                name="preferredLocations"
                options={locationOptions}
                onChange={handleChange}
                value={formData.preferredLocations}
                placeholder="Select Preferred Location"
                className="w-full text-black font-poppins"
              />

              <Select
                name="preferredDisability"
                options={disabilities}
                onChange={handleChange}
                value={formData.preferredDisability}
                placeholder="Select Preferred Disability"
                className="w-full"
              />

              <Select
                name="jobLevel"
                options={jobLevels}
                onChange={handleChange}
                value={formData.jobLevel}
                placeholder="Select Job Level"
                className="w-full"
              />

              <input
                type="text"
                name="jobQualifications"
                placeholder="Job Qualifications"
                value={formData.jobQualifications}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-lg text-black"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="minSalary"
                  placeholder="Min Salary"
                  value={formData.expectedSalary.minSalary}
                  onChange={handleInputChange}
                  className="w-full border p-3 rounded-lg text-black"
                />
                <input
                  type="number"
                  name="maxSalary"
                  placeholder="Max Salary"
                  value={formData.expectedSalary.maxSalary}
                  onChange={handleInputChange}
                  className="w-full border p-3 rounded-lg text-black"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-500 text-white rounded-2xl hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600"
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
