import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: "dfbfmy2t1",
  api_key: "784352146898187",
  api_secret: "_4yG3rD87ZvkvgnoTNXjeSnoN8c",
});

export default cloudinary;
