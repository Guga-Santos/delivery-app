const includesObjArr = ([arrayReceived], objectReceived) => {
  let result = true;

  let info = {};

  result = arrayReceived.filter((el) => {
    const keys = Object.keys(objectReceived);
    let filter = true;
    for (const key of keys) {
      if (typeof objectReceived[key] === "function") {
        if (objectReceived[key](el[key]) !== true) {
          info[key] = objectReceived[key](el[key]);
          filter = false;
        }
      } else if (el[key] !== objectReceived[key]) {
        filter = false;
      }
    }
    return filter;
  });

  const consulta =
    arrayReceived.length > 4
      ? [
          arrayReceived[0],
          arrayReceived[1],
          { itensOcultados: arrayReceived.length - 3 },
          arrayReceived[arrayReceived.length - 1],
        ]
      : arrayReceived;

  return (
    !!result.length || {
      consulta,
      dadoEsperado: objectReceived,
      info,
    }
  );
};

module.exports = includesObjArr;
