const isInputDataValid = require('../../utils/isInputsValid');
const HttpError = require('../../models/http-error');
const User = require('../../models/user');

const signup = async (req, res, next) => {
  const { name, email, password, address } = req.body;

  // Check if there is invalid fields passed.
  const passedInputsFields = Object.keys(req.body);
  const allowedInputsFields = ['name', 'email', 'password', 'address', 'image'];
  const isFieldsValid = isInputDataValid(
    passedInputsFields,
    allowedInputsFields
  );
  if (!isFieldsValid) {
    return next(
      new HttpError(
        `Not allowed field passed, allowed fields: [${allowedInputsFields}]!`,
        400
      )
    );
  }

  // Check the required inputs.
  if (!name || !email || !password || !address) {
    return next(
      new HttpError(
        `Missing inputs! required inputs [name, email, password, address].`,
        400
      )
    );
  }

  // Check if the email is already in use.
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new HttpError(`Email is already in use!`, 422));
    }
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  // Create the user.
  const newUser = new User({
    name,
    email,
    password,
    address,
    image: req.file ? `${req.file.destination}/${req.file.filename}` : '',
  });

  // Save the user.
  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  // Generate auth tokens.
  let token;
  try {
    token = await newUser.generateAuthToken();
  } catch (err) {
    return next(new HttpError('Unable to signup!', 500));
  }

  res.status(201).json({
    message: 'User created!',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      address: newUser.address,
      image: newUser.image,
    },
    token,
  });
};

module.exports = signup;
