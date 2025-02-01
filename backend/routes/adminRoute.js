import express from "express";
import {
  addDoctor,
  getDsA,
  allDoctors,
  addminDash,
  addAdmin,
  appointmentsAdmin,deleteOneAsA,
  cancelappAD,
  loginAdmin,
} from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";
import { changeAva } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctor", authAdmin, allDoctors);
adminRouter.post("/change-ava", authAdmin, changeAva);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel", authAdmin, cancelappAD);
adminRouter.get("/dashboard", authAdmin, addminDash);

adminRouter.post("/delete", authAdmin, deleteOneAsA);
adminRouter.post("/getF", authAdmin, getDsA);
adminRouter.post("/addadmin", authAdmin, addAdmin);

export default adminRouter;
