const express = require ('express');
const bodyParser = require ('body-parser');
const createError = require('http-errors');
const app = express();

const signRoutes = require('./routes/signRoutes');
const userRoutes = require('./routes/userRoutes');
const AuhMiddleware = require('./middlewares/Auth')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended: false}));
app.use(express.json());

app.use('/auth', signRoutes);

app.use(AuhMiddleware);

app.use('/users', userRoutes);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  return res
    .status(err.status || 500)
    .json({ mensagem: err.message})
    .send(next(err.message))
});

app.listen(3000);