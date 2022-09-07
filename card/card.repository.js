const fs = require('fs');
const path = require('path');
const { rootDir } = require('./../const');
const { guid } = require('./../guid');

class CardRepository {
  constructor() {
    this._filename = path.resolve(rootDir, 'cards.json');
    this._cards = [];
  }

  start() {
    fs.readFile(this._filename, (err, data) => {
      if (err) {
        fs.writeFileSync(this._filename, JSON.stringify([], null, 2));
        return;
      }
      let cards = JSON.parse(data);
      this._cards = cards;
    });
  }

  _persist() {
    fs.writeFileSync(this._filename, JSON.stringify(this._cards, null, 2));
  }

  addCard({ title, url, userId }) {
    const card = {
      id: guid(),
      title,
      url,
      userId,
      likes: []
    }
    this._cards.push(card);
    this._persist();

    return card;
  }

  getAllCards() {
    return this._cards;
  }

  deleteCard(cardId, userId) {
    const existsCard = this._cards.find(c => c.id === cardId && c.userId === userId);
    if (!existsCard) {
      return false;
    }
    this._cards = this._cards.filter(card => card.id !== cardId);
    this._persist();
    return true;
  }

  likeCard({ cardId, userId }) {
    const card = this._cards.find(c => c.id === cardId);
    if (!card) {
      return;
    }

    if (card.likes.includes(userId)) {
      card.likes = card.likes.filter(like => like !== userId);
    } else {
      card.likes.push(userId);
    }
    this._persist();
    return card;
  }
}

module.exports = {
  cardRepository: new CardRepository()
};
