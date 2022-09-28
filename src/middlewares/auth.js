const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');
const User = require('../models/user');

const auth = async (req, res, next) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  try {
    // Get token from header.
    const token = req.headers.authorization.replace('Bearer ', ''); // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error();
    }

    // Verify token.
    const decoded = jwt.verify(token, secretKey);
    if (!decoded) {
      throw new Error();
    }

    // Find user by id.
    const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }

    // Set user and token to request.
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    return next(new HttpError('Authentication failed!', 401));
  }
};

module.exports = auth;
