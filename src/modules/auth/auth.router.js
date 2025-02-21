import { Router } from "express";
import { isValid } from "../../Middlewares/validation.middleware.js";
import * as authController from "./controller/auth.controller.js";
import {
  authRegisterSchema,
    forgetPasswordSchema,
  headersSchema,
  logInSchema,
  reActivateAccSchema,
  resetPasswordOTPSchema,
} from "./controller/auth.validation.js";
import { auth } from "../../Middlewares/auth.middleware.js";

const router = Router();

//registeration
router.post("/register", isValid(authRegisterSchema), authController.signUp);

//login
router.post("/login", isValid(logInSchema), authController.logIn);

//log out
router.patch(
  "/logOut",
  isValid(headersSchema, true),
  auth(["user"]),
  authController.logOut
);
//email confirmation
router.get("/confirm/:activationCode", authController.activateAcc);

//request new email confirmation
router.post(
  "/newConfirm",
  isValid(reActivateAccSchema),
  authController.reActivateAcc
);

//forget password By OTP
router.post(
  "/forgetPasswordOTP",
  isValid(forgetPasswordSchema),
  authController.forgetPasswordOTP
);

//reset password by otp
router.post(
  "/resetPasswordOTP/:userEmail",
  isValid(resetPasswordOTPSchema),
  authController.resetPasswordOTP
);


export default router;
