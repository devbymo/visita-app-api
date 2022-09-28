const HttpError = require('../../models/http-error');
const User = require('../../models/user');

const getPlacesByUserId = async (req, res, next) => {
  const { userId } = req.params;

  let placesCreatedByUser;
  try {
    placesCreatedByUser = await User.findOne({ _id: userId }).populate(
      'places'
    );
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  // Check if the places exists.
  if (!placesCreatedByUser || placesCreatedByUser.places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.status(200).json({
    places: placesCreatedByUser.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

module.exports = getPlacesByUserId;
