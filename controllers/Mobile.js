import { json } from "express";
import Contacts from "../models/ContactModels.js";
import Tickets from "../models/TicketModels.js";

export const Mobile = async (req, res) => {
  const slug = req.params.slug;
  // console.log(slug);
  try {
    const tickets = await Tickets.findAll({
      where: {
        linkInvitation: slug,
      },
    });
    // console.log(tickets);
    if (tickets.length == 0) {
      return res.json({ msg: "no data available" });
    }
    // const ticket =
    const contacts = await Contacts.findAll({
      where: {
        id: tickets[0].contactId,
      },
    });
    // const payload = {contacts + tickets};
    // res.send(JSON.stringify(tickets));
    res.json({ contacts, tickets });
    // console.log(res.contacts);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};
