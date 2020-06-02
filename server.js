const express = require("express");
const app = express();
const dotenv = require("dotenv");

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

PORT = process.argv[2] || 4000;

app.listen(PORT, () => console.log(`Server Up and Running in PORT ${PORT}`));
