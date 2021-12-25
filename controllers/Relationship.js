import Users from "../models/UserModels.js";
import Logs from "../models/LogModels.js";
import Contacts from "../models/ContactModels.js";
import Relationship from "../models/RelationshipModels.js";
import moment from "moment";

export const getRelationship = async (req, res) => {
  try {
    const relationship = await Relationship.findAll({
      order: [["id", "ASC"]],
    });
    res.json(relationship);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const createRelationship = async (req, res) => {
  const { code, detail } = req.body;
  // console.log(req.body);
  try {
    await Relationship.create({
      code: code,
      detail: detail,
    });
    res.json({ message: "New relationship has been created" });
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
      detail: `kode ${code} telah ditambahkan ke daftar Relationship `,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateRelationship = async (req, res) => {
  const { code, detail } = req.body;
  const id = req.params.id;

  // console.log(req.body.code);
  try {
    await Relationship.update(
      {
        code: code,
        detail: detail,
      },
      {
        where: { id: id },
      }
    );
    res.json({ message: "Relationship has been updated" });
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
      detail: `Kode ${code} telah diubah pada daftar Relationship `,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRelationship = async (req, res) => {
  const { code, detail } = req.body;
  const id = req.params.id;
  try {
    await Relationship.destroy({
      where: { id: id },
      // returning: true,
      // plain: true
    });
    res.json({ message: "Relationship has been delete" });
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
      detail: `${code} telah dihapus pada Relationship `,
    });
  } catch (error) {
    console.log(error);
  }
};
