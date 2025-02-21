import joi from "joi";
import { Types } from "mongoose";
const checkObjectId = (value, helper) => {
  return Types.ObjectId.isValid(value)
    ? true
    : helper.message("Invalid ObjectId");
};
export const generalFeilds = {
  id: joi.string().custom(checkObjectId).required(),
  optionalId: joi.string().custom(checkObjectId),

  firstName: joi.string().min(3).max(20).messages({
    "any.required": "firstName is required",
    "string.empty": "firstName cant't be empty",
    "string.base": "firstName should be a type of string!",
    "string.min": "firstName should be at least 3 characters!",
    "string.max": "firstName should be less than 20 characters!",
  }),
  lastName: joi.string().min(3).max(20).messages({
    "any.required": "lastName is required",
    "string.empty": "lastName cant't be empty",
    "string.base": "lastName should be a type of string!",
    "string.min": "lastName should be at least 3 characters!",
    "string.max": "lastName should be less than 20 characters!",
  }),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "string.email": "Email must be valid!!",
      "string.empty": "Email is not allowed to be empty",
    }),
  password: joi
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .messages({
      "string.pattern.base":
        "password must be at least eight characters long, with at least one letter and one number",
    }),

  cPassword: joi.string().messages({
    "any.only": "The confirmation password must be the same as the password",
  }),
  phone: joi
    .string()
    .pattern(/^(\+2)?01[0125][0-9]{8}$/)
    .messages({ "string.pattern.base": "please Enter a valid phone Number" }),
  otp: joi
    .string()
    .alphanum()
    .length(8)
    .required()
    .messages({ "string.length": "Invalid OTP code" }),

    file: joi.object({
    size: joi.number().positive().required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(),
    encoding: joi.string().required(),
    originalname: joi.string().required(),
    fieldname: joi.string().required(),
  }),

  headers: joi.object({
    authorization: joi
      .string()
      .regex(/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/)
      .required(),
  }),
};

////  Validation   ///////////////
export const isValid = (joiSchema, considerHeaders = false) => {
  return (req, res, next) => {
    let copyReq = {
      ...req.body,
      ...req.params,
      ...req.query,
    };
    if (req.headers?.authorization && considerHeaders) {
      copyReq = { authorization: req.headers.authorization };
    }
    if (req.files || req.file) {
      copyReq.file = req.files || req.file;
    }

    const { error } = joiSchema.validate(copyReq, { abortEarly: false });
    if (error) {
      return res.status(422).json({
        message: "Validation Error",
        status_code: 422,
        Error: error.message,
      });
    } else {
      return next();
    }
  };
};
