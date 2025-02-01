import conversationModel from "../model/conversationModel.js";
import assistantModel from "../model/assistantModel.js"; 
import doctorModel from "../model/doctorModel.js";
import messagesModel from "../model/messagesModel.js";

export const sendMessage = async (req, res) => {
    try {
        const { message, senderRole, receiverRole } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;
        console.log("Sender ID: ", senderId);
        console.log("Receiver ID:", receiverId);
        let con = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        let ass = await assistantModel.findOne({ assignedDoctor: receiverId });
        if (!ass) {
            ass = await assistantModel.findOne({ assignedDoctor: senderId });
        }
        if (!ass) {
            return res.status(404).json({
                success: false,
                message: "Assistant not found"
            });
        }
        if (!con) {
            con = await conversationModel.create({
                participants: [senderId, receiverId, ass._id],
                participantRoles: [senderRole, receiverRole, "assistant"]
            });
        }
        const newMessage = new messagesModel({
            message,
            senderId,
            receiverId,
            senderRole,
            receiverRole
        });
        con.messages.push(newMessage._id);
        await Promise.all[newMessage.save(),con.save()]
        res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const getMessage = async(req,res)=>{
    try {
        
        const{id:usertochat}=req.params
        const senderId = req.user.id
        console.log("resending msgs...")
        const con = await conversationModel.findOne({
            participants:{$all:[senderId,usertochat]}
        }).populate('participants').populate('messages');
        res.status(200).json(con.messages)
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
   
    }
}
export const getMessageA = async(req,res)=>{
    try {
        
        const{id:usertochat}=req.params
        const senderId = req.user.id
        const con = await conversationModel.findOne({
            participants:{$all:[usertochat,senderId]}
        }).populate('participants').populate('messages');
        res.status(200).json(con.messages)
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
   
    }
}
export const sendMessageA = async (req, res) => {
    try {
        const { message, receiverRole ,senderRole} = req.body;
        const { id: receiverId } = req.params;


        const senderId = req.user.id;
        
        console.log(senderRole)
        console.log("Sender (Assistant) ID:", senderId);
        console.log("Receiver ID:", receiverId);

        // Find existing conversation or create a new one
        let con = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!con) {
            con = await conversationModel.create({
                participants: [senderId, receiverId],
                participantRoles: [senderRole, receiverRole],
            });
        }

        // Create and save the message
        const newMessage = new messagesModel({
            message,
            senderId,
            receiverId,
            senderRole,
            receiverRole,
        });

        con.messages.push(newMessage._id);

        await Promise.all([
            newMessage.save(),
            con.save(),
        ]);

        res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
