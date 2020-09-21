"use strict";
const jwt = require("jwt-simple");
const moment = require("moment");
const SECRET = "SecretKey";

exports.createToken = function (user){
  let payload = {
    sub: user._id,
    user_name: user.user_name,
    rol: user.rol,
    iat: moment().unix(),
    exp: moment()
      .day(30, "days")
      .unix()
  };

  return jwt.encode(payload, SECRET);
};
