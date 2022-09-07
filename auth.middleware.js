const { verify } = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: 'Необходима авторизация' });
  }
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(400).send({ error: 'Некорректный заголовок авторизации' });
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const payload = verify(token, 'very-secret-phrase');
    req.userId = payload.id;
    next();
  } catch(e) {
    return res.status(400).send(JSON.stringify({ error: 'Невалидный токен' }));
  }
}

module.exports = { authMiddleware };
