import { Sequelize } from "sequelize";

const db = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER_NAME}`, `${process.env.DB_PASSWORD}`, {
  host: "localhost",
  dialect: "mysql",
  timezone: "+07:00",
  dialectOptions: {
    charset: "utf8mb4",
    // collate: "utf8mb4_unicode_ci",
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
});

export default db;
