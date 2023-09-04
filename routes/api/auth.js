const express = require("express");

const {
  validateMainBody,
  authenticate,
  validateBody,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const cntrl = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  validateMainBody(schemas.registerSchema),
  cntrl.register
);

router.post("/login", validateMainBody(schemas.loginSchema), cntrl.login);

router.get("/current", authenticate, cntrl.getCurrent);

router.post("/logout", authenticate, cntrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscripSchema),
  cntrl.updateSubscription
);

module.exports = router;
