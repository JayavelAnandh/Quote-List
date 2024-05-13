const mongoose = require("mongoose");

function connectDataBase() {
  const params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      "mongodb+srv://jvanandh984:ULmCskKAZeO8kQn6@cluster0.jzstokr.mongodb.net/",
      params
    );
    console.log("DB is connected !");
  } catch (error) {
    console.log(error);
  }
}
module.exports = { connectDataBase };
