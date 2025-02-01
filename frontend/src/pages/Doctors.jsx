/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useState } from "react"
import {useNavigate, useParams} from "react-router-dom"
import {AppContext} from '../context/AppContext'
const Doctors = () => {
  const navi = useNavigate()
  const { specialty} = useParams()
  const [showFs,setShowFs]=useState(false)
  const [fDoc,sFDoc]= useState([])
  const {doctors} = useContext(AppContext)
  const apply = ()=>{
    if(specialty){
      sFDoc(doctors.filter(doc=>doc.speciality===specialty))
    }else{
      sFDoc(doctors)
    }
  }
  useEffect(()=>(apply())
  ,[doctors,specialty])
  return (
    <div >
      <p className="text-emerald-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
      <button onClick={()=>setShowFs(prev=>!prev)} className={`py-1 px-3 border rounded ${showFs?"bg-primary text-white":""} text-sm transition-all sm:hidden`}>Filters</button>
        <div className={`${showFs?"flex":"hidden sm:flex"} flex-col gap-4 text-sm text-gray-600"`}>
            <p onClick={()=> specialty==="General physician"?navi('/doctors'):navi('/doctors/General Physician') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-green-300 rounded transition-all cursor-pointer ${specialty==="General physician"?"bg-emerald-400 text-black ":""}`}>General Physician</p>
            <p onClick={()=> specialty==="Gynecologist"?navi('/doctors'):navi('/doctors/Gynecologist') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-green-300 rounded transition-all cursor-pointer ${specialty==="Gynecologist"?"bg-emerald-400 text-black ":""}`}>Gynecologist</p>
            <p onClick={()=> specialty==="Dermatologist"?navi('/doctors'):navi('/doctors/Dermatologist') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-green-300 rounded transition-all cursor-pointer ${specialty==="Dermatologist"?"bg-emerald-400 text-black ":""}`}>Dermatologist</p>
            <p onClick={()=> specialty==="Pediatricians"?navi('/doctors'):navi('/doctors/Pediatricians') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-green-300 rounded transition-all cursor-pointer ${specialty==="Pediatricians"?"bg-emerald-400 text-black ":""}`}>Pediatricians</p>
            <p onClick={()=> specialty==="Neurologist"?navi('/doctors'):navi('/doctors/Neurologist') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-green-300 rounded transition-all cursor-pointer ${specialty==="Neurologist"?"bg-emerald-400 text-black ":""}`}>Neurologist</p>
            <p onClick={()=> specialty==="Gastroenterologist"?navi('/doctors'):navi('/doctors/Gastroenterologist') } className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-green-300 rounded transition-all cursor-pointer ${specialty==="Gastroenterologist"?"bg-emerald-400 text-black ":""}`}>Gastroenterologist</p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {
              fDoc.map((item,i)=>(
            <div onClick={()=>navi(`/appointment/${item._id}`)} className="border border-green-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" key={i} >
                <img className="bg-green-50" src={item.image} alt=""/>
                <div  className="p-4">
                    <div className="flex items-center gap-2 text-sm text-center text-blue-500">
                    <p className="w-2 h-2 bg-blue-500 rounded-full"></p>
                    <p>Available</p>
                    </div>
                    <p className="text-lg font-medium">{item.name}</p>
                    <p className="text-gray-600 text-sm"> {item.speciality}</p>
                </div>
            </div>
        ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors
