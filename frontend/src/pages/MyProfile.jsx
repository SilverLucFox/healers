import  { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import {assets}from '../assets/assets'
import axios from "axios";
import { toast } from "react-toastify";
const MyProfile = () => {
  const {token,backendurl,loadUserData,userData, setUserData} =useContext(AppContext)
  const [isedit, setisedit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserPdata = async ()=>{

    try {
      const formData = new FormData()
      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)
      formData.append('email',userData.email)
      image&& formData.append('image',image)
      const { data } = await axios.post(backendurl + '/api/user/update-profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if(data.success){
        toast.success(data.message)
        await loadUserData()
        setisedit(false)
        setImage(false)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }


  }

  console.log(userData)
  const handleFocus = (e) => {
    e.target.value = ""; // Clear the field when clicked
  };
  console.log(userData)

  return userData&&  (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      
      
      
      <div className="bg-white shadow-xl shadow-gray-700 border-green-300 border  rounded-lg w-full max-w-lg md:max-w-4xl flex flex-col md:flex-row">
        {/* Left Section (Profile Image) */}
        <div className="md:w-1/3 w-full p-6 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-200">
         {
        isedit?
        <label htmlFor="image">
          <div className=" inline-block relative cursor-pointer">
            <img className="w-36 rounded opacity-75" src={image?URL.createObjectURL(image):userData.image} alt=""/>
            <img className="w-10 absolute bottom-0 right-0" src={image?"":assets.upload_icon }alt=""/>
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} id="image" hidden type="file" />
        </label>:<img
            src={userData.image}
            alt="Profile"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-emerald-500 mb-4"
          />
      } 
          {isedit ? (
            <input
              type="text"
              value={userData.name}
              onFocus={handleFocus}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-2 text-center border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          ) : (
            <h2 className="text-lg md:text-2xl font-semibold text-emerald-700">{userData.name}</h2>
          )}
        </div>

        {/* Right Section (Profile Info) */}
        <div className="md:w-2/3 w-full p-6 space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-600 border-b pb-2">Contact Information</h3>
            <div className="mt-4">
              <label className="font-medium text-gray-700">Email:</label>
              <p className="text-gray-600">{userData.email}</p>
            </div>
            <div className="mt-2">
              <label className="font-medium text-gray-700">Phone:</label>
              {isedit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onFocus={handleFocus}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              ) : (
                <p className="text-gray-600">{userData.phone}</p>
              )}
            </div>
            <div className="mt-2">
              <label className="font-medium text-gray-700">Address:</label>
              {isedit ? (
                <div>
                  <input
                    type="text"
                    value={userData.address.line1}
                    onFocus={handleFocus}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="text"
                    value={userData.address.line2}
                    onFocus={handleFocus}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              ) : (
                <p className="text-gray-600">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-600 border-b pb-2">Basic Information</h3>
            <div className="mt-4">
              <label className="font-medium text-gray-700">Gender:</label>
              {isedit ? (
                <select
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Angel">Angel</option>
                </select>
              ) : (
                <p className="text-gray-600">{userData.gender}</p>
              )}
            </div>
            <div className="mt-2">
              <label className="font-medium text-gray-700">Birthday:</label>
              {isedit ? (
                <input
                  type="date"
                  value={userData.dob}
                  onFocus={handleFocus}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              ) : (
                <p className="text-gray-600">{userData.dob}</p>
              )}
            </div>
          </div>

          {/* Edit / Save Button */}
          <div className="mt-6 flex justify-end">
            {isedit ? (
              <button
                onClick={updateUserPdata}
                className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                Save Information
              </button>
            ) : (
              <button
                onClick={() => setisedit(true)}
                className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
