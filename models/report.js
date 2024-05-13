const mongoose = require("mongoose");

let reportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  quoteCount: {
    type: Number,
    required: true,
  },
});
const Report = mongoose.model("report", reportSchema);
module.exports = { Report };
