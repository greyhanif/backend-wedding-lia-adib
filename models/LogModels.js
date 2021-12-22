import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Logs = db.define(
  "Logs",
  {
    code: {
      type: DataTypes.STRING(4),
    },
    detail: {
      type: DataTypes.STRING(128),
    },
  },
  {
    freezeTableName: true,
  }
);

export default Logs;
