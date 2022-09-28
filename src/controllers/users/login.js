const isInputDataValid = require('../../utils/isInputsValid');
const HttpError = require('../../models/http-error');
const User = require('../../models/user');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate passed fields.
  const passedFields = Object.keys(req.body);
  const allowedFields = ['email', 'password'];
  const isFieldsValid = isInputDataValid(passedFields, allowedFields);
  if (!isFieldsValid) {
    return next(
      new HttpError(
        `Not allowed field passed, allowed fields: [${allowedFields}]!`,
        400
      )
    );
  }

  // Validate required inputs.
  if (!email || !password) {
    return next(
      new HttpError(`Missing inputs! required inputs [email, password].`, 400)
    );
  }

  // Search using email & password.
  let user;
  try {
    user = await User.findByCredentials(email, password);
  } catch (error) {
    return next(new HttpError('Unable to login!', 401));
  }

  // Check if user exists or not.
  if (!user) {
    return next(new HttpError('Unable to login!', 401));
  }

  // Generate auth tokens.let token;
  try {
    token = await user.generateAuthToken();
  } catch (err) {
    return next(new HttpError('Unable to login!', 500));
  }

  res.status(200).json({
    message: 'Logged in successfully.',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      image: user.image,
    },
    token,
  });
};

module.exports = login;
