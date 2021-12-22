import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
// const cors = require("cors");
dotenv.config();

const app = express();

import Users from "./models/UserModels.js";
import Contacts from "./models/ContactModels.js";
import Logs from "./models/LogModels.js";
import Tickets from "./models/TicketModels.js";
import Messages from "./models/MessageModels.js";
import Relationship from "./models/RelationshipModels.js";
import Attendances from "./models/AttendancesModels.js";

try {
  await db.authenticate();
  console.log("Database Connected...");
  await Users.sync();
  await Contacts.sync();
  await Logs.sync();
  await Tickets.sync();
  await Messages.sync();
  await Relationship.sync();
  await Attendances.sync();
} catch (error) {
  console.error(error);
}

// app.use(cookieParser());
app.use(express.json());
app.set("json spaces", 1);
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(router);

app.listen(5000, () => console.log("Server is running on port 5000"));
