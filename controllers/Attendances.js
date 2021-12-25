import Users from "../models/UserModels.js";
import Logs from "../models/LogModels.js";
// import Contacts from "../models/ContactModels.js";
import jwt from "express-jwt";
import Attendances from "../models/AttendancesModels.js";
import moment from "moment";

export const getAttendance = async (req, res) => {
  try {
    const attendances = await Attendances.findAll({
      order: [["id", "DESC"]],
    });
    res.json(attendances);
    console.log(`${moment().format("HH:mm:ss")} [ATTENDANCES] GET data`);
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
    console.log(`${moment().format("HH:mm:ss")} [ATTENDANCES] GET data ID ${id}`);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const createAttendances = async (req, res) => {
  const { contactId, name, city, ticketCode, checkInAt, numberOfPeople, checkOutAt, remark, typeOfAttendance } = req.body;
  // console.log(req.body);
  try {
    await Attendances.create({
      contactId: contactId,
      name: name,
      city: city,
      ticketCode: ticketCode,
      checkInAt: checkInAt,
      numberOfPeople: numberOfPeople,
      checkOutAt: checkOutAt,
      remark: remark,
      typeOfAttendance: typeOfAttendance,
    });
    res.json({ message: "New Attendance has been created" });
  } catch (error) {
    console.log(error);
  }

  try {
    await Logs.create({
      code: "200",
      detail: ` ${name} asal ${city} ditambahnkan ke Attendance `,
    });
    console.log(`${moment().format("HH:mm:ss")} [ATTENDANCES] CREATE ${nameOfficer} sebagai ${asOfficer} membuat ${name} asal ${city}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateAttendances = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // console.log(req.user);
  // const decoded = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);

  const { contactId, name, city, ticketCode, checkInAt, numberOfPeople, checkOutAt, remark, typeOfAttendance, nameOfficer, asOfficer } = req.body;
  const id = req.params.id;
  // console.log(req.params.id);
  // console.log(req.body);
  try {
    await Attendances.update(
      {
        contactId: contactId,
        name: name,
        city: city,
        ticketCode: ticketCode,
        checkInAt: checkInAt,
        numberOfPeople: numberOfPeople,
        checkOutAt: checkOutAt,
        remark: remark,
        typeOfAttendance: typeOfAttendance,
      },
      {
        where: { id: id },
        // returning: true,
        // plain: true
      }
    );
    res.json({ message: "Attendance has been updated" });
  } catch (error) {
    console.log(error);
  }

  try {
    await Logs.create({
      code: "200",
      detail: `${nameOfficer} sebagai ${asOfficer} mengubah ${name} asal ${city} pada daftar Attendances `,
    });
    console.log(`${moment().format("HH:mm:ss")} [ATTENDANCES] UPDATE ${nameOfficer} sebagai ${asOfficer} mengubah ${name} asal ${city}`);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAttendance = async (req, res) => {
  const id = req.params.id;
  try {
    await Attendances.destroy({
      where: { id: id },
      // returning: true,
      // plain: true
    });
    res.json({ message: "Attendance has been delete" });
  } catch (error) {
    console.log(error);
  }

  try {
    // const user = await Users.findAll({
    //   where: {
    //     email: req.body.email,
    //   },
    // });
    // const name = user[0].name;
    // const as = user[0].as;

    await Logs.create({
      code: "200",
      detail: `${id} asal  telah dihapus pada Attendances `,
    });
    console.log(`${moment().format("HH:mm:ss")} [ATTENDANCES] DELETE ID ${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const invitedCheckIn = async (req, res) => {
  const { contactId, name, city, ticketCode, numberOfPeople, remark, typeOfAttendance, nameOfficer, asOfficer } = req.body;
  console.log(req.body);
  try {
    await Attendances.create({
      contactId: contactId,
      name: name,
      city: city,
      ticketCode: ticketCode,
      checkInAt: new Date().toISOString(),
      numberOfPeople: numberOfPeople,
      remark: remark,
      typeOfAttendance: typeOfAttendance,
    });
    res.json({ message: "New Attendance has been Check-in" });
    console.log(`${moment().format("HH:mm:ss")} [ATTENDANCES] CHECK-IN ${checkInAt} ${name} NOP ${numberOfPeople} TOA ${typeOfAttendance}`);
  } catch (error) {
    console.log(error);
  }

  try {
    await Logs.create({
      code: "200",
      detail: ` ${name} asal ${city} membawa ${numberOfPeople} orang telah Check-In pada ${asOfficer} (${nameOfficer})`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const invitedCheckOut = async (req, res) => {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];

  // console.log(req.user);
  // // const decoded = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);

  const { contactId, name, city, checkInAt, numberOfPeople, checkOutAt, remark, typeOfAttendance } = req.body;
  const ticketCode = req.params.code;
  // console.log(req.params.id);
  console.log(req.body);
  try {
    await Attendances.update(
      {
        checkOutAt: new Date().toISOString(),
      },
      {
        where: { id: ticketCode },
        // returning: true,
        // plain: true
      }
    );
    res.json({ message: "Attendance has been Check-Out" });
  } catch (error) {
    console.log(error);
  }

  try {
    await Logs.create({
      code: "200",
      detail: `${name} asal ${city} telah Check-Out `,
    });
    console.log(`${moment().format("HH:mm:ss")} [ATTENDANCES] CHECK-OUT ${checkOutAt} ${name} NOP ${numberOfPeople} TOA ${typeOfAttendance}`);
  } catch (error) {
    console.log(error);
  }
};
