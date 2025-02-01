import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import {toast}from 'react-toastify'
import axios from 'axios'
const AddDoctor = () => {


    const[docImg,setDocImg]= useState(false)
    const[name,setname]= useState("")
    const[email,setEmail]= useState("")
    const[password,setpassword]= useState("")
    const[experience,setExperience]= useState("1 year")
    const[fees,setFees]= useState("")
    const[about,setAbout]= useState("")
    const[specialty,setSpecialty]= useState("General Physician")
    const[degree,setDegree]= useState("")
    const[address1,setAddress1]= useState("")
    const[address2,setAddress2]= useState("")

    const {backendurl,atoken} = useContext(AdminContext)
    
    const onSubHand = async(event)=>{
          event.preventDefault()
          try {
            if(!docImg){
              return toast.error("image not selected")
            }
            const formData = new FormData()
            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));  // Ensure fees is a number
            formData.append('about', about);
            formData.append('speciality', specialty);  // Ensure this matches the backend field
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
            formData.forEach((value, key) => {
              console.log(`${key}: ${value}`);
            });
            const { data } = await axios.post(
              `${backendurl}/api/admin/add-doctor`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${atoken}`,
                },
              }
            );
            console.log("Client-side token:", atoken);

            
            if(data.success){
              toast.success(data.message)
              setDocImg(false)
              setname("")
              setpassword("")
              setAddress1("")
              setAddress2("")
              setDegree("")
              setEmail("")
              setFees("")
              setAbout("")
            }else{
              toast.error(data.message)
            }
          } catch (error) {
            toast.error(error.message)
            console.log(error)
          }

    }




  return (
  <div className="flex justify-center items-center  py-1 ">
    <form onSubmit={onSubHand} className="bg-white shadow-lg rounded-lg p-6 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 mx-4">
      
    {/* Column 1 - Upload and Doctor Info */}
    <div className="flex flex-col items-start text-start col-span-1 space-y-6">
      <label htmlFor="doc-img" className="cursor-pointer">
        <img src={ docImg? URL.createObjectURL(docImg): assets.upload_area} alt="Upload" className="w-32 h-32 object-cover rounded-full shadow-lg" />
      </label>
      <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
      <p className="text-sm text-gray-500">
        Upload Doctor <br /> Picture
      </p>
      <div>
        <p className="text-sm font-medium text-gray-700">Doctor Name:</p>
        <input onChange={(e)=>setname(e.target.value)} value={name} type="text" placeholder="Name" required className="w-full p-2 border rounded-md text-gray-700" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">Doctor Email:</p>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Email" required className="w-full p-2 border rounded-md text-gray-700" />
      </div>
    </div>
  
    {/* Column 2 - Credentials */}
    <div className="col-span-1 space-y-4">
      <div>
        <p className="text-sm font-medium text-gray-700">Doctor Password:</p>
        <input onChange={(e)=>setpassword(e.target.value)} value={password} type="password" placeholder="Password" required className="w-full p-2 border rounded-md text-gray-700" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">Doctor Experience:</p>
        <select  onChange={(e)=>setExperience(e.target.value)} value={experience} className="w-full p-2 border rounded-md text-gray-700">
          {[...Array(10)].map((_, i) => (
            <option key={i} value={`${i + 1} year`}>{`${i + 1} year`}</option>
          ))}
        </select>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">Doctor Fees:</p>
        <input onChange={(e)=>setFees(e.target.value)} value={fees} type="number" placeholder="Fees" required className="w-full p-2 border rounded-md text-gray-700" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">Specialty:</p>
        <select  onChange={(e)=>setSpecialty(e.target.value)} value={specialty} className="w-full p-2 border rounded-md text-gray-700">
          <option value="General physician">General Physician</option>
          <option value="Gynecologist">Gynecologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Pediatricians">Pediatricians</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Gastroenterologist">Gastroenterologist</option>
        </select>
      </div>
    </div>
  
    <div className=" space-y-4">
      <div>
        <p className="text-sm font-medium text-gray-700">Doctor Education:</p>
        <input  onChange={(e)=>setDegree(e.target.value)} value={degree} type="text" placeholder="Education" required className="w-full p-2 border rounded-md text-gray-700" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">Doctor Address:</p>
        <input type="text" onChange={(e)=>setAddress1(e.target.value)} value={address1} placeholder="Address 1" required className="w-full p-2 border rounded-md text-gray-700 mb-2" />
        <input type="text" onChange={(e)=>setAddress2(e.target.value)} value={address2} placeholder="Address 2" required className="w-full p-2 border rounded-md text-gray-700" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">About Doctor:</p>
        <textarea onChange={(e)=>setAbout(e.target.value)} value={about} placeholder="Write About Doctor" rows={3} required className="w-full p-2 border rounded-md text-gray-700" />
      </div>
    <div >
      <button type="submit" className="w-full py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition duration-150">
        Add Doctor
      </button>
    </div>

    </div>
  
  </form>
  </div>
  
  );
};

export default AddDoctor;
