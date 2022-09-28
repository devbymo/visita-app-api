const axios = require('axios');
require('dotenv').config();

const getCoordinates = async (address) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.GEOCODING_API_KEYS}&limit=1`;

  const res = await axios.get(geocodeUrl);
  const data = res.data;

  let coordinates;

  if (data.features.length === 0) {
    coordinates = {
      lat: 31.2001,
      lng: 29.9187,
    };
  } else {
    coordinates = {
      lat: data.features[0].geometry.coordinates[1] || 31.2001,
      lng: data.features[0].geometry.coordinates[0] || 29.9187,
    };
  }

  return coordinates;
};

module.exports = getCoordinates;
