const mongoose = require ('../database');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken.js')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  telefones: {
    type:Array,
    require: true,
  },
  senha:{
    type: String,
    required: true,
    selected: true,
  },
  data_criacao: {
    type: Date,
    default: Date.now,
  },
  data_atualizacao: {
    type: Date,
    default: Date.now,
  },
  ultimo_login: {
    type: Date,
    required: false
  },
  token: {
    type: String,
    required: false
  }
});

UserSchema.pre ('save', async function (next){
  const hash = await bcrypt.hashSync(this.senha, 10);
  this.senha = hash;
  this.token = generateToken();

  next();
})

const User = mongoose.model('user', UserSchema);

module.exports = User;