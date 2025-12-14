const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const extractTokenFromRequest = (request) => {
  if (request.headers && request.headers.authorization) {
    // Authorization: Bearer <token>
    const parts = request.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') return parts[1];
  }
  if (request.query && request.query.token) return request.query.token;
  return null;
};

const verifyToken = (request) => {
  const token = extractTokenFromRequest(request);
  if (token === null) throw new Error('Missing token');
  return jwt.verify(token, JWT_SECRET);
};

const authenticate = (req, res, next) => {
  try {
    const decoded = verifyToken(req);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: err })
  }
};

module.exports = { authenticate, verifyToken };
