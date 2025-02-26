import * as yup from "yup";

export default (keepPreviousAttachment) =>
  yup.object().shape({
    companyName: yup.string().required("Company name is required"),
    jobTitle: yup.string().required("Job title is required"),
    jobDescription: yup.string().required("Job description is required"),
    jobCategory: yup.string().required("Job category is required"),
    applicationDeadline: yup
      .date()
      .required("Application deadline is required")
      .test(
        "is-future-date",
        "Application deadline must be a future date.",
        (value) => {
          if (!value) return false;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return value > today;
        }
      )
      .test(
        "is-within-range",
        "Application deadline must be within the next year.",
        (value) => {
          if (!value) return false;
          const today = new Date();
          const oneYearFromNow = new Date();
          oneYearFromNow.setFullYear(today.getFullYear() + 1);
          return value <= oneYearFromNow;
        }
      ),
    locations: yup
      .string()
      .required("Locations are required")
      .test("location", "At least one valid location is required.", (value) => {
        const locations = value.split(",").map((loc) => loc.trim());
        return locations.some((loc) => loc.length > 0);
      }),
    preferredLanguage: yup
      .object()
      .shape({
        value: yup.string().required("Preferred language is required"),
        label: yup.string().required("Preferred language is required"),
      })
      .required("Preferred language is required"),
    jobQualifications: yup.string().required("Job qualifications are required"),
    jobType: yup.string().required("Job type is required"),
    jobShift: yup.string().required("Job shift is required"),
    jobLevel: yup.string().required("Job level is required"),
    expectedSalary: yup.object().shape({
      minSalary: yup
        .number()
        .required("Minimum salary is required")
        .positive("Minimum salary must be a valid number greater than 0."),
      maxSalary: yup
        .number()
        .required("Maximum salary is required")
        .positive("Maximum salary must be a valid number greater than 0.")
        .test(
          "salary-range",
          "Maximum salary must be greater than minimum salary.",
          (value, context) => {
            const minSalary = context.parent.minSalary;
            return value >= minSalary;
          }
        ),
    }),
    jobSkills: yup
      .array()
      .of(yup.string().required("Job skill is required"))
      .min(1, "At least one job skill is required"),
    // jobAttachment: yup
    //   .mixed()
    //   .test("file-required", "Job attachment is required", function (value) {
    //     const { previousAttachment } = this.parent;
    //     if (keepPreviousAttachment && previousAttachment) {
    //       return true;
    //     }
    //     return !!value;
    //   })
    //   .test(
    //     "file-type",
    //     "Invalid file type. Only PDF, DOC, and DOCX files are allowed.",
    //     (value) => {
    //       if (!value) return true; 
    //       const allowedExtensions = ["pdf", "doc", "docx"];
    //       const fileExtension = value.name.split(".").pop().toLowerCase();
    //       return allowedExtensions.includes(fileExtension);
    //     }
    //   ),
    jobAttachment: keepPreviousAttachment
      ? yup.mixed().notRequired()
      : yup.mixed().required("Job attachment is required"), //req if keeps the attachment
  
    preferredDisabilities: yup
      .array()
      .of(
        yup.object().shape({
          value: yup.string().required(),
          label: yup.string().required(),
        })
      )
      .min(1, "At least one preferred disability is required"),
  });
