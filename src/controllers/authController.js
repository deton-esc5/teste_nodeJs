const User = require ('../models/User');
const config = require('../config/config');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const authController = {
  signup: async (req, res) => {
    try {
      const { nome, email, senha } = req.body

      const user = await User.create({ nome, email, senha });

      return res.status(201).send({ user });
    }catch (err) {
      res.status(400).send ({ mensagem: 'Falha no Registro' });
    }
  },

  signin: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const user = await User.findOne({ email });
      const ultimo_login = new Date();

      const valid = bcrypt.compareSync(senha, user.senha);
      user.senha = undefined;

      if (!user || !valid) {
        throw 'Usuário e/ou senha inválidos';
      }

      user.updateOne({email}, {ultimo_login})

      const token = jwt.sign({token: user.token}, config.secret, {
        expiresIn: config.expiresIn,
      });

      return res
        .status(200)
        .json({ token });

    } catch (error) {

      return res.status(401).send({ mensagem: error})
    }
  }
}


module.exports = authController