import { Sequelize } from "sequelize";

const host = "wisdb.czqb8shqxxgj.ap-southeast-1.rds.amazonaws.com";

const db = new Sequelize("wis_db", "root", "#Nashaly.97", {
  host: host,
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
