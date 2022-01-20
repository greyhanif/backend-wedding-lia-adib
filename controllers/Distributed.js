import Users from "../models/UserModels.js";
import Logs from "../models/LogModels.js";
import Contacts from "../models/ContactModels.js";
import Souvenir from "../models/SouvenirModels.js";
import moment from "moment";
import Tickets from "../models/TicketModels.js";
import Distributed from "../models/DistributedModels.js";

export const getDistributed = async (req, res) => {
  try {
    Contacts.hasMany(Distributed, {
      foreignKey: "contactId",
    });
    Distributed.belongsTo(Contacts, {
      foreignKey: "contactId",
    });
    const distributed = await Distributed.findAll({
      order: [["id", "DESC"]],
      include: [{ model: Contacts }],
    });
    res.json(distributed);
    console.log(`${moment().local().format("HH:mm:ss")} [DISTRIBUTED] GET Data ALL`);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const getDistributedById = async (req, res) => {
  const id = req.params.id;
  try {
    const distributed = await Distributed.findAll({
      where: {
        id: id,
      },
    });
    res.json(distributed);
    console.log(`${moment().local().format("HH:mm:ss")} [DISTRIBUTED] GET Data ID ${id}`);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const createDistributed = async (req, res) => {
  const { contactId, ticketCode, invitationType, distributionLine, remarks } = req.body;

  try {
    await Distributed.create({
      contactId: contactId,
      ticketCode: ticketCode,
      invitationType: invitationType,
      distributionLine: distributionLine,
      remarks: remarks,
    });
    res.json({ message: "New distributed has been created" });
  } catch (error) {
    console.log(error);
  }

  try {
    await Logs.create({
      code: "200",
      detail: ` ${contactId} TICKET ${ticketCode} ditambahnkan ke Distributed `,
    });
    console.log(`${moment().local().format("HH:mm:ss")} [DISTRIBUTED] CREATE ${contactId} - ${ticketCode} - ${invitationType}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateDistributed = async (req, res) => {
  const { contactId, ticketCode, invitationType, distributionLine, remarks } = req.body;
  const id = req.params.id;

  try {
    await Distributed.update(
      {
        contactId: contactId,
        ticketCode: ticketCode,
        invitationType: invitationType,
        distributionLine: distributionLine,
        remarks: remarks,
      },
      {
        where: { id: id },
      }
    );
    res.json({ message: "Distributed has been updated" });
  } catch (error) {
    console.log(error);
  }

  try {
    await Logs.create({
      code: "200",
      detail: `mengubah ${contactId} TICKET ${ticketCode} pada daftar Distributed `,
    });
    console.log(`${moment().local().format("HH:mm:ss")} [DISTRIBUTED] UPDATE ${contactId} - ${ticketCode} - ${invitationType}`);
  } catch (error) {
    console.log(error);
  }
};

export const deleteDistributed = async (req, res) => {
  // const { name, gender, phone, email, organization, address, city } = req.body;
  const id = req.params.id;
  try {
    await Distributed.destroy({
      where: { id: id },
    });
    res.json({ message: "Distributed has been delete" });
  } catch (error) {
    console.log(error);
  }

  try {
    await Logs.create({
      code: "200",
      detail: `${id}  telah dihapus pada Distributed `,
    });
    console.log(`${moment().local().format("HH:mm:ss")} [DISTRIBUTED] DELETE Data ID ${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const createOrupdateDistributed = async (req, res) => {
  const { contactId, ticketCode, invitationType, distributionLine, remarks } = req.body;
  const code = req.params.code;

  try {
    await Distributed.upsert(
      {
        contactId: contactId,
        ticketCode: code,
        invitationType: invitationType,
        distributionLine: distributionLine,
        remarks: remarks,
      },
      {
        where: { ticketCode: code },
      }
    );
    res.json({ message: "Distributed has been updated" });
  } catch (error) {
    console.log(error);
  }

  try {
    await Logs.create({
      code: "200",
      detail: `membuat atau mengubah ${contactId} TICKET ${ticketCode} pada daftar Distributed `,
    });
    console.log(`${moment().local().format("HH:mm:ss")} [DISTRIBUTED] CREATE or UPDATE ${contactId} - ${ticketCode} - ${invitationType}`);
  } catch (error) {
    console.log(error);
  }
};
