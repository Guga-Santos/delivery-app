const compareObjArr = require("./compareObjArr");
const mysqlType = require("./mysql_column_types");

const compareDBData = (data, expected, types) => {
  let compareMetaData = true;
  const compareResult = compareObjArr(data[0], expected);

  if (types) {
    const receivedTypes = Array.from(data[1]).map(
      ({ name: columnName, columnType, decimals }) => ({
        columnName,
        columnType: mysqlType(columnType),
        decimals: decimals > 0 ? decimals : undefined,
      })
    );
    compareMetaData = compareObjArr(receivedTypes, types);
  }

  const result = (compareResult === true && compareMetaData === true) || {
    Registros: compareResult,
    Colunas: compareMetaData,
  };

  return result;
};

module.exports = compareDBData;
