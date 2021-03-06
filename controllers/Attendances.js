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

export const getAttendancesByCode = async (req, res) => {
  const code = req.params.code;
  try {
    const attendances = await Attendances.findOne({
      where: {
        ticketCode: code,
      },
    });
    res.json(attendances);
    console.log(`${moment().local().format("HH:mm:ss")} [ATTENDANCES] GET data by CODE ${code}`);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const createAttendances = async (req, res) => {
  const { contactId, name, city, ticketCode, checkInAt, numberOfPeople, checkOutAt, remark, typeOfAttendance, isVIP } = req.body;
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
      isVIP: isVIP,
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
    console.log(`${moment().local().format("HH:mm:ss")} [ATTENDANCES] CREATE ${nameOfficer} sebagai ${asOfficer} membuat ${name} asal ${city}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateAttendances = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // console.log(req.user);
  // const decoded = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);

  const { contactId, name, city, ticketCode, checkInAt, numberOfPeople, checkOutAt, remark, typeOfAttendance, nameOfficer, asOfficer, isVIP } = req.body;
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
        isVIP: isVIP,
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
    console.log(`${moment().local().format("HH:mm:ss")} [ATTENDANCES] UPDATE ${nameOfficer} sebagai ${asOfficer} mengubah ${name} asal ${city}`);
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
    console.log(`${moment().local().format("HH:mm:ss")} [ATTENDANCES] DELETE ID ${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const invitedCheckIn = async (req, res) => {
  const { contactId, name, city, ticketCode, numberOfPeople, remark, typeOfAttendance, nameOfficer, asOfficer, expectedNumberOfSouvenir, isVIP } = req.body;
  // console.log(req.body);
  try {
    await Attendances.create({
      contactId: contactId,
      name: name,
      city: city,
      ticketCode: ticketCode,
      checkInAt: new Date().toISOString(),
      checkInCounter: asOfficer,
      numberOfPeople: numberOfPeople,
      remark: remark,
      typeOfAttendance: typeOfAttendance,
      stateOfAttendance: "check-in",
      expectedNumberOfSouvenir: expectedNumberOfSouvenir,
      isVIP: isVIP,
    });

    let payload = {
      message: "OK",
      contactId: contactId,
      name: name,
      city: city,
      ticketCode: ticketCode,
      checkInAt: new Date().toISOString(),
      numberOfPeople: numberOfPeople,
      remark: remark,
      typeOfAttendance: typeOfAttendance,
      stateOfAttendance: "check-in",
      isVIP: isVIP,
    };
    // res.json({ message: "New Attendance has been Check-in", payload });
    res.json(payload);
    console.log(`${moment().local().format("HH:mm:ss")} [ATTENDANCES] CHECK-IN ${name} NOP ${numberOfPeople} TOA ${typeOfAttendance}`);
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
  const ticketCode = req.params.code;
  const { actuallyNumberOfSouvenir, nameOfficer, asOfficer } = req.body;
  try {
    const attendance = await Attendances.findOne({
      where: {
        ticketCode: ticketCode,
      },
    });
    let remarksSouvenir = "";
    if (actuallyNumberOfSouvenir > attendance.expectedNumberOfSouvenir) {
      remarksSouvenir = "Lebih";
    } else if (actuallyNumberOfSouvenir < attendance.expectedNumberOfSouvenir) {
      remarksSouvenir = "Kurang";
    } else {
      remarksSouvenir = "Sesuai";
    }
    console.log(remarksSouvenir);
    await Attendances.update(
      {
        checkOutAt: new Date().toISOString(),
        actuallyNumberOfSouvenir: actuallyNumberOfSouvenir,
        stateOfAttendance: "check-out",
        remarksSouvenir: remarksSouvenir,
      },
      {
        where: { ticketCode: ticketCode },
        // returning: true,
        // plain: true
      }
    );

    const attendances = await Attendances.findOne({
      where: {
        ticketCode: ticketCode,
      },
    });
    console.log(attendance.dataValues.expectedNumberOfSouvenir);
    await Logs.create({
      code: "200",
      detail: `${attendances.dataValues.name} asal ${attendances.dataValues.city} telah Check-Out `,
    });
    res.json(attendances);
    console.log(`${moment().local().format("HH:mm:ss")} [ATTENDANCES] CHECK-OUT CODE ${ticketCode} NOP ${attendances.dataValues.numberOfPeople} TOA ${attendances.dataValues.typeOfAttendance} ANOS ${actuallyNumberOfSouvenir} `);
  } catch (error) {
    console.log(error);
  }
};
