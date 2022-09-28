const HttpError = require('../../models/http-error');
const User = require('../../models/user');

const getUsers = async (req, res, next) => {
  // Get all users & limit the returned data.
  let users;
  try {
    users = await User.find({}, '-password -tokens -__v -createdAt -updatedAt');
  } catch (error) {
    return next(
      new HttpError('Unable to retrive users, please try again!', 500)
    );
  }

  res.status(200).json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

module.exports = getUsers;
