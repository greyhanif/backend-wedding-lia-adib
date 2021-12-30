import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Souvenir = db.define(
  "souvenir",
  {
    contactId: {
      type: DataTypes.INTEGER,
    },
    expectedNumberOfSouvenir: {
      type: DataTypes.INTEGER(2),
    },
    actuallyNumberOfSouvenir: {
      type: DataTypes.INTEGER(2),
    },
    remarks: {
      type: DataTypes.STRING(20),
    },
  },
  {
    freezeTableName: true,
  }
);

export default Souvenir;
