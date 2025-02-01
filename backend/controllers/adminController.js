import validator from 'validator';
import bcrypt from 'bcrypt';
import doctorModel from '../model/doctorModel.js';
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken'
import appointmentModel from '../model/appointmentModel.js';
import userModel from '../model/userModel.js';
import contactFormModel from '../model/contactFormModel.js';
import adminModel from '../model/adminModel.js';
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      ava,
      degree,
      experience,
      about,
      fees,
      date,
      address,
    } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let imageUrl = '';
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      imageUrl = imageUpload.secure_url;
    }

    const doctorData = {
      name,
      email,
      image: imageUrl,
      speciality,
      ava,
      password: hashedPassword,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address), 
      date: date || Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    console.log("\x1b[34m");
    console.log("██████╗░ ██████╗░ ░░░ ░█████╗░ ██████╗░ ██████╗░ ███████╗ ██████╗░");
    console.log("██╔══██╗ ██╔══██╗ ░░░ ██╔══██╗ ██╔══██╗ ██╔══██╗ ██╔════╝ ██╔══██╗");
    console.log("██║░░██║ ██████╔╝ ░░░ ███████║ ██║░░██║ ██║░░██║ █████╗░░ ██║░░██║");
    console.log("██║░░██║ ██╔══██╗ ░░░ ██╔══██║ ██║░░██║ ██║░░██║ ██╔══╝░░ ██║░░██║");
    console.log("██████╔╝ ██║░░██║ ██╗ ██║░░██║ ██████╔╝ ██████╔╝ ███████╗ ██████╔╝");
    console.log("╚═════╝░ ╚═╝░░╚═╝ ╚═╝ ╚═╝░░╚═╝ ╚═════╝░ ╚═════╝░ ╚══════╝ ╚═════╝░");
    console.log("\x1b[0m");
    res.json({ success: true, message: "Doctor added successfully!" });

  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
}
const loginAdmin = async (req,res)=>{
  try{

    const {
      email,password
    }=req.body
    const addmin = await adminModel.findOne({email})
    if (!addmin&&email!== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "email not found" });
    }else{
    const isINWINKWINK = await bcrypt.compare(password, addmin? addmin.password:"");
    if(isINWINKWINK||email=== process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORLD){
        const token = jwt.sign({email:email+password  },process.env.JWT_SEC, { expiresIn: '1h' })
        console.log('\x1b[32m%s\x1b[0m', '░█████╗░ ██████╗░ ███╗░░░███╗ ██╗ ███╗░░██╗   ██╗ ░██████╗   ██╗ ███╗░░██╗');
        console.log('\x1b[32m%s\x1b[0m', '██╔══██╗ ██╔══██╗ ████╗░████║ ██║ ████╗░██║   ██║ ██╔════╝   ██║ ████╗░██║');
        console.log('\x1b[32m%s\x1b[0m', '███████║ ██║░░██║ ██╔████╔██║ ██║ ██╔██╗██║   ██║ ╚█████╗░   ██║ ██╔██╗██║');
        console.log('\x1b[32m%s\x1b[0m', '██╔══██║ ██║░░██║ ██║╚██╔╝██║ ██║ ██║╚████║   ██║ ░╚═══██╗   ██║ ██║╚████║');
        console.log('\x1b[32m%s\x1b[0m', '██║░░██║ ██████╔╝ ██║░╚═╝░██║ ██║ ██║░╚███║   ██║ ██████╔╝   ██║ ██║░╚███║');
        console.log('\x1b[32m%s\x1b[0m', '╚═╝░░╚═╝ ╚═════╝░ ╚═╝░░░░░╚═╝ ╚═╝ ╚═╝░░╚══╝   ╚═╝ ╚═════╝░   ╚═╝ ╚═╝░░╚══╝');
        res.json({success:true,token})
    }else{
      console.log('\x1b[41m\x1b[37m%s\x1b[0m', '█░░ ▄▀█ ▀█');
      console.log('\x1b[41m\x1b[37m%s\x1b[0m', '█▄▄ █▀█ █▄');
      console.log('\x1b[41m\x1b[37m%s\x1b[0m', 'access denied');
      console.log('\x1b[41m\x1b[37m%s\x1b[0m', '█▄░█ █▀█ ▀█▀ ');
      console.log('\x1b[41m\x1b[37m%s\x1b[0m', '█░▀█ █▄█ ░█░ ');
      res.json({success:false,message:"notAdmin"})
    }}
  }catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
}
const allDoctors = async(req,res)=>{
  try {
    const doctors = await doctorModel.find({}).select('-password')
    console.log("\x1b[42m \x1b[31mreFresher\x1b[37m\x1b[41m\x1b[37m ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\x1b[0m")
    console.log("\x1b[42m██████╗░ ██████╗░ ░░░ ██╗░░░░░ ░░░ ░██████╗ ███████╗ ███╗░░██╗ ████████╗\x1b[0m"),
    console.log("\x1b[42m██╔══██╗ ██╔══██╗ ░░░ ██║░░░░░ ░░░ ██╔════╝ ██╔════╝ ████╗░██║ ╚══██╔══╝\x1b[0m"),
    console.log("\x1b[42m██║░░██║ ██████╔╝ ░░░ ██║░░░░░ ░░░ ╚█████╗░ █████╗░░ ██╔██╗██║ ░░░██║░░░\x1b[0m"),
    console.log("\x1b[42m██║░░██║ ██╔══██╗ ░░░ ██║░░░░░ ░░░ ░╚═══██╗ ██╔══╝░░ ██║╚████║ ░░░██║░░░\x1b[0m"),
    console.log("\x1b[42m██████╔╝ ██║░░██║ ██╗ ███████╗ ██╗ ██████╔╝ ███████╗ ██║░╚███║ ░░░██║░░░\x1b[0m"),
    console.log("\x1b[42m╚═════╝░ ╚═╝░░╚═╝ ╚═╝ ╚══════╝ ╚═╝ ╚═════╝░ ╚══════╝ ╚═╝░░╚══╝ ░░░╚═╝░░░\x1b[0m"),





    res.json({success:true,doctors})
    
  } catch (error) {
    console.error("Error sending  doctor list:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }

}
const appointmentsAdmin = async(req,res)=>{
  try {
    const appointments = await appointmentModel.find({})
    console.log("sent appointments list //admin");
    res.json({success:true ,appointments})
  } catch (error) {
    console.error("Error sending appointments list:", error);
    res.status(500).json({ success: false, message: "Server error." });
  
  }
}
const cancelappAD= async (req,res)=>{
  try {
    const {appointmentId}=req.body
    const appointmentData=await appointmentModel.findById(appointmentId)
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
    const {docId,slotDate,slotTime}=appointmentData
    const doctorsData = await doctorModel.findById(docId)
    let slots_booked = doctorsData.slots_booked
    slots_booked[slotDate]= slots_booked[slotDate].filter(e=>e!==slotTime)
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})
    console.log("ADMIN //appointment:",appointmentData.useData.name,"->\n\t",appointmentData.docData.name,"at",slotDate," || ",slotTime," been canceled")
    res.json({success:true,message:'appointment cancelled via admin'})
  } catch (error) {
    console.error("Error canceling appointment ", error);
    res.status(500).json({ success: false, message: "Server error ." });

  }
}
const addminDash = async(req,res)=>{
  try {
    const doctor=await doctorModel.find({})
    const users = await userModel.find({})
    const app = await appointmentModel.find({})

    const dashData = {
      doctor:doctor.length,
      app:app.length,
      patients:userModel.length,
      lateApp:app.reverse().slice(0,5)
    }
    res.json({success:true,dashData})



  } catch (error) {
    console.error("Error Dash", error);
    res.json({ success: false, message: "Server error ." });

  }
}
const getDsA = async (req,res)=>{
  try {
    const Dcont = (await contactFormModel.find({})).filter(item => item.role === 'doctor');
    if(Dcont){
      res.json({success:true,Dcont})
    }
  } catch (error) {
    console.error('Error while sending form:', error);
    res.status(500).json({ error: 'An error occurred while processing the form.' });
  }
}
const addAdmin =async (req,res)=>{
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success:false, message: "Email and password are required." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new adminModel({ email, password:hashedPassword });
    await newAdmin.save();
    res.json({success:true, message: "Admin created successfully!", });
  } catch (error) {
    console.error('Error while sending form:', error);
    res.status(500).json({ error: 'An error occurred while processing the form.' });
  }
}
const deleteOneAsA = async (req, res) => {
  try {
    const { id } = req.body; 
    const result = await contactFormModel.deleteOne({ _id: id, role: 'doctor' });

    if (result.deletedCount === 0) {
      return res.json({ success: false, message: 'Record not found or already deleted.' });
    }

    res.json({ success: true, message: 'Record deleted successfully.' });
  } catch (error) {
    console.error('Error while deleting record:', error);
    res.json({ error: 'An error occurred while deleting the record.' });
  }
};

export { addDoctor,getDsA,cancelappAD,addminDash,addAdmin, appointmentsAdmin,loginAdmin,deleteOneAsA,allDoctors};
