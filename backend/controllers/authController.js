const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Signup
exports.signup = async (req, res) => {
  console.log('Signup Request Body:', req.body);
  const { username, email } = req.body;
  try {
    // 1. Check if user already exists
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email. Please login instead.' });
    }

    // 2. Create new user
    user = new User({ username, email });
    
    // 3. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    
    // 4. Save user
    await user.save();
    
    // 5. Send email (non-blocking)
    const html = `
      <div style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 40px; border-radius: 10px; max-width: 600px; margin: auto; border: 2px solid #FFD700;">
        <h1 style="color: #FFD700; text-align: center;">Anime Tracker</h1>
        <p style="font-size: 18px; text-align: center;">Welcome! Your verification code is:</p>
        <div style="background-color: #FFD700; color: #000; padding: 20px; font-size: 32px; font-weight: bold; text-align: center; border-radius: 5px; letter-spacing: 5px;">
          ${otp}
        </div>
        <p style="font-size: 14px; text-align: center; margin-top: 20px; color: #aaa;">This code will expire in 10 minutes.</p>
      </div>
    `;
    
    sendEmail({ to: email, subject: 'Verify Your Email - Anime Tracker', html })
      .catch(emailError => {
        console.error('Email delivery failed:', emailError.message);
      });
    
    return res.status(201).json({ 
      success: true,
      message: 'OTP sent to your email' 
    });
  } catch (error) {
    console.error('CRITICAL_SIGNUP_ERROR:', error);
    return res.status(500).json({ message: `Backend Error: ${error.message}` });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  
  try {
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    // Set admin role for specific email
    if (user.email === 'aswanijayesh500@gmail.com') {
      user.role = 'admin';
    }

    await user.save();
    
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login / Sign In with OTP
exports.login = async (req, res) => {
  console.log('Login Request Body:', req.body);
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    
    // If user doesn't exist, create them (auto-signup)
    if (!user) {
      const username = email.split('@')[0];
      user = new User({ username, email });
      console.log('Auto-creating user for login:', email);
    }
    
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();
    
    // Send styled email (non-blocking)
    const html = `
      <div style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 40px; border-radius: 10px; max-width: 600px; margin: auto; border: 2px solid #FFD700;">
        <h1 style="color: #FFD700; text-align: center;">Anime Tracker</h1>
        <p style="font-size: 18px; text-align: center;">Your login code is:</p>
        <div style="background-color: #FFD700; color: #000; padding: 20px; font-size: 32px; font-weight: bold; text-align: center; border-radius: 5px; letter-spacing: 5px;">
          ${otp}
        </div>
        <p style="font-size: 14px; text-align: center; margin-top: 20px; color: #aaa;">This code will expire in 10 minutes.</p>
      </div>
    `;
    
    sendEmail({ to: email, subject: 'Login Verification - Anime Tracker', html })
      .catch(emailError => {
        console.error('Email delivery failed:', emailError.message);
      });

    return res.status(200).json({ 
      success: true,
      message: 'OTP sent to your email' 
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
