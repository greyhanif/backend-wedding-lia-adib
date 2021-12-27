import { json } from "express";
// import { QueryTypes } from "sequelize/types";
import Contacts from "../models/ContactModels.js";
import Tickets from "../models/TicketModels.js";
import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Logs from "../models/LogModels.js";
import Messages from "../models/MessageModels.js";
import Attendances from "../models/AttendancesModels.js";

export const Dashboard = async (req, res) => {
  const slug = req.params.slug;
  // console.log(slug);
  try {
    //Get ticket limit 5
    const tickets = await Tickets.findAll({
      limit: 5,
      order: [["updatedAt", "DESC"]],
    });
    // console.log(tickets);

    // Get contact limit 5
    const contacts = await Contacts.findAll({
      limit: 5,
      order: [["updatedAt", "DESC"]],
    });

    // Get logs limit 5
    const logs = await Logs.findAll({
      limit: 5,
      order: [["updatedAt", "DESC"]],
    });

    // Get messages
    const lastMessages = await Messages.findAll({
      limit: 5,
      order: [["updatedAt", "DESC"]],
    });

    // Get lastAttendance
    const lastAttendances = await Attendances.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
    });

    // Count messages
    const countMessages = await Messages.count({});

    // Count contact
    const countContacts = await Contacts.count({});

    // Count Tickets
    const countTickets = await Tickets.count({});

    // Count contact Female
    const countContactsFemale = await Contacts.count({
      where: {
        gender: "f",
      },
    });

    // Count contact Male
    const countContactsMale = await Contacts.count({
      where: {
        gender: "m",
      },
    });

    // Count contact Male
    const countContactsCity = await Contacts.count({
      group: ["city"],
    });

    // Count contact Organization
    const countContactsOrganization = await Contacts.count({
      group: ["organization"],
    });

    // Count contact Male
    const countTicketsRelationshipCode = await Tickets.count({
      group: ["relationshipCode"],
    });

    // Count people in room
    const countPeopleInRoom = await Attendances.findAll({
      where: {
        checkOutAt: null,
      },
      attributes: [[Sequelize.fn("sum", Sequelize.col("numberOfPeople")), "totalPeople"]],
    });

    // Count check-in
    const countAttendance = await Attendances.count({});

    const payload = {
      totalContacts: countContacts,
      totalTickets: countTickets,
      countContactsCity: countContactsCity,
      countContactsOrganization: countContactsOrganization,
      countTicketsRelationshipCode: countTicketsRelationshipCode,
      totalContactsFemale: countContactsFemale,
      totalContactsMale: countContactsMale,
      totalMessages: countMessages,
      countAttendance: countAttendance,
      countPeopleInRoom: countPeopleInRoom,
      lastLogs: logs,
      lastContacts: contacts,
      lastTickets: tickets,
      lastMessages: lastMessages,
      lastAttendances: lastAttendances,
    };

    // const payload = [countContacts, countTickets, countContactsCity, countTicketsRelationshipCode, countContactsFemale, countContactsMale, logs, contacts, tickets];

    res.json(payload);
    // console.log(res.contacts);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};
