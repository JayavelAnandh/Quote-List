const express = require("express");
const cors = require("cors");
const { connectDataBase } = require("./db");
const { reportRoutes } = require("./routes/report");
const dotenv = require("dotenv");
const app = express();

app.use(cors());
connectDataBase();
dotenv.config();
app.use(express.json());
app.use("/report", reportRoutes);
app.get("/", (req, res) => {
  res.status(200).send("This is the server response !");
});

app.listen(process.env.PORT, () => {
  console.log("Server is listening");
});
