import express from "express";
import {
  doctorList,
  docDash,
  doctorpro,
  updateDPro,
  appPaidanddone,
  canTheApp,deleteOneAsA,
  appDDDD,addAss,getAsA,
  loginD,
} from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";
const doctorRouter = express.Router();
doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginD);
doctorRouter.get("/appointmrnts", authDoctor, appDDDD);
doctorRouter.post("/completeapp", authDoctor, appPaidanddone);
doctorRouter.post("/canit", authDoctor, canTheApp);
doctorRouter.get("/dash", authDoctor, docDash);
doctorRouter.get('/profile',authDoctor,doctorpro)
doctorRouter.post('/updatePro',authDoctor,updateDPro)
doctorRouter.post('/addass',authDoctor,addAss)
doctorRouter.post('/getF',authDoctor,getAsA)
doctorRouter.post('/delete',authDoctor,deleteOneAsA)

export default doctorRouter;
