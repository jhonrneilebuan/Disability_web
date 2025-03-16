import { useFormik } from "formik";
import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { useState } from "react";
import Select from "react-select";
import Modal from "../components/Modal";
import { jobStore } from "../stores/jobStore";
import {
  disabilityOptions,
  jobCategoryOptions,
  jobLevelOptions,
  jobQualificationsOptions,
  jobShiftOptions,
  jobTypeOptions,
  languageOptions,
  locationOptions,
} from "../utils/options";
import jobPostSchema from "../validations/jobpost";

const UpdateModal = ({ open, onClose, job }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { updateJob, getEmployerJobs } = jobStore();
  const [keepPreviousAttachment, setKeepPreviousAttachment] = useState(true);
  const [showFileInput, setShowFileInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [showApplyWithLink, setShowApplyWithLink] = useState(
    !!job?.applyWithLink
  );

  const formik = useFormik({
    initialValues: {
      jobTitle: job?.jobTitle || "",
      companyName: job?.companyName || "",
      jobDescription: job?.jobDescription || "",
      jobCategory: job?.jobCategory || "",
      applicationDeadline: job?.applicationDeadline
        ? new Date(job.applicationDeadline).toISOString().split("T")[0]
        : "",
      preferredLanguages: Array.isArray(job?.preferredLanguages)
        ? job.preferredLanguages.map((lang) => ({ label: lang, value: lang }))
        : [],
      preferredDisabilities: job?.preferredDisabilities
        ? job.preferredDisabilities.map((disability) => ({
            label: disability,
            value: disability,
          }))
        : [],
      jobSkills: Array.isArray(job?.jobSkills)
        ? job.jobSkills.length === 1 && typeof job.jobSkills[0] === "string"
          ? job.jobSkills[0].split(",").map((skill) => skill.trim())
          : job.jobSkills
        : typeof job?.jobSkills === "string"
        ? job.jobSkills.split(",").map((skill) => skill.trim())
        : [],

      applyWithLink: job?.applyWithLink || "",
      jobType: job?.jobType || "",
      jobShift: job?.jobShift || "",
      jobQualifications: job?.jobQualifications || "",
      jobLevel: job?.jobLevel || "",
      expectedSalary: {
        minSalary: job?.expectedSalary?.minSalary || 0,
        maxSalary: job?.expectedSalary?.maxSalary || 0,
      },
      locations: Array.isArray(job?.locations)
        ? job.locations.join(", ")
        : job?.locations || "",
      jobAttachment: null,
      previousAttachment: job?.jobAttachment,
    },

    enableReinitialize: true,
    validationSchema: jobPostSchema(keepPreviousAttachment),
    onSubmit: async (values) => {
      try {
        const jobData = {
          ...values,
          preferredLanguages: values.preferredLanguages.map(
            (lang) => lang.value
          ),
          preferredDisabilities: values.preferredDisabilities.map(
            (disability) => disability.value
          ),
          jobAttachment:
            values.jobAttachment ||
            (keepPreviousAttachment ? values.previousAttachment : null),
        };

        const updatedJob = await updateJob(job._id, jobData);
        setIsSuccess(true);
        formik.setFieldValue("previousAttachment", updatedJob.jobAttachment);
        formik.setFieldValue("jobAttachment", null);
        setKeepPreviousAttachment(true);
        console.log("Final job data being sent:", jobData);
        await getEmployerJobs();
      } catch (error) {
        console.error("Error updating job:", error);
      }
    },
  });

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
    "Cloud Computing",
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
    "Project Management ",
    "Team Leadership",
    "Strategic Planning",
    "Operations Management",
    "Performance Evaluation",
    "Curriculum Development",
    "Classroom Management",
    "E-Learning & Educational Technology",
    "Instructional Design",
    "Student Assessment",
    "Graphic Design ",
    "UI/UX Design",
    "Product & Industrial Design",
    "Web & Mobile Design",
    "Animation & Motion Graphics",
    "Digital Marketing ",
    "Content Marketing",
    "Social Media Marketing",
    "Market Research & Analysis",
    "Email Marketing & Automation",
    "B2B/B2C Sales Strategies",
    "Lead Generation & Prospecting",
    "Negotiation & Closing",
  ];

  if (isSuccess) {
    return (
      <Modal open={open} onClose={onClose}>
        <div className="bg-white rounded-lg p-10 mx-auto max-w-lg w-full">
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
              Job updated successfully!
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-8 bg-white rounded-lg w-[800px] max-h-[80vh] overflow-y-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6 w-full font-poppins"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8 tracking-wide">
            Update Job
          </h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium block mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formik.values.companyName}
                onChange={(e) => {
                  formik.handleChange(e);
                  console.log("Company Name:", e.target.value);
                }}
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
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formik.values.jobTitle}
                onChange={(e) => {
                  formik.handleChange(e);
                  console.log("Job Title:", e.target.value);
                }}
                onBlur={formik.handleBlur}
                className="w-full border rounded-lg p-2"
                placeholder="Enter job title"
              />
              {formik.touched.jobTitle && formik.errors.jobTitle && (
                <p className="text-red-500 text-sm">{formik.errors.jobTitle}</p>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">
              Job Description
            </label>
            <textarea
              name="jobDescription"
              value={formik.values.jobDescription}
              onChange={(e) => {
                formik.handleChange(e);
                console.log("Job Description:", e.target.value);
              }}
              onBlur={formik.handleBlur}
              className="w-full border rounded-lg p-2"
              placeholder="Enter job description"
            />
            {formik.touched.jobDescription && formik.errors.jobDescription && (
              <p className="text-red-500 text-sm">
                {formik.errors.jobDescription}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">
              Job Category
            </label>
            <Select
              name="jobCategory"
              options={jobCategoryOptions}
              value={jobCategoryOptions.find(
                (option) => option.value === formik.values.jobCategory
              )}
              onChange={(selectedOption) => {
                formik.setFieldValue(
                  "jobCategory",
                  selectedOption ? selectedOption.value : ""
                );
              }}
              onBlur={() => formik.setFieldTouched("jobCategory", true)}
              className="w-full"
            />
            {formik.touched.jobCategory && formik.errors.jobCategory && (
              <p className="text-red-500 text-sm">
                {formik.errors.jobCategory}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">
              Preferred Disabilities
            </label>
            <Select
              options={disabilityOptions}
              isMulti
              value={formik.values.preferredDisabilities}
              onChange={(selected) => {
                formik.setFieldValue("preferredDisabilities", selected);
                console.log("Preferred Disabilities:", selected);
              }}
              onBlur={formik.handleBlur}
              className="w-full"
              placeholder="Select preferred disabilities"
            />
            {formik.touched.preferredDisabilities &&
              formik.errors.preferredDisabilities && (
                <p className="text-red-500 text-sm">
                  {formik.errors.preferredDisabilities}
                </p>
              )}
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">
              Application Deadline
            </label>
            <input
              type="date"
              name="applicationDeadline"
              value={formik.values.applicationDeadline}
              onChange={(e) => {
                formik.handleChange(e);
                console.log("Application Deadline:", e.target.value);
              }}
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

          <div>
            <label className="text-sm font-medium block mb-2">
              Preferred Languages
            </label>
            <Select
              options={languageOptions}
              value={formik.values.preferredLanguages}
              onChange={(selected) => {
                formik.setFieldValue("preferredLanguages", selected);
                console.log("Preferred Languages:", selected);
              }}
              onBlur={formik.handleBlur}
              isMulti
              isClearable
              className="w-full"
              placeholder="Select preferred languages"

            />
            {formik.touched.preferredLanguages &&
              formik.errors.preferredLanguages && (
                <p className="text-red-500 text-sm">
                  {formik.errors.preferredLanguages}
                </p>
              )}
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Job Type</label>
            <Select
              name="jobType"
              options={jobTypeOptions}
              value={jobTypeOptions.find(
                (option) => option.value === formik.values.jobType
              )}
              onChange={(selectedOption) => {
                formik.setFieldValue(
                  "jobType",
                  selectedOption ? selectedOption.value : ""
                );
              }}
              onBlur={() => formik.setFieldTouched("jobType", true)}
              className="w-full"
            />
            {formik.touched.jobType && formik.errors.jobType && (
              <p className="text-red-500 text-sm">{formik.errors.jobType}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Job Shift</label>
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
              <p className="text-red-500 text-sm">{formik.errors.jobShift}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">
              Job Qualifications
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
              onBlur={() => formik.setFieldTouched("jobQualifications", true)}
              className="w-full"
            />
            {formik.touched.jobQualifications &&
              formik.errors.jobQualifications && (
                <p className="text-red-500 text-sm">
                  {formik.errors.jobQualifications}
                </p>
              )}
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Job Level</label>
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
              <p className="text-red-500 text-sm">{formik.errors.jobLevel}</p>
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium block mb-2">
                Min Salary
              </label>
              <input
                type="number"
                name="expectedSalary.minSalary"
                value={formik.values.expectedSalary.minSalary}
                onChange={(e) => {
                  formik.handleChange(e);
                  console.log("Min Salary:", e.target.value);
                }}
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
                Max Salary
              </label>
              <input
                type="number"
                name="expectedSalary.maxSalary"
                value={formik.values.expectedSalary.maxSalary}
                onChange={(e) => {
                  formik.handleChange(e);
                  console.log("Max Salary:", e.target.value);
                }}
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
            <label className="text-sm font-medium block mb-2">Locations</label>
            <Select
              options={locationOptions}
              value={
                formik.values.locations
                  ? {
                      label: formik.values.locations,
                      value: formik.values.locations,
                    }
                  : null
              }
              onChange={(selectedOption) => {
                formik.setFieldValue("locations", selectedOption.value);
                console.log("Locations:", selectedOption.value);
              }}
              onBlur={formik.handleBlur}
              placeholder="Select a location"
              className="block w-full mt-1 text-sm text-gray-600 border border-gray-300 rounded-md"
            />
            {formik.touched.locations && formik.errors.locations && (
              <div className="text-red-500 text-sm">
                {formik.errors.locations}
              </div>
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
              <p className="text-red-500 text-sm">{formik.errors.jobSkills}</p>
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
          <div>
            <label className="text-sm font-medium block mb-2">
              Job Attachment
            </label>
            {formik.values.previousAttachment &&
              !formik.values.jobAttachment && (
                <div className="mt-2 flex items-center">
                  <span className="text-sm text-gray-600">
                    Previously attached:
                  </span>
                  <a
                    href={formik.values.previousAttachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-500 hover:underline text-sm"
                  >
                    View File
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      formik.setFieldValue("jobAttachment", null);
                      setKeepPreviousAttachment(false);
                      setShowFileInput(true);
                    }}
                    className="ml-2 text-red-500 hover:text-red-700 text-sm"
                  >
                    Change File
                  </button>
                </div>
              )}
            {showFileInput && (
              <input
                type="file"
                name="jobAttachment"
                onChange={(e) => {
                  const newFile = e.currentTarget.files[0];
                  if (newFile) {
                    formik.setFieldValue("jobAttachment", newFile);
                    setKeepPreviousAttachment(false);
                    console.log("New Job Attachment set:", newFile);
                  } else {
                    console.log("No new file selected");
                  }
                }}
                onBlur={formik.handleBlur}
                className="block w-full mt-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:outline-none"
              />
            )}
            {formik.touched.jobAttachment && formik.errors.jobAttachment && (
              <div className="text-red-500 text-sm">
                {formik.errors.jobAttachment}
              </div>
            )}{" "}
          </div>
          <div className="flex-1">
            <label className="flex items-center gap-4">
              <span className="text-sm font-medium">Apply with Link</span>
              <div className="relative inline-block w-10 h-6">
                <input
                  type="checkbox"
                  name="showApplyLink"
                  checked={showApplyWithLink}
                  onChange={(e) => {
                    setShowApplyWithLink(e.target.checked);
                    if (!e.target.checked) {
                      formik.setFieldValue("applyWithLink", "");
                    }
                  }}
                  className="opacity-0 w-0 h-0 peer"
                />
                <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition peer-checked:bg-blue-600"></span>
                <span className="absolute top-[3px] left-[3px] w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
              </div>
            </label>

            {showApplyWithLink && (
              <div className="mt-2">
                <input
                  type="text"
                  name="applyWithLink"
                  value={formik.values.applyWithLink}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter apply link"
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
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold focus:outline-none focus:ring focus:ring-blue-300"
          >
            Update Job
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateModal;
