import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Messages = db.define(
  "messages",
  {
    contactId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(30),
    },
    city: {
      type: DataTypes.STRING(20),
    },
    message: {
      type: DataTypes.TEXT,
    },
    willBePresent: {
      type: DataTypes.STRING(10),
    },
    hidden: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Messages;
