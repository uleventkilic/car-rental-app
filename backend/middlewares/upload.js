const multer = require("multer");
const path = require("path");

// 📌 Resimlerin kaydedileceği klasör
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "backend/images"); // Resimleri backend/images içine kaydet
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

// 📌 Sadece resim dosyalarına izin ver
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Sadece JPEG, PNG veya JPG dosyaları yükleyebilirsiniz!"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
