const mongoose = require('mongoose');
const HttpError = require('../../models/http-error');
const Place = require('../../models/place');
const fs = require('fs');

const deletePlace = async (req, res, next) => {
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

  // Find the place.
  let place;
  try {
    place = await Place.findOne({ _id: placeId }).populate('creator');
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  // Check if place exists.
  if (!place) {
    return next(new HttpError('Place not found!', 404));
  }

  // Delete the place from the user's places.
  // Using transaction & session.
  try {
    // Begin the transaction.
    const session = await mongoose.startSession();
    session.startTransaction();

    // Delete the place.
    await place.remove({ session });

    // Delete the place id from the user.
    // To do this step you should populate the user id (creator).
    place.creator.places.pull(placeId);

    // Save the user.
    await place.creator.save({ session });

    // Commit the transaction.
    await session.commitTransaction();
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  // Remove the image from the server.
  const { image: imagePath } = place;
  fs.unlink(imagePath, (err) => {
    return next(new HttpError(err.message, 500));
  });

  res.status(200).json({
    message: 'Place deleted successfuly.',
  });
};

module.exports = deletePlace;
