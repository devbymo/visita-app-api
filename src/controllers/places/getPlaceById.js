const HttpError = require('../../models/http-error');
const Place = require('../../models/place');

const getPlaceById = async (req, res, next) => {
  const { placeId } = req.params;

  // Allow to authanticated users only to get the place by ID.
  // Authanticated user should have that place first.
  const isAuthanticatedUserContainsThePlace = req.user.places.includes(placeId);
  if (!isAuthanticatedUserContainsThePlace) {
    return next(new HttpError('You are not allowed to get this place.', 401));
  }

  // Find the place.
  let place;
  try {
    place = await Place.findOne({ _id: placeId });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  // Check if the place exists.
  if (!place) {
    return next(
      new HttpError('Could not find place for the provided id.', 404)
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

module.exports = getPlaceById;
