const {
  getBanks,
  resolveAccount,
} = require("../controllers/transactions/transactions");
const { protect } = require("../middlewares/protect.middleware");

const resolve = require("express").Router();

resolve.route("/bank").get(protect, getBanks).post(protect, resolveAccount);

module.exports = resolve;
