const { v1 } = require("uuid");
const Transaction = (sequelize, DataTypes) =>
  sequelize.define("Transactions", {
    transaction_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: v1(),
      unique: true,
    },
    reciever: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: new Date().toUTCString(),
    },
  });
module.exports = Transaction;
