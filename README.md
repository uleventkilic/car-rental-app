# 🚗 Car Rental App - Araç Kiralama Sistemi

Bu proje, kullanıcıların araç kiralayabileceği, araçları listeleyebileceği ve ofisler arasında karşılaştırma yapabileceği bir web uygulamasıdır.

---

## 🎥 Video Tanıtımı

[Car Rental App Demo](https://youtu.be/JIPjPz7okjQ)

---

## 📌 Proje Özellikleri

- ✅ Kullanıcı kaydı ve giriş sistemi (JWT Authentication)
- ✅ Araç kiralama ve listeleme
- ✅ Ofis bazlı araç karşılaştırmaları
- ✅ Responsive frontend tasarımı (React.js)
- ✅ Node.js + Express.js ile güçlü backend
- ✅ MongoDB ile veri depolama

---

## 📂 Proje Yapısı

```plaintext
car-rental-app/
│-- car-rental-frontend/  # React.js Frontend
│-- car-rental-backend/   # Node.js & Express.js Backend
│-- models/               # MongoDB Şema Modelleri
│-- routes/               # API Rotaları
│-- server.js             # Backend Ana Dosyası
│-- .env                  # Çevresel Değişkenler
```

---

## 🛠 Kurulum Talimatları

### 1️⃣ Gerekli Bağımlılıkları Yükleme

Projeyi klonladıktan sonra backend ve frontend bağımlılıklarını yükleyin:

```bash
git clone https://github.com/kullaniciadi/car-rental-app.git
cd car-rental-app
npm install
```

Frontend bağımlılıklarını yüklemek için:

```bash
cd car-rental-frontend
npm install
```

---

### 2️⃣ .env Dosyasını Ayarlama

`.env` dosyanızın içeriği şu şekilde olmalıdır:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car-rental
JWT_SECRET=your_secret_key_here
PORT=5000
```

MongoDB URI ve JWT_SECRET değerlerini kendi bilgilerinizle değiştirin.

---

### 3️⃣ Backend'i Çalıştırma

```bash
cd car-rental-app
npm start
```

---

### 4️⃣ Frontend'i Çalıştırma

```bash
cd car-rental-frontend
npm start
```

Uygulama şu adreslerde çalışacaktır:

- **Frontend:** http://localhost:3000  
- **Backend:** http://localhost:5000  

---

## 📌 API Kullanımı

### 🔐 Kimlik Doğrulama Rotaları

- `POST /api/auth/register` → Kullanıcı kaydı
- `POST /api/auth/login` → Kullanıcı girişi

### 🚗 Araç Rotaları

- `GET /api/cars` → Tüm araçları listele
- `POST /api/cars` → Yeni araç ekle
- `GET /api/cars/:id` → Belirli bir aracı getir
- `DELETE /api/cars/:id` → Aracı sil

### 🏢 Ofis Rotaları

- `GET /api/offices` → Tüm ofisleri listele
- `POST /api/offices` → Yeni ofis ekle
- `GET /api/offices/:id` → Belirli bir ofisi getir

---


## 🔥 Geliştirme Süreci

Bu proje aşağıdaki teknolojiler kullanılarak geliştirilmiştir:

- **Frontend:** React.js, Axios, React Router
- **Backend:** Express.js, JWT, Mongoose, Bcrypt
- **Veritabanı:** MongoDB
