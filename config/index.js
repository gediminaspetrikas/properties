const mysql = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 3306,
  database: process.env.DATABASE_NAME,
};

module.exports = { mysql };
