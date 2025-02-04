import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer-Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const originalName = file.originalname.replace(/\.[^/.]+$/, "");
    const uniqueName = `${uuidv4()}_${originalName}`; // UUID + Original Filename

    return {
      folder: "inventory",
      public_id: uniqueName, // Cloudinary unique filename
    };
  },
});

const upload = multer({ storage });

export { upload, cloudinary };
