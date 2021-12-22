import { Sequelize } from "sequelize";

const db = new Sequelize("wis_db", "root", "", {
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
