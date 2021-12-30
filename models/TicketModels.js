import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Tickets = db.define(
  "tickets",
  {
    ticketCode: {
      type: DataTypes.STRING(10),
    },
    contactId: {
      type: DataTypes.INTEGER,
    },
    relationshipCode: {
      type: DataTypes.STRING(4),
    },
    linkInvitation: {
      type: DataTypes.STRING(70),
    },
    numberOfSouvenir: {
      type: DataTypes.INTEGER(1),
    },
  },
  {
    freezeTableName: true,
  }
);

export default Tickets;
