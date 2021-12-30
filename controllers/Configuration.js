import Users from "../models/UserModels.js";
import Logs from "../models/LogModels.js";
import Contacts from "../models/ContactModels.js";
import moment from "moment";
import Configuration from "../models/ConfigurationModels.js";

export const getConfiguration = async (req, res) => {
  try {
    const configurations = await Configuration.findAll({
      order: [["id", "ASC"]],
    });
    res.json(configurations);
    console.log(`${moment().local().format("HH:mm:ss")} [CONFIGURATION] GET Data ALL`);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const getConfigurationByProperty = async (req, res) => {
  const property = req.params.property;
  try {
    const configurations = await Configuration.findOne({
      where: {
        property: property,
      },
    });
    res.json(configurations);
    console.log(`${moment().local().format("HH:mm:ss")} [CONFIGURATION] GET Data PROPERTY ${property}`);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const createConfiguration = async (req, res) => {
  const { property, detail, key, valueInt, valueStr } = req.body;
  // console.log(req.body);
  try {
    await Configuration.create({
      property: property,
      detail: detail,
      key: key,
      valueInt: valueInt,
      valueStr: valueStr,
    });
    res.json({ message: "New configuration has been created" });
  } catch (error) {
    console.log(error);
  }

  try {
    await Logs.create({
      code: "200",
      detail: `${property} KEY ${key} INT ${valueInt} STR ${valueStr} ditambahkan ke Configuration`,
    });
    console.log(`${moment().local().format("HH:mm:ss")} [CONFIGURATION] CREATE Data PROPERTY ${property} KEY ${key} INT ${valueInt} STR ${valueStr}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateConfiguration = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const { property, detail, key, valueInt, valueStr } = req.body;
  const id = req.params.id;

  try {
    await Configuration.update(
      {
        property: property,
        detail: detail,
        key: key,
        valueInt: valueInt,
        valueStr: valueStr,
      },
      {
        where: { id: id },
      }
    );
    res.json({ message: "configuration has been updated" });
  } catch (error) {
    console.log(error);
  }

  try {
    await Logs.create({
      code: "200",
      detail: `${property} KEY ${key} INT ${valueInt} STR ${valueStr} diubah ke Configuration`,
    });
    console.log(`${moment().local().format("HH:mm:ss")} [CONTACTS] UPDATE Data PROPERTY ${property} KEY ${key} INT ${valueInt} STR ${valueStr}`);
  } catch (error) {
    console.log(error);
  }
};

export const deleteConfiguration = async (req, res) => {
  const id = req.params.id;
  try {
    await Configuration.destroy({
      where: { id: id },
    });
    res.json({ message: "configuration has been delete" });
  } catch (error) {
    console.log(error);
  }

  try {
    await Logs.create({
      code: "200",
      detail: `ID ${id} dihapus dari Configuration `,
    });
    console.log(`${moment().local().format("HH:mm:ss")} [CONFIGURATION] DELETE Data ID ${id}`);
  } catch (error) {
    console.log(error);
  }
};
