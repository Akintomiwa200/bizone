import axios from 'axios';
import googleAuthConfig from '../config/googleAuth.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export const googleAuthService = {
  // Get Google OAuth URL
  getAuthUrl() {
    const params = new URLSearchParams({
      client_id: googleAuthConfig.clientId,
      redirect_uri: googleAuthConfig.redirectUri,
      response_type: 'code',
      scope: googleAuthConfig.scope,
      access_type: 'offline',
      prompt: 'consent'
    });

    return `${googleAuthConfig.authUrl}?${params.toString()}`;
  },

  // Exchange authorization code for tokens
  async getTokens(code) {
    try {
      const response = await axios.post(googleAuthConfig.tokenUrl, {
        client_id: googleAuthConfig.clientId,
        client_secret: googleAuthConfig.clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: googleAuthConfig.redirectUri,
      });

      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in,
      };
    } catch (error) {
      console.error('Error exchanging code for tokens:', error.response?.data || error.message);
      throw new Error('Failed to exchange authorization code for tokens');
    }
  },

  // Get user info from Google
  async getUserInfo(accessToken) {
    try {
      const response = await axios.get(googleAuthConfig.userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      return {
        googleId: response.data.id,
        email: response.data.email,
        name: response.data.name,
        firstName: response.data.given_name,
        lastName: response.data.family_name,
        picture: response.data.picture,
        verified: response.data.verified_email,
      };
    } catch (error) {
      console.error('Error getting user info from Google:', error.response?.data || error.message);
      throw new Error('Failed to get user information from Google');
    }
  },

  // Find or create user from Google data
  async findOrCreateUser(googleUserData) {
    try {
      // Try to find user by Google ID
      let user = await User.findOne({ googleId: googleUserData.googleId });

      if (user) {
        // Update user info if needed
        user.email = googleUserData.email;
        user.name = googleUserData.name;
        user.profile = user.profile || {};
        user.profile.avatar = googleUserData.picture;
        user.isVerified = googleUserData.verified || user.isVerified;
        await user.save();
      } else {
        // Try to find user by email
        user = await User.findOne({ email: googleUserData.email });

        if (user) {
          // Link Google account to existing user
          user.googleId = googleUserData.googleId;
          user.authProvider = 'google';
          user.profile = user.profile || {};
          user.profile.avatar = googleUserData.picture;
          user.isVerified = googleUserData.verified || user.isVerified;
          await user.save();
        } else {
          // Create new user without phone (OAuth users don't need phone initially)
          user = await User.create({
            googleId: googleUserData.googleId,
            email: googleUserData.email,
            name: googleUserData.name,
            authProvider: 'google',
            isVerified: googleUserData.verified || false,
            profile: {
              avatar: googleUserData.picture
            }
          });
        }
      }

      // Generate JWT token
      const token = generateToken(user._id);

      return {
        user,
        token
      };
    } catch (error) {
      console.error('Error finding or creating user:', error);
      throw new Error('Failed to authenticate user');
    }
  },

  // Handle Google OAuth callback
  async handleCallback(code) {
    try {
      // Exchange code for tokens
      const tokens = await this.getTokens(code);

      // Get user info from Google
      const googleUserData = await this.getUserInfo(tokens.accessToken);

      // Find or create user
      const { user, token } = await this.findOrCreateUser(googleUserData);

      return {
        user,
        token,
        refreshToken: tokens.refreshToken
      };
    } catch (error) {
      console.error('Error handling Google OAuth callback:', error);
      throw error;
    }
  }
};

export default googleAuthService;

