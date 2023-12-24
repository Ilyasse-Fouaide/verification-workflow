const express = require("express");
const config = require("./config");

const app = express();

app.use("/api/v1/auth", require('./routes/auth.route'));

const port = config.APP_PORT

const start = async () => {
  try {
    app.listen(port, () => console.log(`app running at: http://localhost:${port}`))
  } catch (error) {
    throw new Error(error);
  }
}

start();
