import express from 'express'
import { sendMessage,getMessage } from '../controllers/messagesController.js';
import { authMessages } from '../middleware/authMessages.js';

const messagesRouter = express.Router();

messagesRouter.post("/send/:id",authMessages,sendMessage)
messagesRouter.get("/get/:id",authMessages,getMessage)
export default messagesRouter;