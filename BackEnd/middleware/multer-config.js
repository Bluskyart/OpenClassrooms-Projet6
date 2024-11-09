const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png"
};


const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

const multerConfig = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de l'upload de l'image." });
    }

    if (!req.file) return next();

    const imagesDir = path.join(__dirname, "../images");
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir);
    }

    try {
      const timestamp = Date.now();
      const originalName = req.file.originalname.split(" ").join("_");
      const newFilename = `${timestamp}-${originalName}.webp`;
      const outputPath = path.join(imagesDir, newFilename);

      await sharp(req.file.buffer)
        .resize({width: 382, height: 568, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .webp({ quality: 20 })
        .toFile(outputPath);

      req.file.filename = newFilename;
      req.file.path = `/images/${newFilename}`;

      next();
    } catch (error) {
      console.error("Erreur lors de l'optimisation de l'image :", error);
      return res.status(500).json({ message: "Erreur lors de l'optimisation de l'image." });
    }
  });
};

module.exports = multerConfig;
