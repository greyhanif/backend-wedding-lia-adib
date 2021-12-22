import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Relationship = db.define(
  "relationship",
  {
    code: {
      type: DataTypes.STRING(4),
    },
    detail: {
      type: DataTypes.STRING(100),
    },
  },
  {
    freezeTableName: true,
  }
);

export default Relationship;
