import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Attendances = db.define(
  "attendances",
  {
    contactId: {
      type: DataTypes.STRING(4),
    },
    name: {
      type: DataTypes.STRING(30),
    },
    city: {
      type: DataTypes.STRING(20),
    },
    ticketCode: {
      type: DataTypes.STRING(10),
    },
    remark: {
      type: DataTypes.STRING(50),
    },
    checkInAt: {
      type: DataTypes.DATE,
    },
    numberOfPeople: {
      type: DataTypes.INTEGER(1),
    },
    checkOutAt: {
      type: DataTypes.DATE,
    },
    expectedNumberOfSouvenir: {
      type: DataTypes.INTEGER(2),
    },
    actuallyNumberOfSouvenir: {
      type: DataTypes.INTEGER(2),
    },
    remarksSouvenir: {
      type: DataTypes.STRING(10),
    },
    stateOfAttendance: {
      type: DataTypes.STRING(10),
    },
    typeOfAttendance: {
      type: DataTypes.STRING(10),
    },
  },
  {
    freezeTableName: true,
  }
);

export default Attendances;
