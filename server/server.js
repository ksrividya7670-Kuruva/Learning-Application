import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skillnova';

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Connect to MongoDB (Optional for this mock)
// mongoose
//   .connect(MONGODB_URI)
//   .then(() => console.log('✓ Connected to MongoDB'))
//   .catch((err) => console.error('✗ MongoDB connection error:', err));

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'users.json');

// Ensure DB file exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

const getUsers = () => JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
const saveUsers = (users) => fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));

const PROFILES_FILE = path.join(__dirname, 'profiles.json');
if (!fs.existsSync(PROFILES_FILE)) {
  fs.writeFileSync(PROFILES_FILE, JSON.stringify([]));
}
const getProfiles = () => JSON.parse(fs.readFileSync(PROFILES_FILE, 'utf-8'));
const saveProfiles = (profiles) => fs.writeFileSync(PROFILES_FILE, JSON.stringify(profiles, null, 2));

// Routes
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_skillnova';

// --- Auth Routes ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    
    const users = getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      _id: Date.now().toString(),
      fullName,
      email,
      password: hashedPassword
    };
    
    users.push(newUser);
    saveUsers(users);

    // Generate token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = getUsers();
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      message: 'Login successful',
      user: { id: user._id, fullName: user.fullName, email: user.email },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// --- Profile Routes ---
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

app.get('/api/profile', authMiddleware, (req, res) => {
  try {
    const profiles = getProfiles();
    const users = getUsers();
    const user = users.find(u => u._id === req.user.id);
    const profile = profiles.find(p => p.userId === req.user.id) || {};
    
    // Merge base user data with profile data
    const mergedProfile = {
      fullName: user?.fullName,
      email: user?.email,
      ...profile
    };
    res.json(mergedProfile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.put('/api/profile', authMiddleware, (req, res) => {
  try {
    const profiles = getProfiles();
    const index = profiles.findIndex(p => p.userId === req.user.id);
    
    if (index !== -1) {
      profiles[index] = { ...profiles[index], ...req.body };
    } else {
      profiles.push({ userId: req.user.id, ...req.body });
    }
    
    saveProfiles(profiles);
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// --- Subscription Route ---
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  console.log(`New subscriber: ${email}`);

  // Setup email data
  const mailOptions = {
    from: `"VeeruPro Academy" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🎉 Welcome to VeeruPro Academy – You\'re In!',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Welcome to VeeruPro Academy</title>
      </head>
      <body style="margin:0;padding:0;background-color:#f4f6f9;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                
                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#1e1b4b 0%,#4c1d95 50%,#7c3aed 100%);padding:40px 40px 36px;text-align:center;">
                    <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;letter-spacing:-0.5px;">VeeruPro <span style="color:#fb923c;">Academy</span></h1>
                    <p style="margin:8px 0 0;color:#c4b5fd;font-size:14px;letter-spacing:1px;text-transform:uppercase;">Learn · Build · Succeed</p>
                  </td>
                </tr>

                <!-- Hero Banner -->
                <tr>
                  <td style="background:#faf5ff;padding:36px 40px 28px;text-align:center;border-bottom:1px solid #ede9fe;">
                    <div style="font-size:48px;margin-bottom:16px;">🎓</div>
                    <h2 style="margin:0 0 12px;color:#1e1b4b;font-size:24px;font-weight:700;">You're officially subscribed!</h2>
                    <p style="margin:0;color:#6b7280;font-size:15px;line-height:1.6;">
                      Welcome aboard. We're thrilled to have you as part of the<br/><strong style="color:#7c3aed;">VeeruPro Academy</strong> learning community.
                    </p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:36px 40px;">
                    <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.7;">
                      Hi there 👋,
                    </p>
                    <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.7;">
                      Your email <strong style="color:#1e1b4b;">${email}</strong> has been successfully added to our newsletter list. From now on, you'll be the first to know about:
                    </p>

                    <!-- Feature List -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                      <tr>
                        <td style="padding:12px 16px;background:#f5f3ff;border-radius:10px;margin-bottom:8px;display:block;">
                          <span style="color:#7c3aed;font-weight:700;font-size:16px;">🚀</span>&nbsp;&nbsp;<span style="color:#374151;font-size:14px;font-weight:600;">New course launches &amp; exclusive early-bird offers</span>
                        </td>
                      </tr>
                      <tr><td style="height:8px;"></td></tr>
                      <tr>
                        <td style="padding:12px 16px;background:#f5f3ff;border-radius:10px;">
                          <span style="color:#7c3aed;font-weight:700;font-size:16px;">💡</span>&nbsp;&nbsp;<span style="color:#374151;font-size:14px;font-weight:600;">Expert tips, tutorials, and industry insights</span>
                        </td>
                      </tr>
                      <tr><td style="height:8px;"></td></tr>
                      <tr>
                        <td style="padding:12px 16px;background:#f5f3ff;border-radius:10px;">
                          <span style="color:#7c3aed;font-weight:700;font-size:16px;">🏆</span>&nbsp;&nbsp;<span style="color:#374151;font-size:14px;font-weight:600;">Career placement news, success stories &amp; mentorship</span>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                      <tr>
                        <td align="center">
                          <a href="http://localhost:5173/upgrade" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#4c1d95);color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:50px;letter-spacing:0.3px;">
                            Explore Our Courses →
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.6;text-align:center;">
                      If you didn't subscribe, you can safely ignore this email.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#1e1b4b;padding:24px 40px;text-align:center;">
                    <p style="margin:0 0 6px;color:#c4b5fd;font-size:13px;font-weight:600;">VeeruPro Academy</p>
                    <p style="margin:0;color:#6b7280;font-size:12px;">© ${new Date().getFullYear()} VeeruPro Academy. All rights reserved.</p>
                    <p style="margin:8px 0 0;color:#6b7280;font-size:11px;">You are receiving this because you subscribed at veeruproac.com</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  try {
    // Only attempt to send if credentials exist
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
      console.log(`Welcome email sent to ${email}`);
    } else {
      console.log(`Email credentials missing. Skipped sending email to ${email}`);
    }
    res.json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send welcome email' });
  }
});

// --- AI Chat Route ---
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({ reply: "I need an API key to answer any question! Please add a GEMINI_API_KEY to the server's .env file." });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "You are VeeruProAc AI, a helpful coding assistant. Keep answers brief and helpful. The user says: " + message }] }]
      })
    });
    
    const data = await response.json();
    if (data.candidates && data.candidates[0].content) {
      return res.json({ reply: data.candidates[0].content.parts[0].text });
    }
    return res.status(500).json({ reply: 'Failed to parse AI response.' });
  } catch (err) {
    console.error('AI Chat Error:', err);
    res.status(500).json({ reply: 'Internal Server Error while contacting AI provider.' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});
