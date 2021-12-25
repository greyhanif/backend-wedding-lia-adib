import Users from "../models/UserModels.js";
import Logs from "../models/LogModels.js";
import Tickets from "../models/TicketModels.js";
import Contacts from "../models/ContactModels.js";
import moment from "moment";

export const getTickets = async (req, res) => {
  try {
    const tickets = await Tickets.findAll({
      order: [["id", "ASC"]],
    });
    res.json(tickets);
    console.log(`[TICKETS] GET Data`);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const getTicketsById = async (req, res) => {
  const id = req.params.id;
  // console.log(code);
  try {
    const tickets = await Tickets.findAll({
      where: {
        ticketCode: id,
      },
    });
    res.json(tickets);
    console.log(`[TICKETS] GET Data ID ${id}`);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const getTicketsByCode = async (req, res) => {
  const code = req.params.code;
  if (!code.match(/[A-Z]{4}\-[A-Z0-9]{4}/g)) {
    return res.status(404).json({ message: "Ticket Code not compatible" });
  }

  const tickets = await Tickets.findAll({
    where: {
      ticketCode: code,
    },
  });
  // console.log(tickets);

  if (tickets.length === 0) {
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
    res.json(contacts);
    console.log(`${moment().format("HH:mm:ss")} [TICKETS] GET Data by Code ${code}`);
  } catch (error) {
    console.log(error);
  }
};

let iCode = (function (num) {
  return function () {
    var str = String(num++);
    while (str.length < 4) str = "0" + str;
    return str;
  };
})(1);

export const createTickets = async (req, res) => {
  const { contactId, relationshipCode } = req.body;
  const contact = await Contacts.findAll({
    where: {
      id: req.body.contactId,
    },
  });
  let ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return Math.random().toString(36).substr(2, 4).toUpperCase();
  };
  const name = contact[0].name;
  const as = contact[0].as;
  const nameReplace = name.replace(/\s+/g, "+");
  const ticketCode = relationshipCode + "-" + ID();
  const linkInvitation = `${nameReplace}`;
  try {
    await Tickets.create({
      ticketCode: ticketCode,
      contactId: contactId,
      relationshipCode: relationshipCode,
      linkInvitation: linkInvitation,
    });
    res.json({ message: "Berhasil menambahkan tiket baru" });
  } catch (error) {
    console.log(error);
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
      code: "300",
      detail: `${name} dari ${city} nomor tiket ${ticketCode} telah dibuat`,
    });
    // res.json({ message: "Register berhasil" });
    console.log(`${moment().format("HH:mm:ss")} [TICKETS] CREATE ${name} from ${city} ticket code ${ticketCode}`);
  } catch (error) {
    console.log(error);
  }
};

// export const Login = async (req, res) => {
//   console.log(req.body.email);
//   try {
//     const user = await Users.findAll({
//       where: {
//         email: req.body.email,
//       },
//     });
//     const match = await bcrypt.compare(req.body.password, user[0].password);
//     if (!match) return res.status(400).json({ message: "wrong password" });
//     const userId = user[0].id;
//     const name = user[0].name;
//     const as = user[0].as;
//     const email = user[0].email;
//     const accessToken = jwt.sign({ userId, name, as, email }, process.env.ACCESS_TOKEN_SECRET, {
//       expiresIn: "20s",
//     });
//     const refreshToken = jwt.sign({ userId, name, as, email }, process.env.REFRESH_TOKEN_SECRET, {
//       expiresIn: "1d",
//     });
//     await Users.update(
//       { refresh_token: refreshToken },
//       {
//         where: {
//           id: userId,
//         },
//       }
//     );
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000,
//       // secure: true
//     });
//     res.json({ accessToken });
//   } catch (error) {
//     res.status(404).json({ message: "Email not found" });
//   }

//   try {
//     const user = await Users.findAll({
//       where: {
//         email: req.body.email,
//       },
//     });
//     const name = user[0].name;
//     const as = user[0].as;

//     await Logs.create({
//       code: "100",
//       detail: `${name} sebagai ${as} telah LOGIN `,
//     });
//     // res.json({ message: "Register berhasil" });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const Logout = async (req, res) => {
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) return res.sendStatus(204);
//   const user = await Users.findAll({
//     where: {
//       refresh_token: refreshToken,
//     },
//   });
//   if (!user[0]) return res.sendStatus(204);
//   const userId = user[0].id;
//   await Users.update(
//     { refresh_token: null },
//     {
//       where: {
//         id: userId,
//       },
//     }
//   );
//   res.clearCookie("refreshToken");
//   return res.sendStatus(200);
// };

//   let iCode = (function (num) {
//     return function () {
//       var str = String(num++);
//       while (str.length < 4) str = "0" + str;
//       return str;
//     };
//   })(1);
