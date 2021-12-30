import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Configuration = db.define(
  "configuration",
  {
    property: {
      type: DataTypes.STRING(20),
    },
    detail: {
      type: DataTypes.STRING(30),
    },
    key: {
      type: DataTypes.STRING(30),
    },
    valueInt: {
      type: DataTypes.INTEGER(6),
    },
    valueStr: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Configuration;
