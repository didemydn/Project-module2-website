// config/cloudinary.config.js

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
  params: {
    folder: 'Project-module2', // Set the folder in Cloudinary where the images will be uploaded
    format: async (req, file) => 'jpg', // Set the desired image format
    public_id: (req, file) => Date.now() + '-' + file.originalname.split('.')[0], // Set the public ID for the uploaded file
  },
});
  // cloudinary: cloudinary,
//   cloudinary,
//   params: {
//     allowed_formats: ['jpg', 'png'],
//     folder: 'Project-module2-website' // The name of the folder in cloudinary
//     // resource_type: 'raw' => this is in case you want to upload other type of files, not just images
//   }
// });

//                     storage: storage
module.exports = multer({ storage });
