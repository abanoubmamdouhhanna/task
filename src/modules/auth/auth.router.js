import { Router } from "express";
import { isValid } from "../../Middlewares/validation.middleware.js";
import * as authController from "./controller/auth.controller.js";
import {
  authRegisterSchema,
  changeRoleSchema,
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
  "/newConfirm/:email",
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

//change role by admin
router.post(
  "/changeRole/:userId",
  auth(["superAdmin"]),
  isValid(changeRoleSchema),
  authController.changeRole
);

export default router;
