import Users from "../models/UserModels.js";
import Logs from "../models/LogModels.js";
import Tickets from "../models/TicketModels.js";
import Contacts from "../models/ContactModels.js";
import Relationship from "../models/RelationshipModels.js";

export const getDetailForCounter = async (req, res) => {
  const code = req.params.code;
  if (!code.match(/[A-Z]{4}\-[A-Z0-9]{4}/g)) {
    return res.status(404).json({ message: "Ticket Code not compatible" });
  }

  const tickets = await Tickets.findAll({
    where: {
      ticketCode: code,
    },
  });

  if (tickets.length === 0) {
    return res.status(404).json({ message: "Ticket Code not found" });
  }

  const relationshipCode = await Relationship.findAll({
    where: {
      code: tickets[0].relationshipCode,
    },
  });

  if (relationshipCode.length === 0) {
    return res.status(404).json({ message: "Ticket Code not found" });
  }

  const contactId = tickets[0].contactId;
  try {
    const id = contactId;
    const contacts = await Contacts.findAll({
      where: {
        id: id,
      },
    });
    const payload = {
      contacts: contacts,
      tickets: tickets,
      relationshipCode: relationshipCode,
    };
    res.json(payload);
  } catch (error) {
    console.log(error);
  }
};
