import { useFormik } from "formik";
import { motion } from "framer-motion";
import { CircleCheck, Undo2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Sidebar from "../components/Sidebar";
import { jobStore } from "../stores/jobStore";
import { disabilityOptions, languageOptions } from "../utils/options";
import jobPostSchema from "../validations/jobpost";

const JobPosts = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const { createJob } = jobStore();

  const formik = useFormik({
    initialValues: {
      companyName: "",
      jobTitle: "",
      jobDescription: "",
      jobCategory: "",
      applicationDeadline: "",
      locations: "",
      preferredLanguage: null,
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
          preferredLanguage: values.preferredLanguage ? values.preferredLanguage.value : "Any",
          preferredDisabilities: values.preferredDisabilities.map((disability) => disability.value),
        };
        console.log("Prepared jobData for submission:", jobData);
        await createJob(jobData);
        console.log("Job created successfully");
        setIsSuccess(true);
      } catch (error) {
        console.error("Error creating job:", error);
        alert("There was an error creating your job. Please try again.");
      }
    },
  });

  console.log("Formik values:", formik.values);
  console.log("Formik errors:", formik.errors);
  console.log("Formik touched:", formik.touched);

  const handleSkillInputChange = (e) => {
    if ((e.key === "," || e.key === "Enter") && e.target.value.trim()) {
      const newSkill = e.target.value.trim();
      console.log("Adding new skill:", newSkill);
      if (!formik.values.jobSkills.includes(newSkill)) {
        formik.setFieldValue("jobSkills", [...formik.values.jobSkills, newSkill]);
      }
      e.target.value = "";
    }
  };

  const removeSkill = (skillToRemove) => {
    console.log("Removing skill:", skillToRemove);
    formik.setFieldValue(
      "jobSkills",
      formik.values.jobSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  if (isSuccess) {
    console.log("Success screen rendered");
    return (
      <div className="h-screen font-poppins flex">
        <Sidebar />
        <div className="w-full bg-gray-50 p-8">
          <button onClick={() => navigate(-1)} className="flex items-center text-black mb-6">
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
        <button onClick={() => navigate(-1)} className="flex items-center text-black mb-6">
          <Undo2 className="w-5 h-5 mr-2" />
          Go Back
        </button>
        <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-7xl overflow-auto h-[85vh]">
          <form onSubmit={formik.handleSubmit} className="space-y-6 w-full" encType="multipart/form-data">
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
                  <p className="text-red-500 text-sm">{formik.errors.companyName}</p>
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
                  <p className="text-red-500 text-sm">{formik.errors.jobTitle}</p>
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
              {formik.touched.jobDescription && formik.errors.jobDescription && (
                <p className="text-red-500 text-sm">{formik.errors.jobDescription}</p>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="jobCategory"
                  value={formik.values.jobCategory}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="">Select category</option>
                  <option value="DESIGN">Design</option>
                  <option value="DEVELOPMENT">Development</option>
                  <option value="MARKETING">Marketing</option>
                </select>
                {formik.touched.jobCategory && formik.errors.jobCategory && (
                  <p className="text-red-500 text-sm">{formik.errors.jobCategory}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">Preferred Disabilities<span className="text-red-500">*</span></label>
                <Select
                  options={disabilityOptions}
                  isMulti
                  value={formik.values.preferredDisabilities}
                  onChange={(selected) => formik.setFieldValue("preferredDisabilities", selected)}
                  onBlur={formik.handleBlur}
                  className="w-full"
                />
                {formik.touched.preferredDisabilities && formik.errors.preferredDisabilities && (
                  <p className="text-red-500 text-sm">{formik.errors.preferredDisabilities}</p>
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
                {formik.touched.applicationDeadline && formik.errors.applicationDeadline && (
                  <p className="text-red-500 text-sm">{formik.errors.applicationDeadline}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Preferred Language <span className="text-red-500">*</span>
                </label>
                <Select
                  options={languageOptions}
                  value={formik.values.preferredLanguage}
                  onChange={(selected) => formik.setFieldValue("preferredLanguage", selected)}
                  onBlur={formik.handleBlur}
                  isClearable
                  className="w-full"
                />
                {formik.touched.preferredLanguage && formik.errors.preferredLanguage && (
                  <p className="text-red-500 text-sm">{formik.errors.preferredLanguage}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="jobType"
                  value={formik.values.jobType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
                {formik.touched.jobType && formik.errors.jobType && (
                  <p className="text-red-500 text-sm">{formik.errors.jobType}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Shift <span className="text-red-500">*</span>
                </label>
                <select
                  name="jobShift"
                  value={formik.values.jobShift}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="">Select Job Shift</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Night-Shift">Night-Shift</option>
                  <option value="Day-Shift">Day-Shift</option>
                </select>
                {formik.touched.jobShift && formik.errors.jobShift && (
                  <p className="text-red-500 text-sm">{formik.errors.jobShift}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Qualifications <span className="text-red-500">*</span>
                </label>
                <select
                  name="jobQualifications"
                  value={formik.values.jobQualifications}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="">Select qualification</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="High School Diploma">High School Diploma</option>
                  <option value="Technical Training">Technical Training</option>
                </select>
                {formik.touched.jobQualifications && formik.errors.jobQualifications && (
                  <p className="text-red-500 text-sm">{formik.errors.jobQualifications}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">
                  Job Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="jobLevel"
                  value={formik.values.jobLevel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="">Select level</option>
                  <option value="Entry">Entry</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                </select>
                {formik.touched.jobLevel && formik.errors.jobLevel && (
                  <p className="text-red-500 text-sm">{formik.errors.jobLevel}</p>
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
                {formik.touched.expectedSalary?.minSalary && formik.errors.expectedSalary?.minSalary && (
                  <p className="text-red-500 text-sm">{formik.errors.expectedSalary.minSalary}</p>
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
                {formik.touched.expectedSalary?.maxSalary && formik.errors.expectedSalary?.maxSalary && (
                  <p className="text-red-500 text-sm">{formik.errors.expectedSalary.maxSalary}</p>
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
                <p className="text-red-500 text-sm">{formik.errors.locations}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Job Skills <span className="text-red-500">*</span>
              </label>
              <div className="w-full border rounded-lg p-2">
                <input
                  type="text"
                  onKeyDown={handleSkillInputChange}
                  className="w-full border-none outline-none"
                  placeholder="Enter skills (press ',' or 'Enter' to add)"
                />
              </div>
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

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Job Attachment <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="jobAttachment"
                  onChange={(e) => formik.setFieldValue("jobAttachment", e.currentTarget.files[0])}
                  onBlur={formik.handleBlur}
                  className="block w-full mt-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:outline-none"
                />
                {formik.touched.jobAttachment && formik.errors.jobAttachment && (
                  <p className="text-red-500 text-sm">{formik.errors.jobAttachment}</p>
                )}
              </div>

              <div className="flex-1">
                <label className="flex items-center gap-4">
                  <span className="text-sm font-medium">Add &quot;Apply with Link&quot; Field</span>
                  <div className="relative inline-block w-10 h-6">
                    <input
                      type="checkbox"
                      name="showApplyLink"
                      checked={formik.values.showApplyLink}
                      onChange={(e) => formik.setFieldValue("showApplyLink", e.target.checked)}
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
                    {formik.touched.applyWithLink && formik.errors.applyWithLink && (
                      <p className="text-red-500 text-sm">{formik.errors.applyWithLink}</p>
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