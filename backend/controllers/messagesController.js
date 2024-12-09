import conversationModel from "../model/conversationModel.js";
import assistantModel from "../model/assistantModel.js"; 
import doctorModel from "../model/doctorModel.js";
import messagesModel from "../model/messagesModel.js";

export const sendMessage = async (req, res) => {
    try {
        const { message, senderRole, receiverRole } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;

        console.log("Sender ID:", senderId);
        console.log("Receiver ID:", receiverId);

        let con = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // Try to find the assistant assigned to the receiver
        let ass = await assistantModel.findOne({ assignedDoctor: receiverId });

        if (!ass) {
            // Try to find the assistant assigned to the sender
            ass = await assistantModel.findOne({ assignedDoctor: senderId });
        } 

        // Fallback to a default assistant if no specific assistant is found
        if (!ass) {
            ass = await assistantModel.findById("6754621a374381a911717cb7");
        }

        if (!ass) {
            return res.status(404).json({
                success: false,
                message: "Assistant not found"
            });
        }

        if (!con) {
            // If no conversation exists, create one
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

        // Add the new message to the conversation
        con.messages.push(newMessage._id);
        // Save the new message
        // await newMessage.save();

        // await con.save();
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
};

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