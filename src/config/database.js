const mongoose = require('mongoose')
mongoose.Promise = global.Promise
var mongoUrl = 'mongodb://localhost/mock_test_bd'

mongoose.connection.on('connected', function() {
    console.log('Connection established to MongoDB');
});

var connectWithRetry = function() {
  return mongoose.connect(mongoUrl, { useNewUrlParser: true }, function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    }
  });
};
connectWithRetry();
