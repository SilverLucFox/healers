import assistantSchema from "../model/assistantModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import conversationModel from "../model/conversationModel.js";
import messagesModel from "../model/messagesModel.js";
import assistantModel from "../model/assistantModel.js";
import appointmentModel from "../model/appointmentModel.js";

const asslog = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ass = await assistantSchema.findOne({ email });
    if (!ass) {
      return res.json({ success: false, message: "email not found" });
    }
    const isINWINKWINK = await bcrypt.compare(password, ass.password);
    if (isINWINKWINK) {
      console.log("assistant:", ass.name, " is online");
      const token = jwt.sign({ id: ass._id }, process.env.JWT_SEC, { expiresIn: '1h' });
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
    const conversations = await conversationModel
      .find({
        participants: assId,
      })
      .populate("participants", "name email");
    if (!conversations.length) {
      return res.json({
        message: "No conversations found for this assistant.",
      });
    }
    console.log("\x1b[34m -refreshing-\x1b[0m")
    res.json({ success: true, conversations });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res
      .status(500)
      .json({ message: "Error fetching conversations", error: error.message });
  }
};
const sendmsg = async (req, res) => {
  const { assId } = req.body;
  try {
    const conversations = await conversationModel
      .find({
        participants: assId,
      })
      .populate("participants", "name email");
    if (!conversations.length) {
      return res.json({
        message: "No conversations found for this assistant.",
      });
    }

    const messageIds = conversations.reduce((acc, conversation) => {
      return acc.concat(conversation.messages);
    }, []);

    const messages = await messagesModel.find({
      _id: { $in: messageIds },
    });

    const enrichedMessages = messages.map((message) => {
      const conversation = conversations.find((conv) =>
        conv.messages.some((msg) => String(msg._id) === String(message._id))
      );
      if (conversation) {
        return {
          ...message.toObject(),
          conversationId: conversation._id,
        };
      }
      return message.toObject();
    });
    res.json({ success: true, enrichedMessages });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res
      .status(500)
      .json({ message: "Error fetching conversations", error: error.message });
  }
};
const delcon = async (req, res) => {
  try {
    const { body } = req.body;
    const conversation = await conversationModel.findById(body);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    const messageIds = conversation.messages;
    await messagesModel.deleteMany({ _id: { $in: messageIds } });
    await conversationModel.findByIdAndDelete(body);
    console.log("\x1b[36m conversation: \x1b[0m \x1b[41m\x1b[37m%s\x1b[0m deleted by : \x1b[41m\x1b[37m%s\x1b[0m",body,req.body.assId)
    res.json({
      success: true,
      message: "Conversation and its messages deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting conversation and messages:", error);
    res.json({
      success: true,
      message: "Error deleting conversation and messages",
      error: error.message,
    });
  }
};
const assList = async (req, res) => {
  console.log("dffgdf")
  try {
    const{assId}=req.body
    const assistants = await assistantModel.findById(assId).select(["-password", "-email"]);
    if (assistants) {
      console.log("ass list sent successfully !!"); 
      res.status(200).json({ success: true, data: assistants });
    } else {
      res.status(404).json({ success: false, message: "No assistants found." });
    }
  } catch (error) {
    console.error("Error fetching doctor list:", error); 
    res.status(500).json({ success: false, message: "Server error." });
  }
};
const appass = async (req, res) => {
  try {
    const{assId}=req.body
    console.log(assId)
    const ass = await assistantModel.findById(assId)
    const app = await appointmentModel.find({docId:ass.assignedDoctor});
    console.log("sending dr app list to: ", assId);
    res.json({ success: true, app });
  } catch (error) {
    console.error("Error Doctor sending:", error);
    res.json({ success: false, message: error.message });
  }
};
export { asslog, sendconv, sendmsg,appass, delcon ,assList};
