const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, 'ARGhnowrjv@p492iv9048gv0b3i4WEV4i3v90349v3beuv9347v934vbu934cv34co', {
    expiresIn: "1h",
  });
};

module.exports = generateToken;
