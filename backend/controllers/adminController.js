import validator from 'validator';
import bcrypt from 'bcrypt';
import doctorModel from '../model/doctorModel.js';
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken'
import appointmentModel from '../model/appointmentModel.js';
import userModel from '../model/userModel.js';
// API for adding a doctor
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

    // Checking if required fields are present
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    // Validating email and password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long." });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Uploading the image
    let imageUrl = '';
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      imageUrl = imageUpload.secure_url;
    }

    // Creating doctor data
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
      address: JSON.parse(address), // Parsing address JSON
      date: date || Date.now(),
    };

    // Saving to the database 
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
    if(email=== process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORLD){
        const token = jwt.sign(email+password,process.env.JWT_SEC)
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
    }



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


export { addDoctor,cancelappAD,addminDash, appointmentsAdmin,loginAdmin,allDoctors};
