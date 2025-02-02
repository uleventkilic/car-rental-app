const express = require("express");
const bcrypt = require("bcryptjs"); // bcryptjs kullanımı
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../models/User");
const multer = require("multer");  // Multer'ı import ettik

const router = express.Router();

// Multer ayarları (fotoğraf yükleme için)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Fotoğrafların kaydedileceği klasör
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); // Dosya adını benzersiz yapmak için timestamp ekledik
    }
});

const upload = multer({ storage: storage });

// 📌 Google OAuth 2.0 Ayarları
passport.use(
    new GoogleStrategy(
        {
            clientID: "1063222330173-fos7lsi8dl21iq8eqor5cer7le8taf16.apps.googleusercontent.com", // Google Client ID'nizi buraya ekleyin
            clientSecret: "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", // Google Client Secret'ınızı buraya ekleyin
            callbackURL: "http://localhost:5000/api/users/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = new User({
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                        country: "Belirtilmemiş",
                        city: "Belirtilmemiş",
                        photo: profile.photos[0]?.value || null,
                    });
                    await user.save();
                }
                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

// 📌 Kullanıcı Kaydı (Register)
router.post("/register", upload.single("photo"), async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, country, city } = req.body;
    const photo = req.file ? req.file.path : null;  // Fotoğraf yüklemesi varsa kaydediyoruz

    if (!firstName || !lastName || !email || !password || !confirmPassword || !country || !city) {
        return res.status(400).json({ error: "Lütfen tüm alanları doldurun." });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Şifreler uyuşmuyor." });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            country,
            city,
            photo  // Fotoğraf verisi de kullanıcıya kaydediliyor
        });

        await newUser.save();
        res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu." });
    } catch (error) {
        console.error("Kayıt sırasında hata oluştu:", error); 
        res.status(500).json({ error: "Kayıt işlemi sırasında bir hata oluştu." });
    }
});

// 📌 Kullanıcı Girişi (Login)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Lütfen tüm alanları doldurun." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "E-posta veya şifre hatalı." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "E-posta veya şifre hatalı." });
        }

        const token = jwt.sign({ userId: user._id }, "SECRET_KEY", { expiresIn: "7d" });

        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                country: user.country,
                city: user.city,
                photo: user.photo
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Giriş yapılırken hata oluştu." });
    }
});

// 📌 Google ile giriş rotası
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        const token = jwt.sign({ userId: req.user._id }, "SECRET_KEY", { expiresIn: "7d" });
        res.redirect(`http://localhost:5173/login?token=${token}`);  // Token'ı frontend'e gönderiyoruz
    }
);

module.exports = router;
