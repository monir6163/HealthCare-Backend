import { v2 as cloudinary } from "cloudinary";
import { StatusCodes } from "http-status-codes";
import ApiError from "../app/errors/ApiError";
import { envConfig } from "./env";

cloudinary.config({
  cloud_name: envConfig.CLOUDINARY.CLOUD_NAME,
  api_key: envConfig.CLOUDINARY.API_KEY,
  api_secret: envConfig.CLOUDINARY.API_SECRET,
});

export const deleteFileFromCloudinary = async (url: string) => {
  try {
    const regex = /\/v\d+\/(.+?)(?:\.[a-zA-Z0-9]+)+$/;
    const match = url.match(regex);
    if (match && match[1]) {
      const publicId = match[1];
      await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
      console.log(`File with public ID ${publicId} deleted successfully.`);
    }
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to delete file from Cloudinary",
    );
  }
};
export const cloudinaryUpload = cloudinary;
