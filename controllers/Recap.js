import Users from "../models/UserModels.js";
import Logs from "../models/LogModels.js";
// import Contacts from "../models/ContactModels.js";
import jwt from "express-jwt";
import Attendances from "../models/AttendancesModels.js";
import moment from "moment";

export const getRecap = async (req, res) => {
  try {
    const attendances = await Attendances.findAll({
      order: [["id", "DESC"]],
    });
    res.json(attendances);

    console.log(`${moment().local().format("HH:mm:ss")} [ATTENDANCES] GET data`);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const getAttendancesId = async (req, res) => {
  const id = req.params.id;
  try {
    const Attendances = await Attendances.findAll({
      where: {
        id: id,
      },
    });
    res.json(Attendances);
    console.log(`${moment().local().format("HH:mm:ss")} [ATTENDANCES] GET data ID ${id}`);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};
