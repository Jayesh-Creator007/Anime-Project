const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Signup
exports.signup = async (req, res) => {
  const { username, email } = req.body;
  try {
    let user = await User.findOne({ email });
    
    // Create or update user
    if (!user) {
      user = new User({ username, email });
    } else {
      user.username = username;
    }
    
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();
    
    // Send email
    const html = `
      <div style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 40px; border-radius: 10px; max-width: 600px; margin: auto; border: 2px solid #FFD700;">
        <h1 style="color: #FFD700; text-align: center;">Anime Tracker</h1>
        <p style="font-size: 18px; text-align: center;">Your verification code is:</p>
        <div style="background-color: #FFD700; color: #000; padding: 20px; font-size: 32px; font-weight: bold; text-align: center; border-radius: 5px; letter-spacing: 5px;">
          ${otp}
        </div>
        <p style="font-size: 14px; text-align: center; margin-top: 20px; color: #aaa;">This code will expire in 10 minutes.</p>
      </div>
    `;
    
    await sendEmail({ to: email, subject: 'Verify Your Email - Anime Tracker', html });
    
    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

// Login (optional, but good for returning users)
exports.login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Send OTP instead of password
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();
    
    await sendEmail({ to: email, subject: 'Verify Your Email - Anime Tracker', html: `OTP: ${otp}` });
    res.json({ message: 'OTP sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
