import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../db/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let resourceType = "auto"; 
    let format = file.mimetype.split("/")[1]; 

    if (
      file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype === "application/msword"
    ) {
      format = "pdf";
      resourceType = "raw"; 
    }

    if (file.mimetype === "application/pdf") {
      resourceType = "raw";
      format = "pdf";
    }

    return {
      folder: "users-files",
      format: format,
      resource_type: resourceType,
    };
  },
});

const upload = multer({ storage });

export const uploadFiles = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "additionalFiles", maxCount: 5 },
  { name: "jobAttachment", maxCount: 1 },
]);

export default upload;
