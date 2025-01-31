const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Şifre hashleme için ekledik
const router = express.Router();

// Kullanıcı kaydı (Register)
router.post('/register', async (req, res) => {
  const { email, password, name, city, country } = req.body;

  try {
    // Kullanıcı zaten var mı kontrolü
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists");
      return res.status(400).json({ message: 'User already exists' });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const user = new User({
      email,
      password: hashedPassword, // Şifreyi hashlenmiş şekilde kaydediyoruz
      name,
      city,
      country,
    });

    // Kullanıcıyı veritabanına kaydet
    await user.save();

    // JWT token oluştur
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // JWT_SECRET kullanılıyor
      { expiresIn: '1h' } // Token geçerlilik süresi
    );

    console.log("User registered successfully, token generated:", token);

    // Başarılı kayıt sonrası kullanıcıyı ve token'ı frontend'e gönder
    res.status(201).json({
      message: 'User registered successfully',
      token, // Token'ı frontend'e gönderiyoruz
      user: { email: user.email, name: user.name }
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Kullanıcı girişi (Login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Received email:", email);

    // Kullanıcıyı veritabanında ara
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Şifreyi kontrol et
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // JWT token oluştur
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // JWT_SECRET kullanılıyor
      { expiresIn: '1h' } // Token geçerlilik süresi
    );

    console.log("Login successful, token generated:", token);

    // Başarılı giriş sonrası token ve kullanıcı bilgilerini frontend'e gönder
    res.json({
      message: 'Login successful',
      token, // Token'ı frontend'e gönderiyoruz
      user: { email: user.email, name: user.name }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
