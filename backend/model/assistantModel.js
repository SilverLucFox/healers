import mongoose from "mongoose";

const assistantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "assistant", // Assign the role explicitly
    },
    phone: {
      type: String,
      required: true,
    },
    assignedDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // Link the assistant to a specific doctor
    },
  },
  { timestamps: true }
);

export default mongoose.model("assistant", assistantSchema);
