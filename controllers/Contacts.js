import Users from "../models/UserModels.js";
import Logs from "../models/LogModels.js";
import Contacts from "../models/ContactModels.js";
import Souvenir from "../models/SouvenirModels.js";
import moment from "moment";
import Tickets from "../models/TicketModels.js";

export const getContacts = async (req, res) => {
  try {
    Contacts.hasMany(Souvenir, {
      foreignKey: "contactId",
    });
    Contacts.hasMany(Tickets, {
      foreignKey: "contactId",
    });
    Souvenir.belongsTo(Contacts, {
      foreignKey: "contactId",
    });
    Tickets.belongsTo(Contacts, {
      foreignKey: "contactId",
    });
    const contacts = await Contacts.findAll({
      order: [["id", "ASC"]],
      include: [
        { model: Souvenir, attributes: ["expectedNumberOfSouvenir", "actuallyNumberOfSouvenir", "remarks"] },
        { model: Tickets, attributes: ["ticketCode", "linkInvitation"] },
      ],
    });
    res.json(contacts);
    console.log(`${moment().local().format("HH:mm:ss")} [CONTACTS] GET Data ALL`);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const getContactsById = async (req, res) => {
  const id = req.params.id;
  try {
    const contacts = await Contacts.findAll({
      where: {
        id: id,
      },
    });
    res.json(contacts);
    console.log(`${moment().local().format("HH:mm:ss")} [CONTACTS] GET Data ID ${id}`);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const createContacts = async (req, res) => {
  const { title, name, gender, phone, email, organization, address, city } = req.body;
  // console.log(req.body);
  try {
    await Contacts.create({
      title: title,
      name: name,
      gender: gender,
      phone: phone,
      email: email,
      organization: organization,
      address: address,
      city: city,
    });
    res.json({ message: "New contact has been created" });
  } catch (error) {
    console.log(error);
  }

  try {
    await Logs.create({
      code: "200",
      detail: ` ${name} asal ${city} ditambahnkan ke Contacts `,
    });
    console.log(`${moment().local().format("HH:mm:ss")} [CONTACTS] CREATE ${name} - ${organization} - ${city}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateContacts = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(req.user);
  // const decoded = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);

  const { title, name, gender, phone, email, organization, address, city } = req.body;
  const id = req.params.id;
  // console.log(req.params.id);
  // console.log(req.body);
  try {
    await Contacts.update(
      {
        title: title,
        name: name,
        gender: gender,
        phone: phone,
        email: email,
        organization: organization,
        address: address,
        city: city,
      },
      {
        where: { id: id },
        // returning: true,
        // plain: true
      }
    );
    res.json({ message: "contact has been updated" });
  } catch (error) {
    console.log(error);
  }

  try {
    await Logs.create({
      code: "200",
      detail: `mengubah ${name} asal ${city} pada daftar Contacts `,
    });
    console.log(`${moment().local().format("HH:mm:ss")} [CONTACTS] UPDATE ${name} - ${organization} - ${city}`);
  } catch (error) {
    console.log(error);
  }
};

export const deleteContacts = async (req, res) => {
  const { name, gender, phone, email, organization, address, city } = req.body;
  const id = req.params.id;
  try {
    await Contacts.destroy({
      where: { id: id },
      // returning: true,
      // plain: true
    });
    res.json({ message: "contact has been delete" });
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
      detail: `${name} asal ${city} telah dihapus pada Contacts `,
    });
    console.log(`${moment().local().format("HH:mm:ss")} [CONTACTS] DELETE Data ID ${id}`);
  } catch (error) {
    console.log(error);
  }
};
