const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
      trim: true,
      minLength: [3, 'Title must be at least 3 characters long!'],
      maxLength: [50, 'Title must be less than 50 characters long!'],
    },
    description: {
      type: String,
      required: [true, 'Description is required!'],
      trim: true,
      maxLength: [500, 'Description can not be more than 500 characters!'],
      minLength: [10, 'Description can not be less than 10 characters!'],
    },
    image: {
      type: String,
      required: [true, 'Image is required!'],
      default:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    },
    address: {
      type: String,
      required: [true, 'Address is required!'],
      trim: true,
      minLength: [5, 'Address must be at least 5 characters long!'],
      maxLength: [50, 'Address must be less than 50 characters long!'],
    },
    coordinates: {
      lat: {
        type: String,
        required: [true, 'Latitude is required!'],
      },
      lng: {
        type: String,
        required: [true, 'Longitude is required!'],
      },
    },
    rating: {
      type: Number,
      min: [1, 'Rating can not be less than 1!'],
      max: [5, 'Rating can not be more than 5!'],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator is required!'],
    },
  },
  {
    timestamps: true,
  }
);

// =====================
// MODEL METHODS
// =====================

// =====================
// INSTANCES METHODS
// =====================

// =====================
// MODEL MIDDLEWARES
// =====================

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
