const HttpError = require('../../models/http-error');
const isInputDataValid = require('../../utils/isInputsValid');
const Place = require('../../models/place');

const validateUpdatePlaceInputs = async (req, res, next) => {
  const { placeId } = req.params;

  // Check if the authanticated user is the creator of the place.
  const isAuthanticatedUserContainsThePlace = req.user.places.includes(placeId);
  if (!isAuthanticatedUserContainsThePlace) {
    return next(
      new HttpError(
        'You are not allowed to update a place that you did not create.',
        401
      )
    );
  }

  // Check if there is invalid fields passed.
  const passedUpdates = Object.keys(req.body);
  const allowedUpdates = ['description', 'title'];
  const isValid = isInputDataValid(passedUpdates, allowedUpdates);
  if (!isValid) {
    return next(
      new HttpError(
        `Not allowed updates passed, allowed updates: [${allowedUpdates}]!`,
        400
      )
    );
  }

  // validate title and description.
  const { title, description } = req.body;
  if (title) {
    const isTitleValid = title.length >= 5;
    if (!isTitleValid) {
      return next(
        new HttpError('Title must be at least 5 characters long.', 400)
      );
    }
  }

  if (description) {
    const isDescriptionValid = description.length >= 5;
    if (!isDescriptionValid) {
      return next(
        new HttpError('Description must be at least 5 characters long.', 400)
      );
    }
  }

  // Find the place.
  let place;
  try {
    place = await Place.findOne({ _id: placeId });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  // Check if place exists.
  if (!place) {
    return next(new HttpError('Place not found!', 404));
  }

  // Forward the place to be updated.
  req.placeToUpdate = place;
  next();
};

module.exports = validateUpdatePlaceInputs;
