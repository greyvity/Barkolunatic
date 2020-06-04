const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

//Connect to database
const mongoose = require("mongoose");

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connected to DB");
  }
);

const cors = require("cors");
app.use(cors());
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || process.argv[2] || 4000;

app.listen(PORT, () => console.log(`Server Up and Running in PORT ${PORT}`));
