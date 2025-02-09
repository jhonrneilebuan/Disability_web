import { motion } from "framer-motion";
import { CircleCheck, Undo2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Sidebar from "../components/Sidebar";
import { jobStore } from "../stores/jobStore";

const JobPosts = () => {
  const navigate = useNavigate();
  const [showApplyLink, setShowApplyLink] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedDisabilities, setSelectedDisabilities] = useState([]);

  const {
    //isLoading,
    //error,
    createJob,
  } = jobStore();

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (newSkill && !skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleCreateJob = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const companyName = formData.get("companyName")?.trim();
    const jobTitle = formData.get("jobTitle")?.trim();
    const jobDescription = formData.get("jobDescription")?.trim();
    const jobCategory = formData.get("jobCategory");
    const applicationDeadline = formData.get("applicationDeadline");
    const jobQualifications = formData.get("jobQualifications");
    const jobExperience = formData.get("jobExperience");
    const jobType = formData.get("jobType");
    const jobShift = formData.get("jobShift");
    const jobLevel = formData.get("jobLevel");
    const minSalary = parseFloat(formData.get("minSalary"));
    const maxSalary = parseFloat(formData.get("maxSalary"));
    const jobAttachment = formData.get("jobAttachment");
  
    if (!companyName || companyName.length < 3) {
      return alert("Company name is required and must be at least 3 characters.");
    }
    if (!jobTitle || jobTitle.length < 3) {
      return alert("Job title is required and must be at least 3 characters.");
    }
    if (!jobDescription || jobDescription.length < 10) {
      return alert("Job description must be at least 10 characters.");
    }
    if (!jobCategory) {
      return alert("Please select a job category.");
    }
    if (!applicationDeadline) {
      return alert("Please provide an application deadline.");
    }
  
    const today = new Date();
    const deadlineDate = new Date(applicationDeadline);
    if (deadlineDate <= today) {
      return alert("The application deadline must be a future date.");
    }
  
    if (isNaN(minSalary) || isNaN(maxSalary) || minSalary < 0 || maxSalary < 0) {
      return alert("Please enter valid positive salary values.");
    }
    if (minSalary > maxSalary) {
      return alert("Min salary cannot be greater than max salary.");
    }
  
    if (jobAttachment) {
      const allowedExtensions = ["pdf", "doc", "docx"];
      const fileExtension = jobAttachment.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        return alert("Invalid file type. Only PDF, DOC, and DOCX are allowed.");
      }
    }
  
    const locations = formData.get("locations")?.split(",").map((loc) => loc.trim());
    const preferredLanguage = formData.get("preferredLanguage") || "Any";
    const applyWithLink = showApplyLink ? formData.get("applyWithLink") : null;
  
    const preferredDisabilitiesArray = selectedDisabilities.map((disability) => disability.value);
    const finalPreferredDisabilities =
      preferredDisabilitiesArray.length === 1 && preferredDisabilitiesArray[0] === "Any"
        ? []
        : preferredDisabilitiesArray;
  
    try {
      await createJob({
        companyName,
        jobTitle,
        jobDescription,
        jobCategory,
        applicationDeadline,
        locations,
        preferredLanguage,
        jobQualifications,
        jobExperience,
        jobType,
        jobShift,
        jobLevel,
        applyWithLink,
        jobSkills: skills,
        expectedSalary: { minSalary, maxSalary },
        jobAttachment,
        preferredDisabilities: finalPreferredDisabilities,
      });
  
      setIsSuccess(true);
    } catch (error) {
      console.error("Error creating job:", error);
      alert("There was an error creating your job. Please try again.");
    }
  };
  

  const disabilityOptions = [
    { value: "Any", label: "Any" },
    { value: "Mobility Impairment", label: "Mobility Impairment" },
    { value: "Amputation", label: "Amputation" },
    { value: "Cerebral Palsy", label: "Cerebral Palsy" },
    { value: "Muscular Dystrophy", label: "Muscular Dystrophy" },
    { value: "Spinal Cord Injury", label: "Spinal Cord Injury" },
    { value: "Multiple Sclerosis", label: "Multiple Sclerosis" },
    { value: "Arthritis", label: "Arthritis" },
    { value: "Stroke-related Disability", label: "Stroke-related Disability" },
    { value: "Visual Impairment", label: "Visual Impairment" },
    { value: "Blindness", label: "Blindness" },
    { value: "Hearing Impairment", label: "Hearing Impairment" },
    { value: "Deafness", label: "Deafness" },
    { value: "Deafblindness", label: "Deafblindness" },
    { value: "Down Syndrome", label: "Down Syndrome" },
    {
      value: "Autism Spectrum Disorder (ASD)",
      label: "Autism Spectrum Disorder (ASD)",
    },
    { value: "Intellectual Disability", label: "Intellectual Disability" },
    {
      value: "Learning Disability",
      label: "Learning Disability (Dyslexia, Dyscalculia, Dysgraphia)",
    },
    { value: "ADHD", label: "ADHD (Attention Deficit Hyperactivity Disorder)" },
    { value: "Dyslexia", label: "Dyslexia" },
    { value: "Dyspraxia", label: "Dyspraxia" },
    { value: "Tourette Syndrome", label: "Tourette Syndrome" },
    { value: "Anxiety Disorder", label: "Anxiety Disorder" },
    { value: "Depression", label: "Depression" },
    { value: "Bipolar Disorder", label: "Bipolar Disorder" },
    { value: "Schizophrenia", label: "Schizophrenia" },
    { value: "PTSD", label: "Post-Traumatic Stress Disorder (PTSD)" },
    { value: "OCD", label: "Obsessive-Compulsive Disorder (OCD)" },
    { value: "Epilepsy", label: "Epilepsy" },
    { value: "CFS", label: "Chronic Fatigue Syndrome (CFS)" },
    { value: "Fibromyalgia", label: "Fibromyalgia" },
    { value: "Lupus", label: "Lupus" },
    {
      value: "Diabetes-related Disability",
      label: "Diabetes-related Disability",
    },
    { value: "Chronic Pain", label: "Chronic Pain" },
    {
      value: "Speech Impairment",
      label: "Speech Impairment (Stuttering, Apraxia)",
    },
    {
      value: "Nonverbal Communication Disabilities",
      label: "Nonverbal Communication Disabilities",
    },
    { value: "Rare Genetic Disorders", label: "Rare Genetic Disorders" },
    {
      value: "Autoimmune Disorders",
      label: "Autoimmune Disorders affecting mobility or cognition",
    },
    { value: "Traumatic Brain Injury", label: "Traumatic Brain Injury (TBI)" },
  ];

  if (isSuccess) {
    return (
      <div className="h-screen font-poppins flex">
        <Sidebar />
        <div className="w-full bg-gray-50 p-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-black mb-6"
          >
            <Undo2 className="w-5 h-5 mr-2" />
            Go Back
          </button>

          <div className="flex items-center justify-center h-[85vh]">
            <div className="bg-white shadow-2xl rounded-lg p-10 mx-auto max-w-lg w-full">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CircleCheck className="h-10 w-10 text-white" />
                </motion.div>
                <p className="text-gray-800 font-semibold text-xl mb-8">
                  Job post was successfully created!
                </p>
                <button
                  onClick={() => navigate("/post-job")}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-medium"
                >
                  View Job Listings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen font-poppins flex">
      <Sidebar />
      <div className="w-full bg-gray-50 p-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-black mb-6"
        >
          <Undo2 className="w-5 h-5 mr-2" />
          Go Back
        </button>
        <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-7xl overflow-auto h-[85vh]">
          <form
            className="space-y-6 w-full"
            onSubmit={handleCreateJob}
            encType="multipart/form-data"
          >
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter company name"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter job title"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">
                Job Description
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                className="w-full border rounded-lg p-2"
                rows="4"
                placeholder="Enter job description"
              ></textarea>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Category
                </label>
                <select
                  id="jobCategory"
                  name="jobCategory"
                  className="w-full border rounded-lg p-2"
                >
                  <option value="">Select category</option>
                  <option value="DESIGN">Design</option>
                  <option value="DEVELOPMENT">Development</option>
                  <option value="MARKETING">Marketing</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Preferred Disabilities
                </label>
                <Select
                  options={disabilityOptions}
                  isMulti
                  className="w-full"
                  value={selectedDisabilities}
                  onChange={(options) => setSelectedDisabilities(options)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Application Deadline
                </label>
                <input
                  id="applicationDeadline"
                  name="applicationDeadline"
                  type="date"
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Preferred Language
                </label>
                <input
                  type="text"
                  id="preferredLanguage"
                  name="preferredLanguage"
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter preferred language"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Type
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  className="w-full border rounded-lg p-2"
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Shift
                </label>
                <select
                  id="jobShift"
                  name="jobShift"
                  className="w-full border rounded-lg p-2"
                >
                  <option value="">Select Job Shift</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Night-Shift">Night-Shift</option>
                  <option value="Day-Shift">Day-Shift</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Qualifications
                </label>
                <select
                  id="jobQualifications"
                  name="jobQualifications"
                  className="w-full border rounded-lg p-2"
                >
                  <option value="">Select qualification</option>
                  <option value="Bachelor's Degree">
                    Bachelor&apos;s Degree
                  </option>
                  <option value="High School Diploma">
                    High School Diploma
                  </option>
                  <option value="Technical Training">Technical Training</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Level
                </label>
                <select
                  id="jobLevel"
                  name="jobLevel"
                  className="w-full border rounded-lg p-2"
                >
                  <option value="">Select level</option>
                  <option value="Entry">Entry</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Min Salary
                </label>
                <input
                  type="number"
                  id="minSalary"
                  name="minSalary"
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter min salary"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Max Salary
                </label>
                <input
                  type="number"
                  id="maxSalary"
                  name="maxSalary"
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter max salary"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">
                Locations
              </label>
              <input
                type="text"
                id="locations"
                name="locations"
                className="w-full border rounded-lg p-2"
                placeholder="Enter location(s)"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Job Skills
              </label>
              <div className="w-full border rounded-lg p-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={handleSkillInputChange}
                  onKeyDown={handleSkillKeyDown}
                  className="w-full border-none outline-none"
                  placeholder="Enter skills (press ',' or 'Enter' to add)"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      className="ml-2 text-blue-700 hover:text-blue-900"
                      onClick={() => removeSkill(skill)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Attachment <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="jobAttachment"
                  name="jobAttachment"
                  accept=".pdf,.doc,.docx"
                  required
                  className="block w-full mt-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:outline-none"
                />
              </div>

              <div className="flex-1">
                <label className="flex items-center gap-4">
                  <span className="text-sm font-medium">
                    Add &quot;Apply with Link&quot; Field
                  </span>
                  <div className="relative inline-block w-10 h-6">
                    <input
                      type="checkbox"
                      id="applyWithLinkToggle"
                      name="applyWithLinkToggle"
                      checked={showApplyLink}
                      onChange={(e) => setShowApplyLink(e.target.checked)}
                      className="opacity-0 w-0 h-0 peer"
                    />
                    <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition peer-checked:bg-blue-600"></span>
                    <span className="absolute top-[3px] left-[3px] w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
                  </div>
                </label>

                {showApplyLink && (
                  <div className="mt-2">
                    <input
                      type="text"
                      id="applyWithLink"
                      name="applyWithLink"
                      className="w-full border rounded-lg p-2"
                      placeholder="Enter application link"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold focus:outline-none focus:ring focus:ring-blue-300 flex justify-center items-center"
              >
                Publish Job Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPosts;
