const db = require('./database/dbconfig');

module.exports = async () => {
  await db.destroy();
};
