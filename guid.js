/**
 * Создает уникальный строковый идентификатор
 */
function guid() {
  function s4() {
    const hexSize = 16;
    const chunkSize = 0x10000;

    return Math.floor((1 + Math.random()) * chunkSize)
      .toString(hexSize)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

module.exports = { guid };
