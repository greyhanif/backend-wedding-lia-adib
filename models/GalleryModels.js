import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Gallery = db.define(
  "gallery",
  {
    title: {
      type: DataTypes.STRING(100),
    },
    caption: {
      type: DataTypes.STRING(100),
    },
    src: {
      type: DataTypes.TEXT,
    },
    visible: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Gallery;
