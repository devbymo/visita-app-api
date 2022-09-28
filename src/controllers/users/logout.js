const HttpError = require('../../models/http-error');

const logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
  } catch (error) {
    return next(new HttpError('Unable to logout!', 500));
  }

  res.status(200).json({ message: 'Logged out successfully.' });
};

module.exports = logout;
