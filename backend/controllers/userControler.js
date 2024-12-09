import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary } from 'cloudinary'
import doctorModel from '../model/doctorModel.js';
import appointmentModel from '../model/appointmentModel.js';
const registerUser = async (req, res) => {
  try {
    const { name, email, pass } = req.body;

    // Validate required fields
    if (!name || !pass || !email) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Validate password length
    if (pass.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(pass, salt);

    // Save the new user
    const userData = { name, email, password: hashedPass };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SEC);

    console.log(`\x1b[34mNew user registered:\x1b[0m ${email}`);
    res.json({ success: true, token });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Server error while registering user." });
  }
};
const loginUser = async (req, res) => {
    try {
      const { email, pass } = req.body;
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ success: false, message: "User does not exist" });
      }
  
      // Check if user password exists
      if (!user.password) {
        console.error("Error: User password is missing from the database.");
        return res.status(500).json({ success: false, message: "Server error. Password data is invalid." });
      }
  
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SEC);
        console.log(`\x1b[33mUser logged in:\x1b[0m ${email}`);
        return res.json({ success: true, token });
      } else {
        return res.status(400).json({ success: false, message: "Incorrect password" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ success: false, message: "Server error while logging in." });
    }
};
const getProfile = async(req,res)=>{
  try {
    
    const {userId}=req.body
    const userData = await userModel.findById(userId).select('-password')
    console.log("sending user Data ...")
    res.json({success:true,userData})
  } catch (error) {
    console.error("Error sending user info :", error);
    res.status(500).json({ success: false, message: "Server error while logging in." });
  
  }
}
const updateUserP = async (req, res) => {
  try {
    console.log("Updating...");
    const { userId, name, phone, address, dob, gender,email } = req.body;
    const imgf = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Missing information" });
    }

    await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender });

    if (imgf) {
      try {
        const imageUpload = await cloudinary.uploader.upload(imgf.path, { resource_type: 'image' });
        const imgurl = imageUpload.secure_url;
        await userModel.findByIdAndUpdate(userId, { image: imgurl });
      } catch (error) {
        console.error("Error uploading image:", error);
        return res.status(500).json({ success: false, message: "Error uploading image." });
      }
    }
    console.log("user updated :\x1b[34m ",email,"\x1b[0m")
    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ success: false, message: "Server error while updating." });
  }
};
const bookApp = async (req,res)=>{
  try {
    const{userId,docId,slotDate,slotTime}= req.body

    const docData = await doctorModel.findById(docId).select('-password')

    if(!docData.ava){
      return res.json({success:false,message:"doctor not available"})
    }
    let slots_booked=docData.slots_booked
    if(slots_booked[slotDate]){
    if(slots_booked[slotDate].includes(slotTime)){
      return res.json({success:false,message:"slot not available"})
    }else{
      slots_booked[slotDate].push(slotTime)
    }
  }else{
    slots_booked[slotDate]=[]
    slots_booked[slotDate].push(slotTime)
  }
  const useData = await userModel.findById(userId).select("-password")
  delete docData.slots_booked

  const appointmentData={
    userId,
    docId,
    useData,
    docData,
    amount:docData.fees,
    slotTime,
    slotDate,
    date:Date.now()
  }
  const newApp = new appointmentModel(appointmentData)
  await newApp.save()

  await doctorModel.findByIdAndUpdate(docId,{slots_booked})
  console.log("appointment booked:",useData.name,":",docData.name," at: ",slotDate,"/",slotTime)
  res.json({success:true,message:"appointment booked"})

  } catch (error) {
    console.error("Error booking appointment profile:", error);
    res.status(500).json({ success: false, message: "Server error while updating." });

  }
}
const sendAppList =async (req,res)=>{
  try{
    const {userId}=req.body
    const appointment = await appointmentModel.find({userId})
    console.log('sended appointments for user :',userId)
    res.json({success:true,appointment})

  }catch (error) {
    console.error("Error sending user appointment list", error);
    res.status(500).json({ success: false, message: "Server error while sending." });

  }

}
const cancelapp= async (req,res)=>{
  try {
    const {userId,appointmentId}=req.body
    const appointmentData=await appointmentModel.findById(appointmentId)
    if(appointmentData.userId !== userId){
      return res.json({success:true,message:'Unauthorized action'})
    }
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
    const {docId,slotDate,slotTime}=appointmentData
    const doctorsData = await doctorModel.findById(docId)
    let slots_booked = doctorsData.slots_booked
    slots_booked[slotDate]= slots_booked[slotDate].filter(e=>e!==slotTime)
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})
    console.log("appointment:",userId,"->\n\t",docId,"at",slotDate," || ",slotTime," been canceled")
    res.json({success:true,message:'appointment cancelled'})
  } catch (error) {
    console.error("Error canceling user appointment ", error);
    res.status(500).json({ success: false, message: "Server error ." });

  }
}


export { registerUser,getProfile,cancelapp,sendAppList, updateUserP,loginUser ,bookApp};
