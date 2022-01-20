import { json } from "express";
// import { QueryTypes } from "sequelize/types";
import Contacts from "../models/ContactModels.js";
import Tickets from "../models/TicketModels.js";
import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Logs from "../models/LogModels.js";
import Messages from "../models/MessageModels.js";
import Attendances from "../models/AttendancesModels.js";
import moment from "moment";
import Configuration from "../models/ConfigurationModels.js";
import Distributed from "../models/DistributedModels.js";

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
      limit: 10,
      order: [["createdAt", "DESC"]],
    });

    // Get lastAttendance
    const lastCheckOut = await Attendances.findAll({
      where: {
        stateOfAttendance: "check-out",
      },
      limit: 10,
      order: [["updatedAt", "DESC"]],
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

    // Count Distributed Organization
    const countDistributed = await Distributed.count({});
    // Count Distributed Done
    const countDistributedDone = await Distributed.count({
      where: {
        remarks: "done",
      },
    });

    // Count Distributed Done
    const countInvitationType = await Distributed.count({
      group: ["invitationType"],
    });

    // Count Distributed Line
    const countDistributionLine = await Distributed.count({
      group: ["distributionLine"],
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

    // Count souvenir stock
    const souvenirStock = await Configuration.findOne({
      where: {
        property: "souvenirStock",
      },
      attributes: ["valueInt"],
    });

    // Count expect souvenir
    const totalExpectedNumberOfSouvenir = await Tickets.findAll({
      attributes: [[Sequelize.fn("sum", Sequelize.col("numberOfSouvenir")), "totalExpectedNumberOfSouvenir"]],
    });

    // const souvenirHasBeenDistributed = await Attendances.findAll({
    //   where: {
    //     checkOutAt: null,
    //   },
    //   attributes: [[Sequelize.fn("sum", Sequelize.col("numberOfPeople")), "totalPeople"]],
    // });

    const payload = {
      totalContacts: countContacts,
      totalTickets: countTickets,
      totalDistributed: countDistributed,
      totalDistributedDone: countDistributedDone,
      countInvitationType: countInvitationType,
      countDistributionLine: countDistributionLine,
      countContactsCity: countContactsCity,
      countContactsOrganization: countContactsOrganization,
      countTicketsRelationshipCode: countTicketsRelationshipCode,
      totalContactsFemale: countContactsFemale,
      totalContactsMale: countContactsMale,
      totalMessages: countMessages,
      lastLogs: logs,
      lastContacts: contacts,
      lastTickets: tickets,
      lastMessages: lastMessages,
      countAttendance: countAttendance,
      countPeopleInRoom: countPeopleInRoom,
      lastAttendances: lastAttendances,
      lastCheckOut: lastCheckOut,
      souvenirStock: souvenirStock.valueInt,
      totalExpectedNumberOfSouvenir: totalExpectedNumberOfSouvenir,
    };

    // const payload = [countContacts, countTickets, countContactsCity, countTicketsRelationshipCode, countContactsFemale, countContactsMale, logs, contacts, tickets];

    res.json(payload);
    console.log(`${moment().local().format("HH:mm:ss")} [DASHBOARD] GET ALL`);
  } catch (error) {
    // res.json(error);
    console.log(error);
  }
};
