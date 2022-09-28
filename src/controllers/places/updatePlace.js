const HttpError = require('../../models/http-error');

const updatePlace = async (req, res, next) => {
  let { description, title } = req.body;
  let { placeToUpdate } = req;

  // Clean the inputs.
  discription = description.trim();
  title = title.trim();

  // Update the place.
  if (discription && description.length !== 0) {
    placeToUpdate.description = description;
  }
  if (title && title.length !== 0) {
    placeToUpdate.title = title;
  }

  // Save the place.
  try {
    await placeToUpdate.save();
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  res.status(200).json({
    message: 'Place updated successfully.',
    updatedPlace: placeToUpdate.toObject({ getters: true }),
  });
};

module.exports = updatePlace;
