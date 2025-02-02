const express = require("express");
const multer = require("multer"); // Multer'ı ekleyelim
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Multer ayarları (fotoğraf yükleme için)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Fotoğraf dosyalarının nereye kaydedileceğini belirt
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); // Dosya adı
    }
});

const upload = multer({ storage: storage });

const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const officeRoutes = require("./routes/officeRoutes");

// Fotoğraf yüklemek için 'upload' middleware'ini kullanarak 'userRoutes' rotasına ekleme yapalım
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/offices", officeRoutes);

// Fotoğraf yükleme sadece register için olmalı
// Bu route'u userRoutes içerisinde halledeceğiz
// app.post("/api/users/register", upload.single("photo"), userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`));
