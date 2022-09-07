const fs = require('fs');
const path = require('path');
const { rootDir } = require('./../const');
const { guid } = require('./../guid');

class UserRepository {
  constructor() {
    this._filename = path.resolve(rootDir, 'users.json');
    this._users = [];
  }

  start() {
    fs.readFile(this._filename, (err, data) => {
      if (err) {
        fs.writeFileSync(this._filename, JSON.stringify([], null, 2));
        return;
      }
      let users = JSON.parse(data);
      console.log(users);
      this._users = users;
    });
  }

  _persist() {
    fs.writeFileSync(this._filename, JSON.stringify(this._users, null, 2));
  }

  addUser({name, description, avatar, email, password}) {
    const existsUser = this._users.find(u => u.email === email);
    if (existsUser) {
      return;
    }

    const user = {
      name,
      description,
      avatar,
      email,
      password,
      id: guid()
    }
    this._users.push(user);
    this._persist();
    return user.id;
  }

  updateUser({id, password, name, description, avatar}) {
    const user = this._users.find(u => u.id === id);
    if (!user) {
      return false;
    }
    Object.assign(user, {
      password, name, description, avatar
    });
    this._persist();
    return true;
  }

  findUser({email, password}) {
    const user = this._users.find(u => u.email === email && u.password === password);
    if (!user) { return; }
    const { password: p, ...rest } = user;
    return rest;
  }

  getUserById(id) {
    return this._users.find(u => u.id === id);
  }
}

module.exports = {
  userRepository: new UserRepository()
};
