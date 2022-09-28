const mongoose = require('mongoose');
const HttpError = require('../../models/http-error');
const Place = require('../../models/place');

const createPlace = async (req, res, next) => {
  // Create the place.
  const { newPlace, user } = req;
  const createdPlace = new Place(newPlace);

  // Now we want to save the place & add new created place id to the user's places.
  // And if one of the above steps fails, we want to end the session without saving the place. [if one fails undo all]
  // How to do this?
  // using transaction & session.
  // transaction is a way to run multiple operations in one session.
  try {
    // Begin the transaction & session.
    const session = await mongoose.startSession();
    session.startTransaction();

    // 1) Save the place.
    await createdPlace.save({ session });

    // 2) Add the place id to the user.
    user.places.push(createdPlace.id);
    await user.save({ session });

    // Commit the transaction.
    await session.commitTransaction();
  } catch (error) {
    return next(
      new HttpError(
        error.message || 'Creating place faild, please try again.',
        500
      )
    );
  }

  res.json({
    message: 'Place created successfully!',
    createdPlace: createdPlace.toObject({ getters: true }),
  });
};

module.exports = createPlace;
