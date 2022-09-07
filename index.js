const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const {userRepository} = require('./user/user.repository');
const {cardRepository} = require('./card/card.repository');
const {registerUser, getUser, loginUser, updateUser} = require('./user/user');
const {getAllCards, createCard, deleteCard, likeCard} = require('./card/card');
const {sign} = require('jsonwebtoken');
const {authMiddleware} = require('./auth.middleware');

console.log(sign);

const options = {
  origin: [
    'http://localhost:8080'
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

userRepository.start();
cardRepository.start();

const server = express();
server.use(bodyParser.json());

const userRouter = express.Router();

userRouter.post('/user/register', registerUser);
userRouter.post('/user/login', loginUser);
userRouter.post('/user/update', authMiddleware, updateUser);
userRouter.get('/user/profile', authMiddleware, getUser);

const cardRouter = express.Router();

cardRouter.get('/cards', getAllCards);
cardRouter.post('/cards', authMiddleware, createCard);
cardRouter.delete('/cards', authMiddleware, deleteCard);
cardRouter.post('/cards/like', authMiddleware, likeCard);

server.use(cors(options));
server.use(userRouter);
server.use(cardRouter);

server.listen(8200, () => {
  console.log('Server start');
});
