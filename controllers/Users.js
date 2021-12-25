import Users from "../models/UserModels.js";
import Logs from "../models/LogModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";
// import "moment/locale/id";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "as", "email"],
    });
    res.json(users);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, as, email, password, confPassword } = req.body;
  if (password !== confPassword) return res.status(400).json({ message: "Pasword dan Confirm Password tidak sesuai" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      as: as,
      email: email,
      password: hashPassword,
    });
    res.json({ message: "Register berhasil" });
    // console.log(`[USERS] REGISTER `);
    console.log(`${moment().local().format("HH:mm:ss")} [USERS] REGISTER ${name} EMAIL${email} AS ${as}`);
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  // console.log(req.body.email);
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ message: "wrong password" });
    const userId = user[0].id;
    const name = user[0].name;
    const as = user[0].as;
    const email = user[0].email;
    const accessToken = jwt.sign({ userId, name, as, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId, name, as, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    //   // secure: true
    // });
    res.json({ accessToken });
    // console.log(`[USERS] LOGIN ${name} as ${as}`);
  } catch (error) {
    res.status(404).json({ message: "Email not found" });
  }

  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const name = user[0].name;
    const as = user[0].as;

    await Logs.create({
      code: "100",
      detail: `${name} sebagai ${as} telah LOGIN `,
    });
    // res.json({ message: "Register berhasil" });
    console.log(`${moment().local().format("HH:mm:ss")} [USERS] LOGIN ${name} AS ${as}`);
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  // const refreshToken = req.cookies.refreshToken;
  // if (!refreshToken) return res.sendStatus(204);
  // const user = await Users.findAll({
  //   where: {
  //     refresh_token: refreshToken,
  //   },
  // });
  // if (!user[0]) return res.sendStatus(204);
  // const userId = user[0].id;
  // await Users.update(
  //   { refresh_token: null },
  //   {
  //     where: {
  //       id: userId,
  //     },
  //   }
  // );
  // res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
