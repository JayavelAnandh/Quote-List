const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
function connectDataBase() {
  const params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.MONGO_DB_URL, params);
    console.log("DB is connected !");
  } catch (error) {
    console.log(error);
  }
}
module.exports = { connectDataBase };
