const express = require("express");
const config = require("./config");
const connect = require("./db/connect");
const notFound = require("./middlewares/noFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

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
