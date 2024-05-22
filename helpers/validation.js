const User = require("../models/User");
exports.validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

exports.validateUserName = async (username) => {
  let a = false;
  do {
    let check = await User.findOne({ username });
    if (check) {
      a = true;
      username += (+new Date() * Math.random()).toString().substring(0, 1);
    } else {
      a = false;
    }
  } while (a);
  return username;
};
