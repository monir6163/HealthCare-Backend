import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: async (req, file) => {
    return {
      folder: "ph-health-care",
      public_id: `${Date.now()}-${file.originalname}`,
      allowed_formats: ["jpg", "jpeg", "png"],
    };
  },
});

export const multerUpload = multer({ storage });
