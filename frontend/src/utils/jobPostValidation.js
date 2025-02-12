export const validateCompanyName = (companyName) =>
  companyName && companyName.length > 0 ? null : "Company name is required";

export const validateJobTitle = (jobTitle) =>
  jobTitle && jobTitle.length > 0 ? null : "Job title is required";

export const validateJobDescription = (jobDescription) =>
  jobDescription && jobDescription.length > 0
    ? null
    : "Job description is required";

export const validateJobCategory = (jobCategory) =>
  jobCategory ? null : "Job category is required";

export const validatePreferredDisability = (preferredDisability) => {
  if (Array.isArray(preferredDisability)) {
    if (
      preferredDisability.length === 0 ||
      preferredDisability.includes("Any")
    ) {
      return null;
    }
  }
  return "Preferred disability is required";
};

export const validateApplicationDeadline = (applicationDeadline) =>
  applicationDeadline ? null : "Application deadline is required";

export const validatePreferredLanguage = (preferredLanguage) =>
  preferredLanguage ? null : "Preferred language is required";

export const validateJobType = (jobType) =>
  jobType ? null : "Job type is required";

export const validateJobShift = (jobShift) =>
  jobShift ? null : "Job shift is required";

export const validateJobQualifications = (jobQualifications) =>
  jobQualifications ? null : "Job qualifications are required";

export const validateJobLevel = (jobLevel) =>
  jobLevel ? null : "Job level is required";

export const validateSalary = (minSalary, maxSalary) => {
  if (!minSalary || isNaN(minSalary) || parseFloat(minSalary) <= 0) {
    return "Minimum salary must be a valid number greater than 0.";
  }
  if (!maxSalary || isNaN(maxSalary) || parseFloat(maxSalary) <= 0) {
    return "Maximum salary must be a valid number greater than 0.";
  }
  if (parseFloat(minSalary) > parseFloat(maxSalary)) {
    return "Minimum salary cannot be greater than maximum salary.";
  }
  return null;
};

export const validateLocation = (locations) => {
  if (
    !Array.isArray(locations) ||
    locations.length === 0 ||
    locations.every((loc) => loc.trim() === "")
  ) {
    return "At least one valid location is required.";
  }
  return null;
};

export const validateJobSkills = (jobSkills) =>
  jobSkills.length > 0 ? null : "At least one job skill is required.";

export const validateJobAttachment = (jobAttachment) => {
  if (!jobAttachment) {
    return "Job attachment is required";
  }

  const allowedExtensions = ["pdf", "doc", "docx"];
  const fileExtension = jobAttachment.name.split(".").pop().toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    return "Invalid file type. Only PDF, DOC, and DOCX files are allowed.";
  }

  return null;
};

export const validateJobForm = (
  formData,
  selectedLanguage,
  selectedDisabilities,
  showApplyLink,
  skills
) => {
  const companyName = formData.get("companyName")?.trim();
  const jobTitle = formData.get("jobTitle")?.trim();
  const jobDescription = formData.get("jobDescription")?.trim();
  const jobCategory = formData.get("jobCategory");
  const preferredDisabilitiesArray = selectedDisabilities.map(
    (disability) => disability.value
  );
  const finalPreferredDisabilities =
    preferredDisabilitiesArray.length === 1 &&
    preferredDisabilitiesArray[0] === "Any"
      ? []
      : preferredDisabilitiesArray;
  const applicationDeadline = formData.get("applicationDeadline");
  const preferredLanguage = selectedLanguage ? selectedLanguage.value : "Any";
  const jobType = formData.get("jobType");
  const jobShift = formData.get("jobShift");
  const jobQualifications = formData.get("jobQualifications");
  const jobLevel = formData.get("jobLevel");
  const minSalary = formData.get("minSalary")?.trim();
  const maxSalary = formData.get("maxSalary")?.trim();
  const rawLocations = formData.get("locations")?.trim();
  const locations = rawLocations
    ? rawLocations.split(",").map((loc) => loc.trim())
    : [];
  const jobSkills = skills;
  const jobAttachment = formData.get("jobAttachment");
  const applyWithLink = showApplyLink ? formData.get("applyWithLink") : null;

  return {
    companyName: validateCompanyName(companyName),
    jobTitle: validateJobTitle(jobTitle),
    jobDescription: validateJobDescription(jobDescription),
    jobCategory: validateJobCategory(jobCategory),
    preferredDisability: validatePreferredDisability(
      finalPreferredDisabilities
    ),
    applicationDeadline: validateApplicationDeadline(applicationDeadline),
    preferredLanguage: validatePreferredLanguage(preferredLanguage),
    jobType: validateJobType(jobType),
    jobShift: validateJobShift(jobShift),
    jobQualifications: validateJobQualifications(jobQualifications),
    jobLevel: validateJobLevel(jobLevel),
    salary: validateSalary(minSalary, maxSalary),
    location: validateLocation(locations),
    jobSkills: validateJobSkills(jobSkills),
    jobAttachment: validateJobAttachment(jobAttachment),
  };
};
