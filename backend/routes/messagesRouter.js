import express from 'express'
import { sendMessage,getMessage,getMessageA ,sendMessageA} from '../controllers/messagesController.js';
import { authMessages } from '../middleware/authMessages.js';
import authDoctor from '../middleware/authDoctor.js';

const messagesRouter = express.Router();

messagesRouter.post("/send/:id",authMessages,sendMessage)
messagesRouter.post("/senda/:id",authMessages,sendMessageA)
messagesRouter.post("/sendd/:id",authMessages,sendMessageA)
messagesRouter.get("/get/:id",authMessages,getMessage)
messagesRouter.get("/getA/:id",authMessages,getMessageA)
messagesRouter.get("/getD/:id",authMessages,getMessageA)
export default messagesRouter;