import connectDB from "../DB/connection.js";
import { glopalErrHandling } from "./utils/errorHandling.js";
import authRouter from './modules/auth/auth.router.js'

const initApp = (app, express) => {
  app.use(express.json({}));
  app.use("/auth", authRouter);
  
  app.all("*", (req, res, next) => {
    return next(new Error("error 404 in-valid routing",{cause:404}))
  });

  app.use(glopalErrHandling);

  //connect DataBase
  connectDB();
};

export default initApp;
