import "react";
import Modal from "./Modal";

const toPascalCase = (input) => {
  const str = typeof input === "string" ? input : String(input || "");
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase()) 
    .replace(/^[a-z]/, (char) => char.toUpperCase())
    .replace(/([A-Z])/g, " $1")
    .trim(); 
};

const ViewModal = ({ open, onClose, job }) => {
  if (!job) return null;

  const cleanJobSkills = job.jobSkills
    .map((skill) => skill.replace(/[[\]"]/g, "").trim())
    .filter((skill) => skill !== "")
    .join(", ");

  const cleanLocations = job.locations
    .map((location) => location.replace(/[[\]"]/g, "").trim())
    .filter((location) => location !== "")
    .join(", ");

  const formattedApplicationDeadline = job.applicationDeadline
    ? new Date(job.applicationDeadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No deadline specified";

    const formattedPreferredDisabilities = job.preferredDisabilities
    .map((disability) => toPascalCase(disability))
    .join(", ");

    const formattedPreferredLanguages = Array.isArray(job.preferredLanguages) 
    ? job.preferredLanguages.join(", ") 
    : job.preferredLanguages || "No Preferred Language Specified";


  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-8 bg-white rounded-lg w-[800px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8 tracking-wide">
          Job Details
        </h2>

        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3">Job Title:</p>
            <p className="text-gray-900 font-medium">{toPascalCase(job.jobTitle)}</p>
          </div>

          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3">Company:</p>
            <p className="text-gray-900 font-medium">{toPascalCase(job.companyName)}</p>
          </div>

          <div className="flex items-start bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3">Description:</p>
            <p className="text-gray-900 font-medium">{job.jobDescription}</p>
          </div>

          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3">Category:</p>
            <p className="text-gray-900 font-medium">{job.jobCategory}</p>
          </div>

          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3">Type:</p>
            <p className="text-gray-900 font-medium">{job.jobType}</p>
          </div>

          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3">Level:</p>
            <p className="text-gray-900 font-medium">{toPascalCase(job.jobLevel)}</p>
          </div>

          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3">Preferred Language:</p>
            <p className="text-gray-900 font-medium">{formattedPreferredLanguages}</p>
          </div>

          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3">Preferred Disabilities:</p>
            <p className="text-gray-900 font-medium">
              {formattedPreferredDisabilities || "No Disabilities Specified"}
            </p>
          </div>

          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3">Skills:</p>
            <p className="text-gray-900 font-medium">
              {cleanJobSkills.split(",").map(toPascalCase).join(", ") || "No Skills Specified"}
            </p>
          </div>

          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3">Salary:</p>
            <p className="text-gray-900 font-medium">
              ₱{toPascalCase(job.expectedSalary.minSalary)} - ₱{toPascalCase(job.expectedSalary.maxSalary)}
            </p>
          </div>

          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3">Application Deadline:</p>
            <p className="text-gray-900 font-medium">{formattedApplicationDeadline}</p>
          </div>

          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3">Locations:</p>
            <p className="text-gray-900 font-medium">
              {cleanLocations
                .split(", ")
                .map((location) => toPascalCase(location))
                .join(", ")}
            </p>
          </div>

          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3">Job Attachment:</p>
            {job.jobAttachment && job.jobAttachment.trim() !== "" ? (
              <a
                href={job.jobAttachment}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 transition-colors"
              >
                View Attachment
              </a>
            ) : (
              <p className="text-gray-500">No Attachment Available</p>
            )}
          </div>

          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3">Link:</p>
            <p className="text-gray-900 font-medium">
              {job.applyWithLink ? job.applyWithLink : "No link provided"}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewModal;