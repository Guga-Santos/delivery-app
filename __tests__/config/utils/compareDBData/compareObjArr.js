const compareObjArr = (arrayReceived, arrayExpected) => {
  const received = Array.from(arrayReceived);
  const expected = Array.from(arrayExpected);

  const keys = Object.keys(expected[0]);
  const indexKey = keys.find((el) => el === "id") ? "id" : keys[0];

  let diff = [];

  for (let i = 0; i < expected.length; i++) {
    const iE = expected[i];
    const iR = received.find((el) => el[indexKey] === iE[indexKey]);
    if (iR) {
      for (let key of keys) {
        let keyDiff;

        if (iR[key]) {
          if (typeof iE[key] === "function") {
            const attrTest = iE[key](iR[key]);
            if (attrTest !== true) {
              keyDiff = attrTest;
            }
          } else if (iE[key] !== iR[key]) {
            keyDiff = iR[key];
          }
        } else if (!iR[key]) {
          keyDiff = "Não definido";
        }

        if (keyDiff) {
          const result = {
            [key]: {
              Esperado: iE[key],
              Recebido: keyDiff,
            },
          };

          if (diff.length > 0) {
            const existingId = diff.findIndex(
              (iD) => iD[indexKey] === iE[indexKey]
            );
            if (existingId > -1) {
              diff[existingId] = {
                ...diff[existingId],
                ...result,
              };
            } else {
              diff.push({
                [indexKey]: iE[indexKey],
                ...result,
              });
            }
          } else {
            diff.push({
              [indexKey]: iE[indexKey],
              ...result,
            });
          }
        }
      }
    } else {
      diff.push({
        [indexKey]: iE[indexKey],
        Esperado: iE,
        Recebido: "undefined",
      });
    }
  }

  return diff.length > 0 ? diff : true;
};

module.exports = compareObjArr;
