require("dotenv").config();

// MONGO_URI is the only value you need to set. Everything else has a default.
module.exports = {
  MONGO_URI: process.env.MONGO_URI || process.env.MONGODB_URI,
  TOKEN_SECRET: process.env.TOKEN_SECRET || "local-development-secret",
  PORT: process.env.PORT || 5002,
};
