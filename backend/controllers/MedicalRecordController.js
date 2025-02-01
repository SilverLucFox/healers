import doctorModel from "../model/doctorModel.js";
import MedicalRecord from "../model/MedicalRecord.js";
import userModel from "../model/userModel.js";


const addMedicalRecord = async (req, res) => {
  try {
    console.log(req.body)
    const { patient, doctor, diagnosis, treatment, medications, notes } = req.body;

    const foundPatient = await userModel.findById(patient);
    const foundDoctor = await doctorModel.findById(doctor);

    if (!foundPatient) {
      return res.status(404).json({ success: false, message: "Patient not found." });
    }

    if (!foundDoctor) {
      return res.status(404).json({ success: false, message: "Doctor not found." });
    }

    const newRecord = new MedicalRecord({
      patient,
      doctor,
      diagnosis,
      treatment,
      medications,
      notes,
    });

    await newRecord.save();
    console.log("record added by D/A:",foundDoctor._id)
    res.json({
      success: true,
      message: "Medical record added successfully.",
    });
  } catch (error) {
    console.error("Error adding medical record:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
const sendMR = async (req, res) => {
  try {
    // Populate both the 'patient' and 'doctor' fields with their respective user data (name)
    const data = await MedicalRecord.find({})
      .populate('patient', 'name') // Populate only the 'name' field of the patient
      .populate('doctor', 'name'); // Populate only the 'name' field of the doctor

    if (data) {
      console.log(data);
      res.json({ success: true, data });
    } else {
      res.json({ success: true, message: "No records found" });
    }
  } catch (error) {
    console.error("Error fetching medical records:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};




export{addMedicalRecord,sendMR};