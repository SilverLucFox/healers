import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "participantRoles",
      },
    ],
    participantRoles: [
      {
        type: String,
        required: true,
        enum: ["user", "doctor", "assistant"],
      },
    ], 
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default:[]
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
