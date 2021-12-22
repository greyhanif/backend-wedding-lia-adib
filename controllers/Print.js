import Contacts from "../models/ContactModels.js";

import Tickets from "../models/TicketModels.js";

export const getPrint = async (req, res) => {
  try {
    Contacts.hasMany(Tickets, {
      foreignKey: "contactId",
    });
    Tickets.belongsTo(Contacts, {
      foreignKey: "contactId",
    });
    const contacts = await Contacts.findAll({
      include: Tickets,
      // raw: true,
      // joinTableAttributes: [Tickets],
      // attributes: [ticketCode],
    });
    res.json(contacts);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};
