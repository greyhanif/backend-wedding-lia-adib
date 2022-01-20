import Contacts from "../models/ContactModels.js";

import Tickets from "../models/TicketModels.js";
import moment from "moment";

export const getPrint = async (req, res) => {
  try {
    Contacts.hasMany(Tickets, {
      foreignKey: "contactId",
    });
    Tickets.belongsTo(Contacts, {
      foreignKey: "contactId",
    });
    const contacts = await Contacts.findAll({
      order: [["updatedAt", "DESC"]],
      include: Tickets,
      // raw: true,
      // joinTableAttributes: [Tickets],
      // attributes: [ticketCode],
    });
    res.json(contacts);
    console.log(`${moment().local().format("HH:mm:ss")} [PRINT] GET Data`);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};
