const express = require('express');
require('./db/mongoose');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();

// =====================
// MIDDLEWARES
// =====================

// Parse incoming requests data.
app.use(express.json());

// CORS middleware
app.use(cors());

// HTTP security headers.
app.use(helmet());

// Apply rate limiting to all requests.
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // limit each IP to 100 requests per windowMs
  standerdHeaders: true, // return rate limit headers in response
  message: 'Too many requests from this IP, please try again in an hour.',
});
app.use(limiter);

// Staticly serve the images folder.
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// API routes.
app.use('/api/v1/places', placesRoutes);
app.use('/api/v1/users', usersRoutes);

// Route not found.
app.use((req, res, next) => {
  next(new HttpError('Route not found!', 404));
});

// Genaric error handler middleware.
// All errors is catched here.
app.use((error, req, res, next) => {
  // While creating the place OR removing the place if the session fails to commit, we will remove the image from the server.
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headersSent) {
    return next(error);
  }

  const { statusCode, message } = error;

  res.status(statusCode || 500);
  res.json({
    error: {
      message: message || 'Something went wrong!',
    },
  });
});

module.exports = { app };
