const express = require("express");
const config = require("./config");

const app = express();

const port = config.APP_PORT

const start = async () => {
  try {
    app.listen(port, () => console.log(`app running at: http://localhost:${port}`))
  } catch (error) {
    throw new Error(error);
  }
}

start();
