const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, emptyBody } = require("../../middlewares");

const contactsSchema = require("../../schema/contacts");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(contactsSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validateBody(contactsSchema), ctrl.updateContact);

module.exports = router;
