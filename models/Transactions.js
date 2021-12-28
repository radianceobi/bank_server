const { v1 } = require("uuid");
const Transaction = (sequelize, DataTypes) =>
  sequelize.define("Transactions", {
    transaction_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: v1(),
      unique: true,
    },
    receiver: {
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
    },
    type: {
      type: DataTypes.ENUM("CREDIT", "DEBIT"),
      defaultValue: "DEBIT",
    },
  });
module.exports = Transaction;
