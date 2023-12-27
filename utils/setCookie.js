const config = require("../config");

const setCookie = (res, access_token, refresh_token) => {
  res.cookie("access_token", access_token, {
    httpOnly: true,
    maxAge: 1000,  // second
    secure: config.NODE_ENV === "production"
  });

  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
    secure: config.NODE_ENV === "production"
  });
}

module.exports = setCookie
