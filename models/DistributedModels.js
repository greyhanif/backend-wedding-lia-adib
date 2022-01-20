import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Distributed = db.define(
  "distributed",
  {
    contactId: {
      type: DataTypes.INTEGER,
    },
    ticketCode: {
      type: DataTypes.STRING(10),
    },
    invitationType: {
      type: DataTypes.STRING(20),
    },
    distributionLine: {
      type: DataTypes.STRING(20),
    },
    remarks: {
      type: DataTypes.STRING(20),
    },
  },
  {
    freezeTableName: true,
  }
);

export default Distributed;
