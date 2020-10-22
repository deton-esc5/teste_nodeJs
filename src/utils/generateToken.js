const crypto = require('crypto');

module.exports = function generateToken() {
  return crypto
    .randomBytes(16)
    .toString('hex');
}