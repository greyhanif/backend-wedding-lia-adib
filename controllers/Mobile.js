import { json } from "express";
import Contacts from "../models/ContactModels.js";
import Tickets from "../models/TicketModels.js";
import moment from "moment";

export const Mobile = async (req, res) => {
  const slug = req.params.slug;
  try {
    const tickets = await Tickets.findAll({
      where: {
        linkInvitation: slug,
      },
    });
    if (tickets.length == 0) {
      console.log(`${moment().local().format("HH:mm:ss")} [MOBILE] GET Data SLUG ${slug}`);
      return res.json({ msg: "no data available" });
    }
    // const ticket =
    const contacts = await Contacts.findAll({
      where: {
        id: tickets[0].contactId,
      },
    });

    res.json({ contacts, tickets });
    console.log(`${moment().local().format("HH:mm:ss")} [MOBILE] GET Data ${tickets[0].ticketCode}`);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};
