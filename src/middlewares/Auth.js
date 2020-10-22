const jwt = require('jsonwebtoken');

const { secret } = require('../config/config');

module.exports = (req, res, next) => {
  try {
    const tokenHeader = req.headers.authentication;

    if(!tokenHeader) {
      throw 'Nenhum token fornecido.';
    }

    const parts = tokenHeader.split(' ');

    if(parts.length !== 2) {
      throw 'Requisição não pode ser processada.';
    }
    const [scheme, token] = parts;

    if(!/Bearer/i.test(scheme)) {
      throw 'Token com erro de formação.';
    }

    jwt.verify(token, secret, (error, decoded) => {

      if(error) {
        throw 'Invalid token.'
      }
      req.token = decoded.token;

      next();
    });

  } catch (error) {
    return res
      .status(401)
      .send({ mensagem: error });
  }
}
