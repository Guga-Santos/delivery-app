const types = [
  { columnName: 'id', columnType: 'INT' },
  { columnName: 'user_id', columnType: 'INT' },
  { columnName: 'seller_id', columnType: 'INT' },
  { columnName: 'total_price', columnType: 'DECIMAL', decimals: 2 },
  { columnName: 'delivery_address', columnType: 'VARCHAR' },
  { columnName: 'delivery_number', columnType: 'VARCHAR' },
  { columnName: 'sale_date', columnType: 'DATETIME' },
  { columnName: 'status', columnType: 'VARCHAR' }
];

module.exports = types
