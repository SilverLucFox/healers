import assistantSchema from "../model/assistantModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import conversationModel from "../model/conversationModel.js";
import messagesModel from "../model/messagesModel.js";

const asslog = async (req, res) => {
    try {
      const { email, password } = req.body;
      const ass = await assistantSchema.findOne({ email });
      if (!ass) {
        return res.json({ success: false, message: "email not found" });
      }
      const isINWINKWINK = await bcrypt.compare(password, ass.password);
      if (isINWINKWINK) {
        console.log("assistant:",ass.name, " is online");
        const token = jwt.sign({ id: ass._id }, process.env.JWT_SEC);
        res.json({ success: true, token });
      } else {
        res.json({
          success: false,
          message: "wrong password ? ",
        });
      }
    } catch (error) {
      console.error("Error ass login:", error);
      res.json({ success: false, message: error.message });
    }
  };
  const sendconv = async (req, res) => {
    const { assId } = req.body;
    try {
      const conversations = await conversationModel.find({
        participants: assId,
      })
        .populate('participants', 'name email'); 
      if (!conversations.length) {
        return res.json({ message: 'No conversations found for this assistant.' });
      }
      // console.log(conversations)
      // console.log(conversations[0].participants)
      res.json({success:true,conversations});
    } catch (error) {
      console.error('Error fetching conversations:', error);
      res.status(500).json({ message: 'Error fetching conversations', error: error.message });
    }
  };
  const sendmsg = async (req, res) => {
    const { assId } = req.body;
    try {
      const conversations = await conversationModel.find({
        participants: assId,
      })
        .populate('participants', 'name email'); 
      if (!conversations.length) {
        return res.json({ message: 'No conversations found for this assistant.' });
      }
  
      const messageIds = conversations.reduce((acc, conversation) => {
        return acc.concat(conversation.messages);  
      }, []);
  
      const messages = await messagesModel.find({
        _id: { $in: messageIds }  
      });
  
      console.log(messages)
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      res.status(500).json({ message: 'Error fetching conversations', error: error.message });
    }
  };
  
  
  export{asslog,sendconv}