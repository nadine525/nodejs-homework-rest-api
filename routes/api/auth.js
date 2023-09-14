const express = require("express");

const {
  validateMainBody,
  authenticate,
  validateBody,
  upload,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const cntrl = require("../../controllers/auth");

const router = express.Router();

//SING UP
router.post(
  "/register",
  validateMainBody(schemas.registerSchema),
  cntrl.register
);

router.get("/verify/:verificationToken", cntrl.verifyEmail);

router.post(
  "/verify",
  validateMainBody(schemas.emailSchema),
  cntrl.resendVerifyEmail
);

//SING IN
router.post("/login", validateMainBody(schemas.loginSchema), cntrl.login);

router.get("/current", authenticate, cntrl.getCurrent);

router.post("/logout", authenticate, cntrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscripSchema),
  cntrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  cntrl.updateAvatar
);

module.exports = router;
