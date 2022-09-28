const { app } = require('./app');

// Set-up port.
const port = process.env.PORT || 3000;

// Fire up the server.
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
