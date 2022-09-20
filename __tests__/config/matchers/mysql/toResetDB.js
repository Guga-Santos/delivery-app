const { result } = require("../../utils/assertionAux");
const resetDB = require("../../utils/resetDB");

const { defaultDB, restore } = require("../../constants").database;

async function toResetDB(database) {
  try {
    let pass = true;

    if (restore) {
      await database
        .query(`DROP DATABASE IF EXISTS \`${defaultDB}\`;`)
        .catch((e) => console.warn(e.message));
      pass = await resetDB();
    }

    return result(null, pass);
  } catch (e) {
    return result(
      null,
      false,
      `Não foi possível executar a query no banco de dados:\n"${e.message}"`
    );
  }
}

module.exports = toResetDB;
