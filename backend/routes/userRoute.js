import express from "express";
import {
  registerUser,
  loginUser,
  cancelapp,
  updateUserP,
  getProfile,
  bookApp,
  sendAppList,
  formRegi,
} from "../controllers/userControler.js";
import authUser from "../middleware/authUser.js";
import uplaoad from "../middleware/multer.js";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post(
  "/update-profile",
  uplaoad.single("image"),
  authUser,
  updateUserP
);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/book-appointment", authUser, bookApp);
userRouter.get("/appointments", authUser, sendAppList);
userRouter.post("/cancel-appointment", authUser, cancelapp);

userRouter.post("/regi", formRegi);

export default userRouter;
