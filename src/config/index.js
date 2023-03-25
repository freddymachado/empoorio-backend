const dotenv = require("dotenv");
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

module.exports = {
  port: 8000,
  mongoDb: {
    mongoPass: 'LbdxrL14FWxLQKlf',
    mongoUser: 'freddev',
  },
};
