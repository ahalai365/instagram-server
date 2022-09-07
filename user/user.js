const { userRepository } = require('./user.repository');
const { sign } = require('jsonwebtoken');

function registerUser(request, response, next) {
  const id = userRepository.addUser(request.body);
  if (!id) {
    response.status(400).send(JSON.stringify({ success: false, error: 'Email already taken' }));
  } else {
    response.status(200).send(JSON.stringify({ success: true, userId: id }));
  }

}

function loginUser(request, response, next) {
  const user = userRepository.findUser(request.body);
  if (!user) {
    response.status(401).send(JSON.stringify({ success: false }));
  } else {
    const token = sign({ id: user.id }, 'very-secret-phrase');
    response.status(200).send(JSON.stringify({ success: true, token }));
  }
}

function updateUser(request, response, next) {
  const user = userRepository.updateUser(request.body);
  if (!user) {
    response.status(401).send(JSON.stringify({ success: false }))
  } else {
    response.status(200).send(JSON.stringify({ success: true, user }));
  }
}

function getUser(request, response, next) {
  const user = userRepository.getUserById(request.userId);
  if (!user) {
    return response.status(404).set('Content-Type', 'application/json').send(JSON.stringify({ success: false }));
  } else {
    const { password, ...rest } = user;
    return response.status(200).set('Content-Type', 'application/json').send(JSON.stringify({ success: true, user: rest }));
  }

}

module.exports = {
  registerUser, loginUser, updateUser, getUser
};
