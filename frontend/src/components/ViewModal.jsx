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
    .map((skill) => skill.replace(/[[\]"())]/g, "").trim())
    .filter((skill) => skill !== "")
    .join(", ");

  const cleanLocations = job.locations
    .map((location) => location.replace(/[[\]"())]/g, "").trim()) 
    .filter((location) => location !== "")
    .join(", ");

  // Format application deadline
  const formattedApplicationDeadline = job.applicationDeadline
    ? new Date(job.applicationDeadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No deadline specified";

  const formattedPreferredDisabilities = job.preferredDisabilities
    .map((disability) => toPascalCase(disability.replace(/[()]/g, "").trim())) 
    .join(", ");

  const formattedPreferredLanguages = Array.isArray(job.preferredLanguages)
    ? job.preferredLanguages.join(", ")
    : job.preferredLanguages || "No Preferred Language Specified";

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-8 bg-white rounded-lg w-[900px] max-h-[80vh] overflow-y-auto font-poppins">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8 tracking-wide">
          Job Details
        </h2>

        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-start bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3 flex-shrink-0">Job Title:</p>
            <p className="text-gray-900 font-medium break-words flex-grow">
              {toPascalCase(job.jobTitle)}
            </p>
          </div>

          <div className="flex items-start bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3 flex-shrink-0">Company:</p>
            <p className="text-gray-900 font-medium break-words flex-grow">
              {toPascalCase(job.companyName)}
            </p>
          </div>

          <div className="flex items-start bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3 flex-shrink-0">Description:</p>
            <p className="text-gray-900 font-medium break-words flex-grow">
              {job.jobDescription}
            </p>
          </div>

          <div className="flex items-start bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3 flex-shrink-0">Category:</p>
            <p className="text-gray-900 font-medium break-words flex-grow">
              {job.jobCategory}
            </p>
          </div>

          <div className="flex items-start bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3 flex-shrink-0">Type:</p>
            <p className="text-gray-900 font-medium break-words flex-grow">
              {job.jobType}
            </p>
          </div>

          <div className="flex items-start bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3 flex-shrink-0">Level:</p>
            <p className="text-gray-900 font-medium break-words flex-grow">
              {toPascalCase(job.jobLevel)}
            </p>
          </div>

          <div className="flex items-start bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3 flex-shrink-0">Preferred Language:</p>
            <p className="text-gray-900 font-medium break-words flex-grow">
              {formattedPreferredLanguages}
            </p>
          </div>

          <div className="flex items-start bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3 flex-shrink-0">Preferred Disabilities:</p>
            <p className="text-gray-900 font-medium break-words flex-grow">
              {formattedPreferredDisabilities || "No Disabilities Specified"}
            </p>
          </div>

          <div className="flex items-start bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3 flex-shrink-0">Skills:</p>
            <p className="text-gray-900 font-medium break-words flex-grow">
              {cleanJobSkills || "No Skills Specified"}
            </p>
          </div>

          <div className="flex items-start bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3 flex-shrink-0">Salary:</p>
            <p className="text-gray-900 font-medium break-words flex-grow">
              ₱{toPascalCase(job.expectedSalary.minSalary)} - ₱{toPascalCase(job.expectedSalary.maxSalary)}
            </p>
          </div>

          <div className="flex items-start bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3 flex-shrink-0">Application Deadline:</p>
            <p className="text-gray-900 font-medium break-words flex-grow">
              {formattedApplicationDeadline}
            </p>
          </div>

          <div className="flex items-start bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3 flex-shrink-0">Locations:</p>
            <p className="text-gray-900 font-medium break-words flex-grow">
              {cleanLocations
                .split(", ")
                .map((location) => toPascalCase(location))
                .join(", ")}
            </p>
          </div>

          <div className="flex items-start bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3 flex-shrink-0">Job Attachment:</p>
            {job.jobAttachment && job.jobAttachment.trim() !== "" ? (
              <a
                href={job.jobAttachment}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 transition-colors break-words flex-grow"
              >
                View Attachment
              </a>
            ) : (
              <p className="text-gray-500 flex-grow">No Attachment Available</p>
            )}
          </div>

          <div className="flex items-start bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 w-1/3 flex-shrink-0">Link:</p>
            <p className="text-gray-900 font-medium break-words flex-grow">
              {job.applyWithLink ? job.applyWithLink : "No link provided"}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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