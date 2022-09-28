const multer = require('multer');

const imageUpload = multer({
  // Image size limit.
  limits: {
    fileSize: 1500000, // 1.5mb
  },
  // Where to store the image.
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
  }),
  // File type validation.
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error('Please upload an image'));
    }

    cb(null, true);
  },
});

module.exports = imageUpload;
