const { result } = require("../../utils/assertionAux");

async function toValidateConnection(database) {
  const [received] = await database
    .execute("SELECT 1 as connected;")
    .catch(() => [[0]]);

  const pass = received[0].connected === 1;

  return result(null, pass, "Não foi possível conectar ao banco de dados!");
}

module.exports = toValidateConnection;
