const timeInMinutes = 30;
const measureTime = 'm'
const expiresIn = `${60 * timeInMinutes}${measureTime}`;
const secret = 'h%-ILAAW$UuSr)W.6u4UDf$]p?Orh{';

const options = {
  expiresIn,
  secret
}

module.exports = options;