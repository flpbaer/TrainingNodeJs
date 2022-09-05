const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CounterModelSchema = new Schema({
  nameProd: String,
  codProduct: Number,
  quantity: String,
  peso: String,
});

module.exports = mongoose.model("CounterModel", CounterModelSchema)