import { useFormik } from "formik";
import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { useState } from "react";
import Select from "react-select";
import Modal from "../components/Modal";
import { jobStore } from "../stores/jobStore";
import { disabilityOptions, languageOptions } from "../utils/options";
import jobPostSchema from "../validations/jobpost";

const UpdateModal = ({ open, onClose, job }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { updateJob, getEmployerJobs } = jobStore();
  const [keepPreviousAttachment, setKeepPreviousAttachment] = useState(true);
  const [showFileInput, setShowFileInput] = useState(false);
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
      preferredLanguage: job?.preferredLanguage
        ? { value: job.preferredLanguage, label: job.preferredLanguage }
        : null,
      preferredDisabilities: job?.preferredDisabilities
        ? job.preferredDisabilities.map((disability) => ({
            label: disability,
            value: disability,
          }))
        : [],
      jobSkills: Array.isArray(job?.jobSkills) ? job.jobSkills : [],
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

      // jobAttachment: job?.jobAttachment,
      previousAttachment: job?.jobAttachment,
    },
    enableReinitialize: true,
    validationSchema: jobPostSchema(keepPreviousAttachment),
    onSubmit: async (values) => {
      console.log("Form values on submit:", values);
      console.log("keepPreviousAttachment on submit:", keepPreviousAttachment);
      console.log("jobAttachment on submit:", values.jobAttachment);
      console.log("previousAttachment on submit:", values.previousAttachment);

      try {
        const jobData = {
          ...values,
          preferredLanguage: values.preferredLanguage
            ? values.preferredLanguage.value
            : "Any",
          preferredDisabilities: values.preferredDisabilities.map(
            (disability) => disability.value
          ),
          // jobAttachment: keepPreviousAttachment
          // ? values.previousAttachment
          // : values.jobAttachment || values.previousAttachment,
          jobAttachment: keepPreviousAttachment
            ? values.previousAttachment
            : values.jobAttachment,
        };

        console.log("Job data being submitted:", jobData);

        // await updateJob(job._id, jobData);
        const updatedJob = await updateJob(job._id, jobData);
        console.log("Job updated successfully");
        setIsSuccess(true);
        formik.setFieldValue("previousAttachment", updatedJob.jobAttachment);
        console.log("Updated previousAttachment:", updatedJob.jobAttachment);
        await getEmployerJobs();
      } catch (error) {
        console.error("Error updating job:", error);
        if (error.response && error.response.status === 401) {
          alert("You are not authorized to update this job.");
        } else if (error.response && error.response.status === 404) {
          alert(
            "The job with the given ID does not exist or you are not authorized to update it."
          );
        } else {
          alert("There was an error updating your job. Please try again.");
        }
      }
    },
  });

  const handleSkillInputChange = (e) => {
    if ((e.key === "," || e.key === "Enter") && e.target.value.trim()) {
      e.preventDefault();
      const newSkill = e.target.value.trim();
      if (!formik.values.jobSkills.includes(newSkill)) {
        formik.setFieldValue("jobSkills", [
          ...formik.values.jobSkills,
          newSkill,
        ]);
        console.log("Skill added:", newSkill);
      }
      e.target.value = "";
    }
  };

  const removeSkill = (skillToRemove) => {
    formik.setFieldValue(
      "jobSkills",
      formik.values.jobSkills.filter((skill) => skill !== skillToRemove)
    );
    console.log("Skill removed:", skillToRemove);
  };

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
        <form onSubmit={formik.handleSubmit} className="space-y-6 w-full">
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
            <select
              name="jobCategory"
              value={formik.values.jobCategory}
              onChange={(e) => {
                formik.handleChange(e);
                console.log("Job Category:", e.target.value);
              }}
              onBlur={formik.handleBlur}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select category</option>
              <option value="DESIGN">Design</option>
              <option value="DEVELOPMENT">Development</option>
              <option value="MARKETING">Marketing</option>
            </select>
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
              Preferred Language
            </label>
            <Select
              options={languageOptions}
              value={formik.values.preferredLanguage}
              onChange={(selected) => {
                formik.setFieldValue("preferredLanguage", selected);
                console.log("Preferred Language:", selected);
              }}
              onBlur={formik.handleBlur}
              isClearable
              className="w-full"
            />
            {formik.touched.preferredLanguage &&
              formik.errors.preferredLanguage && (
                <p className="text-red-500 text-sm">
                  {formik.errors.preferredLanguage}
                </p>
              )}
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Job Type</label>
            <select
              name="jobType"
              value={formik.values.jobType}
              onChange={(e) => {
                formik.handleChange(e);
                console.log("Job Type:", e.target.value);
              }}
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
          <div>
            <label className="text-sm font-medium block mb-2">Job Shift</label>
            <select
              name="jobShift"
              value={formik.values.jobShift}
              onChange={(e) => {
                formik.handleChange(e);
                console.log("Job Shift:", e.target.value);
              }}
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
          <div>
            <label className="text-sm font-medium block mb-2">
              Job Qualifications
            </label>
            <select
              name="jobQualifications"
              value={formik.values.jobQualifications}
              onChange={(e) => {
                formik.handleChange(e);
                console.log("Job Qualifications:", e.target.value);
              }}
              onBlur={formik.handleBlur}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select qualification</option>
              <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
              <option value="High School Diploma">High School Diploma</option>
              <option value="Technical Training">Technical Training</option>
            </select>
            {formik.touched.jobQualifications &&
              formik.errors.jobQualifications && (
                <p className="text-red-500 text-sm">
                  {formik.errors.jobQualifications}
                </p>
              )}
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Job Level</label>
            <select
              name="jobLevel"
              value={formik.values.jobLevel}
              onChange={(e) => {
                formik.handleChange(e);
                console.log("Job Level:", e.target.value);
              }}
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
            <input
              type="text"
              name="locations"
              value={formik.values.locations.replace(/["[\]]/g, "")}
              onChange={(e) => {
                const sanitizedValue = e.target.value.replace(/["[\]]/g, "");
                formik.setFieldValue("locations", sanitizedValue);
                console.log("Locations:", sanitizedValue);
              }}
              onBlur={formik.handleBlur}
              className="block w-full mt-1 text-sm text-gray-600 border border-gray-300 rounded-md p-2"
            />
            {formik.touched.locations && formik.errors.locations && (
              <div className="text-red-500 text-sm">
                {formik.errors.locations}
              </div>
            )}
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Job Skills</label>
            <div className="w-full border rounded-lg p-2">
              <input
                type="text"
                onKeyDown={handleSkillInputChange}
                className="w-full border-none outline-none"
                placeholder="Enter skills (press ',' or 'Enter' to add)"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formik.values.jobSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill.replace(/["[\]]/g, "")}
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
            {formik.touched.jobSkills && formik.errors.jobSkills && (
              <p className="text-red-500 text-sm">{formik.errors.jobSkills}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">
              Job Attachment
            </label>
            {formik.values.previousAttachment && !showFileInput && (
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
                    setShowFileInput(true);
                    setKeepPreviousAttachment(false);
                  }}
                  className="ml-2 text-red-500 hover:text-red-700 text-sm"
                >
                  Change File
                </button>
              </div>
            )}
            {/* {showFileInput && (
              <input
                type="file"
                name="jobAttachment"
                onChange={(e) => {
                  formik.setFieldValue(
                    "jobAttachment",
                    e.currentTarget.files[0] || formik.values.previousAttachment 
                  );
                  console.log("Job Attachment:", e.currentTarget.files[0]);
                }}
                onBlur={formik.handleBlur}
                className="block w-full mt-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:outline-none"
              />
            )} */}
            {showFileInput && (
              <input
                type="file"
                name="jobAttachment"
                onChange={(e) => {
                  const newFile = e.currentTarget.files[0];
                  if (newFile) {
                    formik.setFieldValue("jobAttachment", newFile);
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
            )}
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
