import Users from "../models/UserModels.js";
import Logs from "../models/LogModels.js";
import Contacts from "../models/ContactModels.js";
import Messages from "../models/MessageModels.js";

export const getLogs = async (req, res) => {
  console.log(req.headers["Authorization"]);
  try {
    const logs = await Logs.findAll({
      limit: 10,
      order: [["updatedAt", "DESC"]],
    });
    res.json(logs);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};
