import { useFormik } from "formik";
import { motion } from "framer-motion";
import { CircleCheck, Undo2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Sidebar from "../components/Sidebar";
import { jobStore } from "../stores/jobStore";
import {
  disabilityOptions,
  jobCategoryOptions,
  jobLevelOptions,
  jobQualificationsOptions,
  jobShiftOptions,
  jobTypeOptions,
  languageOptions,
} from "../utils/options";
import jobPostSchema from "../validations/jobpost";

const JobPosts = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const { createJob } = jobStore();
  const [inputValue, setInputValue] = useState("");

  const formik = useFormik({
    initialValues: {
      companyName: "",
      jobTitle: "",
      jobDescription: "",
      jobCategory: "",
      applicationDeadline: "",
      locations: "",
      preferredLanguages: [],
      jobQualifications: "",
      jobType: "",
      jobShift: "",
      jobLevel: "",
      expectedSalary: {
        minSalary: 0,
        maxSalary: 0,
      },
      jobSkills: [],
      jobAttachment: null,
      applyWithLink: "",
      preferredDisabilities: [],
      showApplyLink: false,
    },
    validationSchema: jobPostSchema,
    onSubmit: async (values) => {
      console.log("Formik onSubmit triggered with values:", values);
      try {
        const jobData = {
          ...values,
          preferredLanguages: values.preferredLanguages
            ? values.preferredLanguages.map((language) => language.value)
            : ["Any"],
          preferredDisabilities: values.preferredDisabilities.map(
            (disability) => disability.value
          ),
        };
        console.log("Prepared jobData for submission:", jobData);
        await createJob(jobData);
        console.log("Job created successfully");
        setIsSuccess(true);
      } catch (error) {
        console.error("Error creating job:", error);
        console.error("Response data:", error.response?.data);
      }
    },
  });

  console.log("Formik values:", formik.values);
  console.log("Formik errors:", formik.errors);
  console.log("Formik touched:", formik.touched);

  const handleSkillInputChange = (e) => {
    if ((e.key === "," || e.key === "Enter") && inputValue.trim()) {
      addSkill(inputValue);
    }
  };

  const handleDropdownChange = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill) addSkill(selectedSkill);
  };

  const addSkill = (skill) => {
    if (skill && !formik.values.jobSkills.includes(skill)) {
      formik.setFieldValue("jobSkills", [...formik.values.jobSkills, skill]);
    }
    setInputValue("");
  };

  const removeSkill = (skillToRemove) => {
    formik.setFieldValue(
      "jobSkills",
      formik.values.jobSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const predefinedSkills = [
    "Software Development",
    "Cybersecurity",
    "Cloud Computing ",
    "Data Analysis & Visualization",
    "System Administration",
    "Patient Care & Safety",
    "Medical Coding & Billing",
    "Healthcare Administration",
    "Clinical Research",
    "Nursing & Clinical Support",
    "Financial Analysis",
    "Accounting & Bookkeeping",
    "Budgeting & Forecasting",
    "Investment Management",
    "Risk Management",
    "Project Management",
    "Team Leadership",
    "Strategic Planning",
    "Operations Management",
    "Performance Evaluation",
    "Curriculum Development",
    "Classroom Management",
    "E-Learning & Educational Technology",
    "Instructional Design",
    "Student Assessment",
    "Graphic Design",
    "UI/UX Design",
    "Product & Industrial Design",
    "Web & Mobile Design",
    "Animation & Motion Graphics",
    "Digital Marketing",
    "Content Marketing",
    "Social Media Marketing",
    "Market Research & Analysis",
    "Email Marketing & Automation",
    "B2B/B2C Sales Strategies",
    "Lead Generation & Prospecting",
    "Negotiation & Closing",
  ];

  if (isSuccess) {
    console.log("Success screen rendered");
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
            onSubmit={formik.handleSubmit}
            className="space-y-6 w-full"
            encType="multipart/form-data"
          >
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter company name"
                />
                {formik.touched.companyName && formik.errors.companyName && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.companyName}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formik.values.jobTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter job title"
                />
                {formik.touched.jobTitle && formik.errors.jobTitle && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.jobTitle}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="jobDescription"
                value={formik.values.jobDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border rounded-lg p-2"
                rows="4"
                placeholder="Enter job description"
              />
              {formik.touched.jobDescription &&
                formik.errors.jobDescription && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.jobDescription}
                  </p>
                )}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Category <span className="text-red-500">*</span>
                </label>
                <Select
                  name="jobCategory"
                  options={jobCategoryOptions}
                  value={jobCategoryOptions.find(
                    (option) => option.value === formik.values.jobCategory
                  )}
                  onChange={(selectedOption) =>
                    formik.setFieldValue(
                      "jobCategory",
                      selectedOption ? selectedOption.value : ""
                    )
                  }
                  onBlur={() => formik.setFieldTouched("jobCategory", true)}
                  className="w-full"
                />
                {formik.touched.jobCategory && formik.errors.jobCategory && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.jobCategory}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Preferred Disabilities<span className="text-red-500">*</span>
                </label>
                <Select
                  options={disabilityOptions}
                  isMulti
                  value={formik.values.preferredDisabilities}
                  onChange={(selected) =>
                    formik.setFieldValue("preferredDisabilities", selected)
                  }
                  onBlur={formik.handleBlur}
                  className="w-full"
                />
                {formik.touched.preferredDisabilities &&
                  formik.errors.preferredDisabilities && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.preferredDisabilities}
                    </p>
                  )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Application Deadline <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formik.values.applicationDeadline}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-lg p-2"
                />
                {formik.touched.applicationDeadline &&
                  formik.errors.applicationDeadline && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.applicationDeadline}
                    </p>
                  )}
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Preferred Languages<span className="text-red-500">*</span>
                </label>
                <Select
                  options={languageOptions}
                  isMulti
                  value={formik.values.preferredLanguages}
                  onChange={(selected) =>
                    formik.setFieldValue("preferredLanguages", selected)
                  }
                  onBlur={() =>
                    formik.setFieldTouched("preferredLanguages", true)
                  }
                  className="w-full"
                />
                {formik.touched.preferredLanguages &&
                  formik.errors.preferredLanguages && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.preferredLanguages}
                    </p>
                  )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Type <span className="text-red-500">*</span>
                </label>
                <Select
                  name="jobType"
                  options={jobTypeOptions}
                  value={jobTypeOptions.find(
                    (option) => option.value === formik.values.jobType
                  )}
                  onChange={(selectedOption) =>
                    formik.setFieldValue(
                      "jobType",
                      selectedOption ? selectedOption.value : ""
                    )
                  }
                  onBlur={() => formik.setFieldTouched("jobType", true)}
                  className="w-full"
                />
                {formik.touched.jobType && formik.errors.jobType && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.jobType}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Shift <span className="text-red-500">*</span>
                </label>
                <Select
                  name="jobShift"
                  options={jobShiftOptions}
                  value={jobShiftOptions.find(
                    (option) => option.value === formik.values.jobShift
                  )}
                  onChange={(selectedOption) =>
                    formik.setFieldValue(
                      "jobShift",
                      selectedOption ? selectedOption.value : ""
                    )
                  }
                  onBlur={() => formik.setFieldTouched("jobShift", true)}
                  className="w-full"
                />
                {formik.touched.jobShift && formik.errors.jobShift && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.jobShift}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Qualifications <span className="text-red-500">*</span>
                </label>
                <Select
                  name="jobQualifications"
                  options={jobQualificationsOptions}
                  value={jobQualificationsOptions.find(
                    (option) => option.value === formik.values.jobQualifications
                  )}
                  onChange={(selectedOption) =>
                    formik.setFieldValue(
                      "jobQualifications",
                      selectedOption ? selectedOption.value : ""
                    )
                  }
                  onBlur={() =>
                    formik.setFieldTouched("jobQualifications", true)
                  }
                  className="w-full"
                />
                {formik.touched.jobQualifications &&
                  formik.errors.jobQualifications && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.jobQualifications}
                    </p>
                  )}
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Level <span className="text-red-500">*</span>
                </label>
                <Select
                  name="jobLevel"
                  options={jobLevelOptions}
                  value={jobLevelOptions.find(
                    (option) => option.value === formik.values.jobLevel
                  )}
                  onChange={(selectedOption) =>
                    formik.setFieldValue(
                      "jobLevel",
                      selectedOption ? selectedOption.value : ""
                    )
                  }
                  onBlur={() => formik.setFieldTouched("jobLevel", true)}
                  className="w-full"
                />
                {formik.touched.jobLevel && formik.errors.jobLevel && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.jobLevel}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Minimum Salary <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="expectedSalary.minSalary"
                  value={formik.values.expectedSalary.minSalary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter minimum salary"
                />
                {formik.touched.expectedSalary?.minSalary &&
                  formik.errors.expectedSalary?.minSalary && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.expectedSalary.minSalary}
                    </p>
                  )}
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Maximum Salary <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="expectedSalary.maxSalary"
                  value={formik.values.expectedSalary.maxSalary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter maximum salary"
                />
                {formik.touched.expectedSalary?.maxSalary &&
                  formik.errors.expectedSalary?.maxSalary && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.expectedSalary.maxSalary}
                    </p>
                  )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Locations <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="locations"
                value={formik.values.locations}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border rounded-lg p-2"
                placeholder="Enter location(s)"
              />
              {formik.touched.locations && formik.errors.locations && (
                <p className="text-red-500 text-sm">
                  {formik.errors.locations}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Job Skills <span className="text-red-500">*</span>
              </label>

              <div className="flex w-full gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleSkillInputChange}
                  className="flex-1 border rounded-lg p-2 outline-none"
                  placeholder="Input skills"
                />
                <button
                  type="button"
                  onClick={() => addSkill(inputValue)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                >
                  Add
                </button>
              </div>

              <select
                onChange={handleDropdownChange}
                className="w-full mt-2 p-2 border rounded-lg"
              >
                <option value="">Select a skill</option>
                {predefinedSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>

              {formik.touched.jobSkills && formik.errors.jobSkills && (
                <p className="text-red-500 text-sm">
                  {formik.errors.jobSkills}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mt-2">
                {formik.values.jobSkills.map((skill, index) => (
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
                <label className="block text-sm font-medium text-gray-700">
                  Job Attachment <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="jobAttachment"
                  onChange={(e) =>
                    formik.setFieldValue(
                      "jobAttachment",
                      e.currentTarget.files[0]
                    )
                  }
                  onBlur={formik.handleBlur}
                  className="block w-full mt-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:outline-none"
                />
                {formik.touched.jobAttachment &&
                  formik.errors.jobAttachment && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.jobAttachment}
                    </p>
                  )}
              </div>

              <div className="flex-1">
                <label className="flex items-center gap-4">
                  <span className="text-sm font-medium">
                    Apply with Link Field
                  </span>
                  <div className="relative inline-block w-10 h-6">
                    <input
                      type="checkbox"
                      name="showApplyLink"
                      checked={formik.values.showApplyLink}
                      onChange={(e) =>
                        formik.setFieldValue("showApplyLink", e.target.checked)
                      }
                      className="opacity-0 w-0 h-0 peer"
                    />
                    <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition peer-checked:bg-blue-600"></span>
                    <span className="absolute top-[3px] left-[3px] w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
                  </div>
                </label>

                {formik.values.showApplyLink && (
                  <div className="mt-2">
                    <input
                      type="text"
                      name="applyWithLink"
                      value={formik.values.applyWithLink}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full border rounded-lg p-2"
                      placeholder="Enter application link"
                    />
                    {formik.touched.applyWithLink &&
                      formik.errors.applyWithLink && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.applyWithLink}
                        </p>
                      )}
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
