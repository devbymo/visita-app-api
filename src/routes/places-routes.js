const { Router } = require('express');

const getPlaceById = require('../controllers/places/getPlaceById');
const getPlacesByUserId = require('../controllers/places/getPlacesByUserId');
const createPlace = require('../controllers/places/createPlace');
const updatePlace = require('../controllers/places/updatePlace');
const deletePlace = require('../controllers/places/deletePlace');
const validateUpdatePlaceInputs = require('../controllers/places/validateUpdatePlaceInputs');
const validateCreatePlaceInputs = require('../controllers/places/validateCreatePlaceInputs');
const ImageUpload = require('../middlewares/image-upload');
const auth = require('../middlewares/auth');

// Init places routes.
const router = Router();

// Get place by id.
router.get('/:placeId', auth, getPlaceById);

// Update place.
router.patch('/:placeId', auth, validateUpdatePlaceInputs, updatePlace);

// Delete place.
router.delete('/:placeId', auth, deletePlace);

// Create place.
router.post(
  '/create',
  auth,
  ImageUpload.single('image'),
  validateCreatePlaceInputs,
  createPlace
);

// Get places by userId.
router.get('/user/:userId', getPlacesByUserId);

// Export places routes.
module.exports = router;
