import doctorModel from "../model/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../model/appointmentModel.js";
import assistantSchema from '../model/assistantModel.js'
import validator from "validator";
const changeAva = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, { ava: !docData.ava });
    console.log("\x1b[34m availability updated: ");
    if (docData.ava) {
      console.log(`\x1b[31m ${!docData.ava} `);
    } else {
      console.log(`\x1b[32m ${!docData.ava} `);
    }
    console.log(`\x1b[33m ${docData.name}`);
    console.log("\x1b[0m");
    res.json({ success: true, message: "availability updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);

    // Ensure that doctors is an array before sending it
    if (Array.isArray(doctors)) {
      console.log("dr list sent successfully !!"); // Debug: Log the doctors data
      res.status(200).json({ success: true, data: doctors });
    } else {
      res.status(404).json({ success: false, message: "No doctors found." });
    }
  } catch (error) {
    console.error("Error fetching doctor list:", error); // Log the error for debugging
    res.status(500).json({ success: false, message: "Server error." });
  }
};
const loginD = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "email not found" });
    }
    const isINWINKWINK = await bcrypt.compare(password, doctor.password);
    if (isINWINKWINK) {
      console.log(doctor.name, " is online");
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SEC);
      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "tsk tsk tsk u dont know your password u doc ? ",
      });
    }
  } catch (error) {
    console.error("Error Doctor login:", error);
    res.json({ success: false, message: error.message });
  }
};
const appDDDD = async (req, res) => {
  try {
    const { docId } = req.body;
    const app = await appointmentModel.find({ docId });
    console.log("sending dr app list to ", docId);
    res.json({ success: true, app });
  } catch (error) {
    console.error("Error Doctor sending:", error);
    res.json({ success: false, message: error.message });
  }
};
const appPaidanddone = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appData = await appointmentModel.findById(appointmentId);
    if (!appData.cancelled) {
      if (!appData.isCompleted && appData.docId === docId) {
        await appointmentModel.findByIdAndUpdate(appointmentId, {
          isCompleted: true,
          payment: true,
        });
        return res.json({ success: true, message: "appointment done" });
      } else {
        return res.json({ success: false, message: "already is Completed" });
      }
    } else {
      return res.json({ success: false, message: "already cancelled" });
    }
  } catch (error) {
    console.error("Error app don sending:", error);
    res.json({ success: false, message: error.message });
  }
};
const canTheApp = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    console.log("doc:", docId);
    console.log("aId:", appointmentId);
    const appData = await appointmentModel.findById(appointmentId);
    if (!appData.isCompleted && appData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "appointment cancelled" });
    } else {
      return res.json({ success: false, message: "already is Completed" });
    }
  } catch (error) {
    console.error("Error app can sending:", error);
    res.json({ success: false, message: error.message });
  }
}
const docDash = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });
    let ern = 0;
    appointments.map((i) => {
      if (i.isCompleted) {
        ern += i.amount;
      }
    });
    let NOP = [];
    appointments.map((i) => {
      if (!NOP.includes(i.userId)) {
        NOP.push(i.userId);
      }
    });
    const dashD = {
      ern,
      appointments: appointments.length,
      pat: NOP.length,
      lateApp: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashD });
  } catch (error) {
    console.error("Error docdash sending:", error);
    res.json({ success: false, message: error.message });
  }
};
const doctorpro = async (req, res) => {
  try {
    const { docId } = req.body;
    const proData = await doctorModel.findById(docId).select("-password");
    console.log("sent dr",proData.name," profile");
    res.json({ success: true , proData});
  } catch (error) {
    console.error("Error docpro sending:", error);
    res.json({ success: false, message: error.message });
  }
};
const updateDPro = async (req, res) => {
  try {
    const { docId,body} = req.body;
    const{ fees, address, ava,name }=body
    await doctorModel.findByIdAndUpdate(docId, { fees, address, ava });
    console.log("updated dr successfully :",name)
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error("Error update docpro sending:", error);
    res.json({ success: false, message: error.message });
  }
};
const addAss= async(req,res)=>{
  const{docId,formData}=req.body;

  console.log(req)
  const {phone,password,email,name}=formData;
  try {
  const ass = await assistantSchema.findOne({email})
  if(ass)
    res.json({success:false,message:"email taken"})
  if(!phone||!password||!email||!name)
    res.json({ success: false, message: "Missing required fields." });
  if(!validator.isEmail(email))
    res.json({ success: false, message: "Invalid email format." });
  if (password.length < 8) {
    return res.json({ success: false, message: "Password must be at least 8 characters long." });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const assD={
    name,
    email,
    password:hashedPassword,
    phone,
    assignedDoctor:docId
  }
  const newAss= new assistantSchema(assD);
  await newAss.save()
  console.log("new ass saved by :",docId)

  } catch (error) {
    console.error("Error adding ass:", error);
    res.json({ success: false, message: error.message });
  }
}
export {
  changeAva,
  doctorpro,
  updateDPro,
  loginD,
  canTheApp,
  docDash,
  appPaidanddone,
  doctorList,
  appDDDD,addAss,
};
