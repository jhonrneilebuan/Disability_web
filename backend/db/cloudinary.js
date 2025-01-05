import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: "dfbfmy2t1",
  api_key: "784352146898187",
  api_secret: "_4yG3rD87ZvkvgnoTNXjeSnoN8c",
});

export const uploadToCloudinary = async (file) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file);
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    throw new Error("Cloudinary upload failed");
  }
};

export default cloudinary;
