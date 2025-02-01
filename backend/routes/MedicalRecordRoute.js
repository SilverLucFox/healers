import express from 'express'
import { addMedicalRecord,sendMR } from '../controllers/MedicalRecordController.js';

const MedicalRecordRoute = express.Router();
MedicalRecordRoute.post('/add', addMedicalRecord);
MedicalRecordRoute.get('/get', sendMR);


export default MedicalRecordRoute;