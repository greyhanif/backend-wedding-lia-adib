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
      type: DataTypes.STRING(4),
    },
    relationshipCode: {
      type: DataTypes.STRING(4),
    },
    linkInvitation: {
      type: DataTypes.STRING(70),
    },
  },
  {
    freezeTableName: true,
  }
);

export default Tickets;