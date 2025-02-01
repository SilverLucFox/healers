/* eslint-disable react/prop-types */
import  { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Rdoc = ( {speciality,docId}) => {

    const {doctors}=useContext(AppContext)

    const navi = useNavigate()
    const[relDoc,sreldoc]=useState([])

    useEffect(()=>{
                    if(doctors.length>0&&speciality){
                        const docData = doctors.filter((doc)=>(doc.speciality===speciality && doc._id!==docId))
                        sreldoc(docData)
                    }
    },[doctors,speciality,docId])


  return (<div className="flex flex-col items-center gap-4 my-16 md:mx-10">
    <h1 className="text-3xl font-medium">Top <span className="text-primary">Doctors</span> to Book</h1>
    <p className="sm:w-1/3 text-center text-sm">Simply browse through our <span className="text-primary">extensive</span> list of trusted doctors</p>
    <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
      {relDoc.slice(0,5).map((item,i)=>(
          <div onClick={()=>{navi(`/appointment/${item._id}`),scrollTo(0,0)}} className="border border-green-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" key={i} >
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
      ))}
    </div>
    <button onClick={()=>{navi('/doctors'),scrollTo(0,0)}} className="bg-green-50 text-gray-600 px-12 py-3 rounded-full mt-10" >more</button>
  </div>)
}

export default Rdoc