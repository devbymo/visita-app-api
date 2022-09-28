class HttpError extends Error {
  constructor(message, statusCode) {
    super(message); // Adds a 'message' property to the object.
    this.statusCode = statusCode; // Adds a 'status code' to the object.
  }
}

module.exports = HttpError;
