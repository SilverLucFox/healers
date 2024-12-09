import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderRole",
    },
    senderRole: {
      type: String,
      required: true,
      enum: ["user", "doctor", "assistant"],
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "receiverRole",
    },
    receiverRole: {
      type: String,
      required: true,
      enum: ["user", "doctor", "assistant"],
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messagesSchema);
