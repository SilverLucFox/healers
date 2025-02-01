import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", 
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor", 
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    treatment: {
      type: String,
      required: true,
    },
    dateOfVisit: {
      type: Date,
      required: true,
      default: Date.now,
    },
    medications: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { minimize: false }
);

const MedicalRecord = mongoose.models.MedicalRecord || mongoose.model("MedicalRecord", medicalRecordSchema);

export default MedicalRecord;
