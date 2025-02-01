import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    speciality: {
      type: String,
      require: true,
    },
    ava: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      require: true,
    },
    degree: {
      type: String,
      require: true,
    },
    experience: {
      type: String,
      require: true,
    },
    about: {
      type: String,
      require: true,
    },
    address: {
      type: Object,
      require: true,
    },
    fees: {
      type: Number,
      require: true,
    },
    slots_booked: {
      type: Object,
      default: {},
    },
    date: {
      type: Number,
      require: true,
    },role: {
      type: String,
      default: "doctor", 
      enum: ["doctor"], 
    },
  },
  { minimize: false }
);

const doctorModel =
  mongoose.Model.doctor || mongoose.model("doctor", doctorSchema);
export default doctorModel;
