const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');  // Araba işlemleri
const officeRoutes = require('./routes/officeRoutes');  // Ofis işlemleri

dotenv.config();

const app = express();

// CORS Middleware
app.use(cors());  // CORS'u aktif hale getiriyoruz

// Middleware
app.use(express.json());  // JSON verilerini işleriz

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => console.log('MongoDB bağlantısı hatası:', err));

// Ana Sayfa Route
app.get('/', (req, res) => {
  res.send('Car Rental API');
});

// Auth Route (Kayıt ve giriş işlemleri)
app.use('/api/auth', authRoutes);

// Car Routes (Araç işlemleri)
app.use('/api/cars', carRoutes);  // Burada carRoutes'ü '/api/cars' altında kullanıyoruz

// Office Routes (Ofis işlemleri)
app.use('/api/offices', officeRoutes);  // Burada officeRoutes'ü '/api/offices' altında kullanıyoruz

// Server'ı Başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));
