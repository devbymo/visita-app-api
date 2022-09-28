const HttpError = require('../../models/http-error');
const Place = require('../../models/place');

const getAllPlaces = async (req, res, next) => {
  let places;
  try {
    places = await Place.find({});
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find places.',
      500
    );
    return next(error);
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

module.exports = getAllPlaces;
