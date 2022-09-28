const mongoose = require('mongoose');
const HttpError = require('../../models/http-error');
const isInputDataValid = require('../../utils/isInputsValid');
const getCoordinates = require('../../utils/getCoordinates');

const validateCreatePlaceInputs = async (req, res, next) => {
  // Add image to the body if it is not provided.
  req.body.image = req.file.path
    ? `${req.file.destination}/${req.file.filename}`
    : 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60';
  const { address, description, title, rating, image, creator } = req.body;
  let { lat, lng } = req.body;
  let coordinates = {
    lat,
    lng,
  };

  // Validate if the authanticated user is the creator of the place.
  if (req.user.id !== creator) {
    return next(
      new HttpError(
        'You are not allowed to create a place for another user.',
        401
      )
    );
  }

  // Check if there is invalid fields passed.
  const passedFields = Object.keys(req.body);
  const allowedFields = [
    'address',
    'description',
    'title',
    'lat',
    'lng',
    'rating',
    'image',
    'creator',
  ];
  const isValid = isInputDataValid(passedFields, allowedFields);
  if (!isValid) {
    return next(
      new HttpError(
        `Not allowed field passed, allowed fields: [${allowedFields}]!`,
        400
      )
    );
  }

  // Check the required inputs.
  if (!address || !description || !title || !creator || !image) {
    return next(
      new HttpError(
        `Missing inputs! required inputs: [address, description, title, creator, image]`,
        400
      )
    );
  }

  // Check if user id is valid.
  if (req.user.id !== creator) {
    return next(
      new HttpError(
        'You are not allowed to create a place for another user.',
        401
      )
    );
  }

  // Check coordinates.
  if (+lat === 0 || +lng === 0) {
    try {
      // Generate coordinates.
      coordinates = await getCoordinates(title);
    } catch (err) {
      // If there is an error generating coordinates we will use the default coordinates.
    }
  }

  // Create the place.
  const newPlace = {
    title: title.trim(),
    address,
    description: description.trim(),
    coordinates: coordinates || {
      lat: 31.2001,
      lng: 29.9187,
    },
    rating: rating || 1,
    image,
    creator,
  };

  // Forward the place to be created.
  req.newPlace = newPlace;
  next();
};

module.exports = validateCreatePlaceInputs;
