import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// User Model
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  email: String,
  picture: String,
  favorites: [{
    name: String,
    url: String,
    icon: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Verify Google token
async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    return ticket.getPayload();
  } catch (error) {
    console.error("Error verifying Google token:", error);
    return null;
  }
}

// Generate JWT token
function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
}

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes
// Google Login - Simplified for testing (no database dependency)
app.post('/api/auth/google', async (req, res) => {
  try {
    console.log("Received auth request with body:", req.body);
    const { token } = req.body;
    
    if (!token) {
      console.log("No token provided in request");
      return res.status(400).json({ 
        message: 'Missing token in request',
        details: 'Google authentication token is required'
      });
    }
    
    console.log("Verifying Google token...");
    const payload = await verifyGoogleToken(token);
    console.log("Token verification result:", payload ? "Success" : "Failed");
    
    if (!payload) {
      return res.status(400).json({ 
        message: 'Invalid token',
        details: 'Could not verify Google token'
      });
    }
    
    console.log("Google token payload:", payload);
    
    // Generate temporary user object (no database interaction)
    const user = {
      _id: payload.sub, // Use Google's subject ID as our user ID
      googleId: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture || '',
      favorites: []
    };
    
    // Generate JWT
    const jwtToken = generateToken(user);
    
    console.log("Login successful, returning user data");
    // Return user data and token
    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        googleId: user.googleId,
        name: user.name,
        email: user.email,
        picture: user.picture
      }
    });  
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Server error',
      details: error.message
    });
  }
});

// Get user favorites
app.get('/api/favorites', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user favorites
app.post('/api/favorites', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.favorites = req.body.favorites;
    await user.save();
    
    res.json(user.favorites);
  } catch (error) {
    console.error('Error updating favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle a single favorite
app.post('/api/favorites/toggle', authenticateToken, async (req, res) => {
  try {
    const { site } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if site is already a favorite
    const existingIndex = user.favorites.findIndex(
      favorite => favorite.url === site.url
    );
    
    if (existingIndex >= 0) {
      // Remove from favorites
      user.favorites.splice(existingIndex, 1);
    } else {
      // Add to favorites
      user.favorites.push(site);
    }
    
    await user.save();
    
    res.json(user.favorites);
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
