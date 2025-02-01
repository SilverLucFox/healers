import express from 'express'
import { asslog ,sendconv,assList,sendmsg,delcon, appass} from '../controllers/assistantController.js';
import authAss from '../middleware/authAss.js';

const assistantRoute = express.Router();
assistantRoute.post("/login",asslog)
assistantRoute.post("/sendconv",authAss,sendconv)
assistantRoute.post("/sendmsg",authAss,sendmsg)
assistantRoute.post("/delcon",authAss,delcon)
assistantRoute.post("/list",authAss,assList)
assistantRoute.get("/appointmrnts",authAss,appass)
export default assistantRoute;