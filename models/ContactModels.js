import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Contacts = db.define(
  "contacts",
  {
    title: {
      type: DataTypes.STRING(10),
    },
    name: {
      type: DataTypes.STRING(30),
    },
    gender: {
      type: DataTypes.STRING(1),
    },
    phone: {
      type: DataTypes.STRING(15),
    },
    email: {
      type: DataTypes.STRING(30),
    },
    organization: {
      type: DataTypes.STRING(70),
    },
    address: {
      type: DataTypes.STRING(100),
    },
    city: {
      type: DataTypes.STRING(30),
    },
    imgUrl: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Contacts;
