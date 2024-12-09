import express from 'express';
import { addDoctor, allDoctors,addminDash,appointmentsAdmin,cancelappAD ,loginAdmin } from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';
import { changeAva } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctor', authAdmin,allDoctors);
adminRouter.post('/change-ava', authAdmin,changeAva);
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel',authAdmin,cancelappAD)
adminRouter.get('/dashboard',authAdmin,addminDash)
export default adminRouter;
