const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).trim().required().messages({
    "string.empty": "email field is required",
    "any.required": "missing required email field",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "password field is required",
    "any.required": "missing required password field",
  }),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
  token: Joi.string().default(null),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).trim().required().messages({
    "string.empty": "email field is required",
    "any.required": "missing required email field",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).trim().required().messages({
    "string.empty": "email field is required",
    "any.required": "missing required email field",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "password field is required",
    "any.required": "missing required password field",
  }),
});

const updateSubscripSchema = Joi.object({
  subscription: Joi.string()
    .trim()
    .valid("starter", "pro", "business")
    .required(),
});

const schemas = {
  registerSchema,
  emailSchema,
  loginSchema,
  updateSubscripSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
