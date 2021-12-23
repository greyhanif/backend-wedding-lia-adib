import Logs from "../models/LogModels.js";
import Gallery from "../models/Gallery.js";

export const getGallery = async (req, res) => {
  try {
    const gallerys = await Gallery.findAll({
      order: [["id", "ASC"]],
    });
    res.json(gallerys);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const getGalleryById = async (req, res) => {
  const id = req.params.id;
  try {
    const gallerys = await Gallery.findAll({
      where: {
        id: id,
      },
    });
    res.json(gallerys);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const createGallery = async (req, res) => {
  const { title, caption, src, visible } = req.body;
  console.log(req.body);
  try {
    await Gallery.create({
      title: title,
      caption: caption,
      src: src,
      visible: visible,
    });
    res.json({ message: "New gallery has been created" });
  } catch (error) {
    console.log(error);
  }

  try {
    await Logs.create({
      code: "200",
      detail: `Gambar ${title} ditambahnkan ke Contacts `,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateGallery = async (req, res) => {
  const { title, caption, src, visible } = req.body;
  const id = req.params.id;

  try {
    await Gallery.update(
      {
        title: title,
        caption: caption,
        src: src,
        visible: visible,
      },
      {
        where: { id: id },
      }
    );
    res.json({ message: `Gallery ${title} has been updated` });
  } catch (error) {
    console.log(error);
  }

  try {
    await Logs.create({
      code: "200",
      detail: `mengubah ${title} pada daftar Galeri `,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteGallery = async (req, res) => {
  const id = req.params.id;
  try {
    await Contacts.destroy({
      where: { id: id },
    });
    res.json({ message: "Gallery has been delete" });
  } catch (error) {
    console.log(error);
  }

  try {
    await Logs.create({
      code: "200",
      detail: `${title} telah dihapus pada Galeri `,
    });
  } catch (error) {
    console.log(error);
  }
};
