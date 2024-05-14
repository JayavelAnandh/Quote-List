const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
function connectDataBase() {
  try {
    mongoose.connect(process.env.MONGO_DB_URL);
    console.log("DB is connected !");
  } catch (error) {
    console.log(error);
  }
}
module.exports = { connectDataBase };
