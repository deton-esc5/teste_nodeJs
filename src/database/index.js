const mongoose = require ('mongoose');

const URI = process.env.MONGO_URI || 'mongodb://localhost/noderest';

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;

module.exports = mongoose