import Users from "../models/UserModels.js";
import Logs from "../models/LogModels.js";
import Contacts from "../models/ContactModels.js";
import Messages from "../models/MessageModels.js";

export const getMessages = async (req, res) => {
  try {
    const message = await Messages.findAll({
      order: [["updatedAt", "DESC"]],
      where: {
        hidden: false,
      },
      // include: countMessages,
    });
    res.json(message);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const getMessagesLimit = async (req, res) => {
  const limit = req.params;
  console.log(limit);
  try {
    const message = await Messages.findAll({
      // limit: 5,
      order: [["updatedAt", "DESC"]],
    });
    res.json(message);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const createMessages = async (req, res) => {
  const { contactId, name, city, message, willBePresent } = req.body;
  if (!name || !message) {
    res.json({ message: "Semua field harus di isi" });
  } else {
    try {
      await Messages.create({
        contactId: contactId,
        name: name,
        city: city,
        message: message,
        willBePresent: willBePresent,
      });
      res.json({ message: "Berhasil membuat pesan" });
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const contact = await Contacts.findAll({
      where: {
        id: req.body.contactId,
      },
    });
    const name = contact[0].name;
    const city = contact[0].city;

    await Logs.create({
      code: "400",
      detail: `${name} asal ${city} telah menambahkan pesan [${willBePresent}]`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateMessages = async (req, res) => {
  const { contactId, name, city, message, willBePresent } = req.body;
  try {
    await Messages.update(
      {
        contactId: contactId,
        name: name,
        city: city,
        message: message,
        willBePresent,
      },
      {
        where: {
          id: req.params.contactId,
        },
      }
    );
    res.json({ message: "Message has been updated" });
  } catch (error) {
    console.log(error);
  }

  try {
    const contact = await Contacts.findAll({
      where: {
        id: req.params.contactId,
      },
    });
    const name = contact[0].name;
    const city = contact[0].city;

    await Logs.create({
      code: "400",
      detail: `${name} asal ${city} telah mengubah pesan`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const hiddenMessages = async (req, res) => {
  const { id } = req.params;
  try {
    await Messages.update(
      {
        hidden: true,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({ message: "Message has been hidden" });
  } catch (error) {
    console.log(error);
  }

  // try {
  //   const contact = await Contacts.findAll({
  //     where: {
  //       id: req.body.contactId,
  //     },
  //   });
  //   const name = contact[0].name;
  //   const city = contact[0].city;

  //   await Logs.create({
  //     code: "400",
  //     detail: `${name} asal ${city} telah mengubah pesan`,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};
