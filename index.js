const express = require("express");
const config = require("./config");
const connect = require("./db/connect");
const notFound = require("./middlewares/noFound");
const errorHandler = require("./middlewares/errorHandler");
// cookies-parser
const cookieParser = require("cookie-parser");
// cors package
const cors = require("cors");

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", require('./routes/auth.routes'));
app.use(notFound);
app.use(errorHandler);

const port = config.APP_PORT

const start = async () => {
  try {
    await connect(config.MONGO_URI);
    app.listen(port, () => console.log(`app running at: http://localhost:${port}`))
  } catch (error) {
    throw new Error(error);
  }
}

start();
