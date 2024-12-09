import express from 'express'
import { asslog ,sendconv} from '../controllers/assistantController.js';
import authAss from '../middleware/authAss.js';

const assistantRoute = express.Router();
assistantRoute.post("/login",asslog)
assistantRoute.post("/sendconv",authAss,sendconv)
export default assistantRoute;