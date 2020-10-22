const User = require ('../models/User');

const userController = {
  search: async (req, res) => {
    try {
      const {token} = req;
      const { user_id } = req.params;
      const hora_atual = new Date();

      const user = await User.findOne({ token, id: user_id });

      if (!user) {
        throw {
          status: 401,
          mensagem: 'Não autorizado'
        }
      }

      user.senha = undefined;
      const ultimo_login = new Date(user.ultimo_login);
      const diffMs = (ultimo_login - hora_atual);
      const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

      if (token !== user.token) {
        throw {
          status: 401,
          mensagem: 'Não autorizado'
        }
      }

      if (diffMins > 30) {
        throw {
          status: 403,
          mensagem: 'Sessão inválida'
        }
      }
      return res
        .status(200)
        .json({ user });

    } catch (error) {

      return res
        .status(error.status || 500)
        .json({ mensagem: error.mensagem || 'Erro no servidor, tente novamente mais tarde.' })
    }
  },
  show: async (req, res) => {
    try {
      const {token} = req;
      const hora_atual = new Date();

      const user = await User.findOne({ token });
      user.senha = undefined;

      const ultimo_login = new Date(user.ultimo_login);
      const diffMs = (ultimo_login - hora_atual);
      const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

      if (token !== user.token || !user) {
        throw {
          status: 401,
          message: 'Não autorizado'
        }
      }

      if (diffMins > 30) {
        throw {
          status: 403,
          message: 'Sessão inválida'
        }
      }
      return res
        .status(200)
        .json({ user });
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ mensagem: error.mensagem || 'Erro no servidor, tente novamente mais tarde.' })
    }
  }
}

module.exports = userController