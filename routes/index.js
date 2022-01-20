import express from "express";
import cors from "cors";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { getContacts, createContacts, getContactsById, updateContacts, deleteContacts } from "../controllers/Contacts.js";
import { getTickets, getTicketsByCode, createTickets, getTicketsById } from "../controllers/Tickets.js";
import { getMessages, createMessages, updateMessages, hiddenMessages, getMessagesLimit } from "../controllers/Messages.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { Mobile } from "../controllers/Mobile.js";
import { getLogs } from "../controllers/Logs.js";
import { Dashboard } from "../controllers/Dashboard.js";
import { createRelationship, deleteRelationship, getRelationship, updateRelationship } from "../controllers/Relationship.js";
import { getDetailForCounter } from "../controllers/Counter.js";
import { getPrint } from "../controllers/Print.js";
import { getAttendance, getAttendancesByCode, invitedCheckIn, invitedCheckOut } from "../controllers/Attendances.js";
import { getGallery, getGalleryById, updateGallery, deleteGallery, createGallery } from "../controllers/Gallery.js";
import { injectMetaVisitor } from "../controllers/InjectMeta.js";
import { createConfiguration, deleteConfiguration, getConfiguration, getConfigurationByProperty, updateConfiguration } from "../controllers/Configuration.js";
import { getRecap } from "../controllers/Recap.js";
import { createDistributed, createOrupdateDistributed, deleteDistributed, getDistributed, getDistributedById, updateDistributed } from "../controllers/Distributed.js";
// import { getRe } from "../controllers/Dashboard.js";

const router = express.Router();
// router.all("*", cors());

router.get("/visitor", injectMetaVisitor);
router.get("/recap", getRecap);

// login
router.post("/register", Register);
router.post("/login", Login);
router.get("/users", getUsers);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

//CONFIGURATION
router.get("/configuration", getConfiguration);
router.get("/configuration/:property", getConfigurationByProperty);
router.post("/configuration", createConfiguration);
router.put("/configuration/:id", updateConfiguration);
router.delete("/configuration/:id", deleteConfiguration);

//DISTRIBUTED
router.get("/distributed", getDistributed);
router.get("/distributed/:id", getDistributedById);
router.post("/distributed", createDistributed);
router.put("/distributed/:id", updateDistributed);
router.delete("/distributed/:id", deleteDistributed);
router.put("/distributed-upsert/:code", createOrupdateDistributed);

// // contact
router.get("/contacts", verifyToken, getContacts);
router.get("/contacts/:id", verifyToken, getContactsById);
router.post("/contacts", verifyToken, createContacts);
router.put("/contacts/:id", verifyToken, updateContacts);
router.delete("/contacts/:id", verifyToken, deleteContacts);

// // Gallery
router.get("/gallery", getGallery);
router.get("/gallery/:id", getGalleryById);
router.post("/gallery", createGallery);
router.put("/gallery/:id", updateGallery);
router.delete("/gallery/:id", deleteGallery);

// // ticket
router.get("/tickets", getTickets);
// router.get("/tickets/:id", getTicketsById);
router.get("/tickets/:code", getTicketsByCode);
router.post("/tickets", createTickets);
// router.put("/tickets-by-id/:id", editTicketsById);
// router.delete("/tickets/:id", deleteTicketsById);

// // message
router.get("/messages", getMessages);
router.get("/messages/limit/:limit", getMessagesLimit);
// router.get("/messages/:id", getMessagesByCode);
router.post("/messages", createMessages);
router.put("/messages/:contactId", updateMessages);
router.patch("/messages/:id/hidden", hiddenMessages);
// router.delete("/tickets/:id", verifyToken, deleteTicketsById);

router.get("/apps/:slug", Mobile);
router.get("/logs", verifyToken, getLogs);

router.get("/dashboard", Dashboard);

router.get("/counter/:code", getDetailForCounter);

router.get("/relationship", getRelationship);
router.post("/relationship", createRelationship);
router.put("/relationship/:id", updateRelationship);
router.delete("/relationship/:id", deleteRelationship);

router.get("/print", getPrint);

router.get("/attendances", getAttendance);
router.get("/attendances-code/:code", getAttendancesByCode);
router.post("/check-in", invitedCheckIn);
router.put("/check-out/:code", invitedCheckOut);

export default router;
