const jwt = require("jsonwebtoken");

// Middleware to verify Authenticated user API calls.
module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, 'ARGhnowrjv@p492iv9048gv0b3i4WEV4i3v90349v3beuv9347v934vbu934cv34co');

    req.authUserId = decoded;
    next();
  } catch (error) {
    // console.log(error);
    return res.status(401).json({
      message: error.message,
    });
  }
};
