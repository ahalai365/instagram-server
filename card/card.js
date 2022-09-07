const { cardRepository } = require('./card.repository');

function getAllCards(request, response) {
  response.status(200).send(JSON.stringify(cardRepository.getAllCards()));
}

function createCard(request, response) {
  const userId = request.userId;
  const card = cardRepository.addCard({ ...request.body, userId });
  response.status(200).send(JSON.stringify(card));
}

function deleteCard(request, response) {
  const userId = request.userId;
  const result = cardRepository.deleteCard(request.body.cardId, userId);
  if (result) {
    response.status(200).send(JSON.stringify({ success: true }));
  } else {
    response.status(404).send(JSON.stringify({ success: false, error: 'Нельзя' }));
  }
}

function likeCard(request, response) {
  const userId = request.userId;
  const card = cardRepository.likeCard({ userId, cardId: request.body.cardId });
  if (card) {
    response.status(200).send(JSON.stringify({ success: true, card }));
  } else {
    response.status(400).send(JSON.stringify({ success: false }));
  }
}

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
}
