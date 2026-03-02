import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Business from '../models/Business.js';
import Rider from '../models/Rider.js';

const getTokenFromSocket = (socket) => {
  const authToken = socket.handshake?.auth?.token;
  if (authToken) return authToken;

  const headerToken = socket.handshake?.headers?.authorization;
  if (headerToken?.startsWith('Bearer ')) {
    return headerToken.split(' ')[1];
  }

  return null;
};

export const authenticateSocket = async (socket, next) => {
  try {
    const token = getTokenFromSocket(socket);

    if (!token) {
      return next(new Error('Socket auth failed: missing token'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('_id name email role');

    if (!user) {
      return next(new Error('Socket auth failed: user not found'));
    }

    const [business, rider] = await Promise.all([
      Business.findOne({ owner: user._id }).select('_id'),
      Rider.findOne({ user: user._id }).select('_id status')
    ]);

    socket.data.user = {
      id: user._id.toString(),
      role: user.role,
      email: user.email,
      name: user.name
    };
    socket.data.businessId = business?._id?.toString() || null;
    socket.data.riderId = rider?._id?.toString() || null;

    return next();
  } catch (error) {
    return next(new Error(`Socket auth failed: ${error.message}`));
  }
};

export default authenticateSocket;
