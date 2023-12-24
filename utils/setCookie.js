const config = require("../config");

const setCookie = (res, token) => {
  res.cookie("refresh_token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
    secure: config.NODE_ENV === "production"
  });
}

module.exports = setCookie
